# 使用官方 Node.js 镜像作为基础镜像
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install -g pnpm
RUN pnpm install

# 复制所有项目文件
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 生产环境镜像
FROM node:18-alpine AS runner

WORKDIR /app

# 只复制生产依赖和 .next、public、package.json env
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env

# 设置环境变量
ENV NODE_ENV=production

# 启动 Next.js 应用
CMD ["npm", "start"]
