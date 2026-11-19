import path from "node:path";
import type { NextConfig } from "next";

const NOINDEX_HEADER = {
  key: "X-Robots-Tag",
  value: "noindex, nofollow, noarchive, noimageindex",
};

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const STATIC_ASSET_CACHE_HEADER = {
  key: "Cache-Control",
  value: "public, max-age=86400, stale-while-revalidate=604800",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: path.resolve(process.cwd()),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
      {
        source: "/projects/:file(.*\\.svg)",
        headers: [STATIC_ASSET_CACHE_HEADER],
      },
      {
        source: "/:asset(og-image\\.png|brand-logo\\.png|icon-192\\.png|icon-512\\.png)",
        headers: [STATIC_ASSET_CACHE_HEADER],
      },
      {
        source: "/projects",
        headers: [NOINDEX_HEADER],
      },
      {
        source: "/projects/:path*",
        headers: [NOINDEX_HEADER],
      },
      {
        source: "/:lang(en|ru|uz)/projects",
        headers: [NOINDEX_HEADER],
      },
      {
        source: "/:lang(en|ru|uz)/projects/:path*",
        headers: [NOINDEX_HEADER],
      },
    ];
  },
};

export default nextConfig;
