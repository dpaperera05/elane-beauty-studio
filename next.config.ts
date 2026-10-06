import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev-mode route indicator (bottom-left "N" badge).
  devIndicators: false,
  images: {
    // Object form (no `search` key) so Unsplash sizing params are allowed.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
