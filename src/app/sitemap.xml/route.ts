import type { NextRequest } from "next/server"

export const runtime = "nodejs"

const BASE_URL = "https://youraiworker.nl"

export async function GET(_request: NextRequest) {
  const urls = [
    "",
    "/use-cases",
    "/integrations",
    "/pricing",
    "/security",
    "/privacy",
    "/guides",
    "/contact",
  ]

  const nowIso = new Date().toISOString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((path) => {
    const loc = `${BASE_URL}${path}`
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${nowIso}</lastmod>
  </url>`
  })
  .join("\n")}
</urlset>
`

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
