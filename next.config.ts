import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This folder is the project root, even if a parent folder has its own
  // lockfile (Turbopack would otherwise guess the parent).
  turbopack: { root: path.resolve(__dirname) },
  // Hide the Next.js dev-mode route indicator (bottom-left "N" badge).
  devIndicators: false,
  // Static export to `out/` for Cloudflare Pages (every route is static).
  output: "export",
  // The default image optimizer needs a server, so images ship as-is.
  images: { unoptimized: true },
};

export default nextConfig;
