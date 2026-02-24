import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://youraiworker.nl"
  const now = new Date()

  const routes = [
    "",
    "/use-cases",
    "/integrations",
    "/pricing",
    "/contact",
    "/security",
    "/privacy",
    "/guides",
  ]

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }))
}
