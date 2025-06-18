# 使用官方 Node.js 镜像
FROM node:18-alpine

# 安装必要的系统依赖，包括 OpenSSL
RUN apk add --no-cache \
    libc6-compat \
    openssl \
    openssl-dev

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# 安装依赖
RUN pnpm install

# 复制所有项目文件
COPY . .

# 设置环境变量以避免 Prisma 在构建时连接数据库
ENV SKIP_ENV_VALIDATION=true

# 生成 Prisma 客户端（不连接数据库）
RUN npx prisma generate

# 构建应用
RUN pnpm build

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 启动应用
CMD ["node", "server.js"]