// apps/web/next.config.ts
// NEXT.JS CONFIG: HIDE THE FRAMEWORK HEADER AND SEND BASELINE SECURITY HEADERS.
// A FULL CONTENT-SECURITY-POLICY IS ADDED WITH THE DESIGN SYSTEM IN M8 (IT DEPENDS ON FONTS AND SCRIPTS).
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // EMAIL LINKS CARRY A ONE-TIME TOKEN IN THE URL: NEVER SEND IT ONWARD AS A REFERER, NEVER CACHE THE PAGE.
      {
        source: "/auth/:path*",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
