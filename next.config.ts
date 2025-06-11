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
};

export default nextConfig;
