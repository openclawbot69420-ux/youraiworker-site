import type { NextRequest } from "next/server"

const SITE_URL = "https://youraiworker.nl"

export const runtime = "nodejs"

export const GET = (_req: NextRequest) => {
  const body = [
    "Contact: mailto:info@youraiworker.nl",
    "Expires: 2027-12-31T23:59:59.000Z",
    "Preferred-Languages: nl, en",
    "Canonical: " + SITE_URL + "/.well-known/security.txt",
    "Policy: " + SITE_URL + "/security",
    "Hiring: " + SITE_URL + "/contact",
    "",
    "# This file follows https://securitytxt.org",
    "# Please report security issues responsibly.",
    "",
  ].join("\n")

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  })
}
