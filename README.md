This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 登录功能

本项目实现了一个简洁美观的登录页面，支持通过GitHub和Google第三方账号登录。

### 功能特点

- 支持GitHub OAuth登录
- 支持Google OAuth登录
- 美观的UI界面（使用Tailwind CSS）

### 使用方法

访问 <http://localhost:3000/login> 即可看到登录页面。

### 配置说明

在实际使用前，需要在GitHub和Google开发者平台创建OAuth应用并获取Client ID：

1. 在`services/auth.ts`文件中替换以下内容：
   - `YOUR_GITHUB_CLIENT_ID` - 替换为你的GitHub OAuth应用ID
   - `YOUR_REDIRECT_URI` - 替换为你的应用回调地址
   - `YOUR_GOOGLE_CLIENT_ID` - 替换为你的Google OAuth应用ID

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
