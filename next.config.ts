import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "tailwindcss.com",
      },
    ],
  },
  // 禁用TypeScript类型检查
  typescript: {
    ignoreBuildErrors: true,
  },
  // 启用 standalone 输出用于 Docker
  output: "standalone",
};

export default nextConfig;
