import type { NextConfig } from "next";

const plausibleScriptSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC;
const plausibleOrigin = plausibleScriptSrc ? new URL(plausibleScriptSrc).origin : "";

const scriptSrc = ["'self'", "'unsafe-inline'", plausibleOrigin]
  .filter(Boolean)
  .join(" ");
const connectSrc = ["'self'", plausibleOrigin].filter(Boolean).join(" ");

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Content-Security-Policy",
    value: `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src ${connectSrc}; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests`,
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
