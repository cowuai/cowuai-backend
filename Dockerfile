# -----------------------------------------------------------
# Estágio 1: Build (Compilação e Geração do Prisma)
# -----------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copia dependências primeiro (cache)
COPY package.json package-lock.json ./
RUN npm install

# 2. Copia o código fonte (incluindo prisma/schema.prisma e seed.ts)
# Com o .dockerignore, o node_modules local NÃO virá junto
COPY . .

# 3. Gera o cliente Prisma AGORA (garante que usa o schema que acabou de ser copiado)
RUN npx prisma generate

# 4. Compila o TypeScript
RUN npm run build

# -----------------------------------------------------------
# Estágio 2: Runtime (Produção)
# -----------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copia o build e o prisma do estágio anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Copia o cliente gerado no estágio anterior
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

COPY .env.example .env.example
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

ENV PORT 3333
EXPOSE 3333

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD [ "npm", "start" ]