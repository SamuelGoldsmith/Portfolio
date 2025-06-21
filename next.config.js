/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  output: "export",
  distDir: "dist",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "guide-images.cdn.ifixit.com",
      "valkyrie.cdn.ifixit.com",
      "assets.cdn.ifixit.com",
    ],
  },
};

export default config;
