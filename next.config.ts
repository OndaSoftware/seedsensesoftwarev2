import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Without this, Turbopack walks up and finds an unrelated package-lock.json
  // in the home directory, then warns that it is outside this git repository.
  turbopack: { root: import.meta.dirname },

  // Static HTML export so the site can be hosted on GitHub Pages
  // (same host as seedsensesoftware.com / seedsensesoftwarev2).
  output: "export",
  trailingSlash: true,

  // github-slugger (used to build /resources heading anchors) ships ESM only.
  // next/jest derives its transformIgnorePatterns from this list, so naming the
  // package here is what lets the help-center suites import it under Jest.
  transpilePackages: ["github-slugger"],

  images: {
    unoptimized: true,
    // YouTube poster frames for the /resources video facade. next/image still
    // validates remote hostnames when unoptimized, so this is required even
    // though no optimisation happens. Unlisted videos still serve thumbnails
    // from this host.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};

export default nextConfig;
