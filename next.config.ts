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
};

export default nextConfig;
