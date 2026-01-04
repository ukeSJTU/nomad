import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ensure UI package is transpiled
  transpilePackages: ["@nomad/ui"],
};

export default nextConfig;
