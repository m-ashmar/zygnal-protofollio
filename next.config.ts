import type { NextConfig } from "next";

// GitHub Pages build: static export served from the custom domain root
// (zygnalsy.com) — no subpath needed since it's not served from
// <user>.github.io/<repo>. Local dev/build is unaffected.
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export",
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
};

export default nextConfig;
