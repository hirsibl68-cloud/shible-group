import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // يسمح بتمرير أخطاء TypeScript في الـ build
  },
};

export default nextConfig;
