import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Help with hydration issues
    optimizePackageImports: ['lucide-react'],
  },
  // Suppress hydration warnings in development
  reactStrictMode: true,
};

export default nextConfig;
