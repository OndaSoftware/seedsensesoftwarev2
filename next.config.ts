import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export so the site can be hosted on GitHub Pages
  // (same host as seedsensesoftware.com / seedsensesoftwarev2).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
