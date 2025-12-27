import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX({
  /* config options here */
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["typescript", "twoslash"],
  async rewrites() {
    return [
      {
        source: "/docs/:path*.mdx",
        destination: "/llms.mdx/:path*",
      },
    ];
  },
};

export default withMDX(nextConfig);
