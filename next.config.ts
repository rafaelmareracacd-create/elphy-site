import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, ""),
};
export default nextConfig;
