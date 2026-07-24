import type { NextConfig } from "next";

// When building for GitHub Pages (in CI) we produce a static export served
// from a repo subpath. Local dev/build stays at the root with no export.
const isPages = process.env.GITHUB_PAGES === "true";
// Repo the compiled site is SERVED from (its GitHub Pages subpath).
// In CI this is passed from the GitHub repository name.
const repo = process.env.PAGES_REPO || "zygnal-protofollio";
const basePath = isPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export",
        basePath,
        assetPrefix: `${basePath}/`,
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
