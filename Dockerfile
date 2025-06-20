# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# 为 Prisma 安装依赖
RUN apk add --no-cache openssl

# 仅在需要时安装依赖
FROM base AS deps
# 查看 https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 了解为什么可能需要 libc6-compat
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# 根据首选的包管理器安装依赖
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 仅在需要时重建源代码
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 配置 Prisma 使用系统 OpenSSL
ENV PRISMA_ENGINES_MIRROR=https://binaries.prisma.sh

# Next.js 收集完全匿名的遥测数据，了解一般使用情况
# 在此处了解更多：https://nextjs.org/telemetry
# 如果您想在构建期间禁用遥测，请取消下面这行的注释
# ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# 配置 Prisma 使用系统 OpenSSL
ENV PRISMA_ENGINES_MIRROR=https://binaries.prisma.sh
# 如果您想在运行时禁用遥测，请取消下面这行的注释
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD ["node", "server.js"]
