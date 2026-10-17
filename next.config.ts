import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static: `next build` writes plain HTML to out/, which any static host can
  // serve at laras.kotek.app. There is nothing here that needs a server.
  output: "export",
  // /colors -> /colors/index.html, so a plain file server resolves every route.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
