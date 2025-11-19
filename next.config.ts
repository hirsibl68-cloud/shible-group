import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // يسمح بتمرير أخطاء TypeScript في الـ build
  },
  eslint: {
    ignoreDuringBuilds: true, // يمنع ESLint من إيقاف الـ build
  },
};

export default nextConfig;
