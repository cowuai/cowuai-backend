# -----------------------------------------------------------
# Estágio 1: Build (Compilação e Geração do Prisma)
# -----------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copia package.json e package-lock.json primeiro para cache
COPY package.json package-lock.json ./

# Instala todas as dependências (incluindo devDependencies como typescript, prisma)
RUN npm install

# Copia o schema do Prisma
COPY prisma ./prisma

# Gera o cliente Prisma
RUN npx prisma generate

# Copia o restante do código fonte
COPY . .

# Compila o TypeScript para JavaScript (saída em /dist)
RUN npm run build

# -----------------------------------------------------------
# Estágio 2: Runtime (Produção)
# -----------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Define o ambiente como produção
ENV NODE_ENV production

# Copia package.json e package-lock.json
COPY package.json package-lock.json ./

# Instala SOMENTE dependências de produção
RUN npm install --omit=dev

# Copia os arquivos compilados (dist) do estágio de build
COPY --from=builder /app/dist ./dist

# Copia o schema do Prisma (necessário para o 'migrate deploy')
COPY --from=builder /app/prisma ./prisma

# Copia o cliente Prisma gerado DEPOIS do install
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Copia o .env.example
COPY .env.example .env.example

# Copia o script de entrypoint
COPY docker-entrypoint.sh ./

# Dá permissão de execução
RUN chmod +x docker-entrypoint.sh

# A porta 3333 é definida no seu .env
ENV PORT 3333
EXPOSE 3333

# Define o Entrypoint
ENTRYPOINT ["./docker-entrypoint.sh"]

# O package.json define "start": "node dist/server.js"
CMD [ "npm", "start" ]