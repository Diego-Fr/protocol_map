# Etapa 1 — Build
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Etapa 2 — Runtime
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

# Copia apenas o que é necessário para rodar
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock*.yaml ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public

RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
