import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.youraiworker.nl" }],
        destination: "https://youraiworker.nl/:path*",
        permanent: true,
      },
      {
        source: "/configure",
        destination: "/package/configure",
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
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // HSTS only makes sense on HTTPS - Vercel + custom domain is HTTPS
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
        ],
      },
    ]
  },
}

export default nextConfig
