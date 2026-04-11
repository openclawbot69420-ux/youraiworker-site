import type { NextConfig } from "next"

// Build timestamp for "Last updated" footer indicator
const buildDate = new Date().toISOString()

// Long-term cache headers for hashed static assets (Next.js bundles with content hashes)
// These files include content hashes in filenames, so they can be cached indefinitely
const CACHE_ASSETS_HEADERS = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
]

// Cache headers for static images (favicons, OG images - change rarely)
const CACHE_IMAGES_HEADERS = [
  { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=31536000" },
]

const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HSTS only makes sense on HTTPS - Vercel + custom domain is HTTPS
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // Small SEO/professionalism boost: ensure consistent, explicit caching for static text files.
  { key: "X-Robots-Tag", value: "index, follow" },
  // Enable Client Hints for optimized image delivery (DPR, width hints help Next.js Image)
  { key: "Accept-CH", value: "DPR, Width, Viewport-Width" },
  // Certificate Transparency monitoring helps detect misissued certificates
  { key: "Expect-CT", value: "max-age=86400, enforce" },
]

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_DATE: buildDate,
  },
  async redirects() {
    return [
      // Note: /configure now has its own page (see src/app/configure/page.tsx)
      // Keep path typo fixes below
      {
        source: "/implementation",
        destination: "/implementatie",
        permanent: true,
      },
      {
        source: "/implmenetatie",
        destination: "/implementatie",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
      {
        source: "/sitemap.xml",
        headers: [
          ...SECURITY_HEADERS,
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          ...SECURITY_HEADERS,
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
      {
        source: "/humans.txt",
        headers: [
          ...SECURITY_HEADERS,
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          ...SECURITY_HEADERS,
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
      // Cache static assets with content hashes (JS/CSS bundles) - 1 year immutable
      { source: "/_next/static/:path*", headers: CACHE_ASSETS_HEADERS },
      // Cache static images (favicons, OG images, etc.) - 1 day with stale-while-revalidate
      { source: "/:path*.png", headers: CACHE_IMAGES_HEADERS },
      { source: "/:path*.svg", headers: CACHE_IMAGES_HEADERS },
      { source: "/:path*.ico", headers: CACHE_IMAGES_HEADERS },
      { source: "/:path*.webp", headers: CACHE_IMAGES_HEADERS },
      // Cache manifest and browser config files
      { source: "/site.webmanifest", headers: [ ...SECURITY_HEADERS, { key: "Cache-Control", value: "public, max-age=3600" }, ], },
      { source: "/browserconfig.xml", headers: [ ...SECURITY_HEADERS, { key: "Cache-Control", value: "public, max-age=86400" }, ], },
    ]
  },
}

export default nextConfig
