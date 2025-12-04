#!/bin/sh

# Encerra o script se algum comando falhar
set -e

echo "🛠️  Aplicando Migrations..."
npx prisma migrate deploy

# CUIDADO: Seu seed deve ser idempotente (verificar se o dado existe antes de criar)
if [ "$RUN_SEED" = "true" ]; then
  echo "🌱 Rodando Seeds..."
  node dist/prisma/seed.js
fi

echo "🚀 Iniciando a aplicação..."
exec "$@"