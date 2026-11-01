/**
 * Static export (GitHub Pages / Docker + nginx).
 * Set NEXT_PUBLIC_BASE_PATH="/repo-name" when hosting under a sub-path.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import("next").NextConfig} */
const config = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};

export default config;
