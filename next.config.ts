import type { NextConfig } from "next"

const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HSTS only makes sense on HTTPS - Vercel + custom domain is HTTPS
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // Small SEO/professionalism boost: ensure consistent, explicit caching for static text files.
  { key: "X-Robots-Tag", value: "index, follow" },
]

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/configure",
        destination: "/implementatie",
        permanent: true,
      },
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
    ]
  },
}

export default nextConfig
