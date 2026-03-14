import type { MetadataRoute } from "next"

const SITE_URL = "https://youraiworker.nl"

const pathToUrl = (path: string) => {
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`
  return `${SITE_URL}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = [
    "/",
    "/use-cases",
    "/integrations",
    "/implementatie",
    "/pricing",
    "/security",
    "/guides",
    "/faq",
    "/contact",
    "/privacy",
  ]

  return routes.map((path) => ({
    url: pathToUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }))
}
