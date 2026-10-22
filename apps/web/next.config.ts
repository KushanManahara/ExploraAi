// apps/web/next.config.ts
// MINIMAL NEXT.JS CONFIG. HIDE THE FRAMEWORK HEADER; EVERYTHING ELSE STAYS DEFAULT UNTIL NEEDED.
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
};

export default nextConfig;
