# =========================
# Base Stage
# =========================
FROM node:18-alpine AS base

# Habilita corepack para usar pnpm
RUN rm -rf ~/.cache/corepack
RUN corepack enable
RUN corepack prepare pnpm@8.15.5 --activate

# Instala dependências do sistema necessárias (ex: OpenSSL)
RUN apk add --no-cache openssl libssl3

WORKDIR /app

# =========================
# Build Stage
# =========================
FROM base AS build

# Copia arquivos de dependências e Prisma
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Instala todas dependências
RUN pnpm install

# Gera cliente Prisma
RUN pnpm prisma generate

# Copia o restante do código
COPY . .

# Executa o build do projeto (TypeScript + Prisma)
RUN pnpm run build

# =========================
# Production Stage
# =========================
FROM base AS production

WORKDIR /app

# Copia arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instala apenas dependências de produção
RUN pnpm install --prod

# Copia build gerado do stage anterior
COPY --from=build /app/build ./build

# Copia cliente Prisma e node_modules necessários para produção
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/node_modules/.pnpm ./node_modules/.pnpm

# Variável de porta padrão (pode ser sobrescrita pelo .env)
ENV PORT=4002

# Start da aplicação
CMD ["node", "build/external-interfaces/server.js"]
