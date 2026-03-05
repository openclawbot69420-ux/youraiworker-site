import type { MetadataRoute } from "next"

const SITE_URL = "https://youraiworker.nl"

const ROUTES: Array<{ path: string; priority?: number; changeFrequency?: MetadataRoute.Sitemap[0]["changeFrequency"] }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/use-cases", priority: 0.8, changeFrequency: "weekly" },
  { path: "/integrations", priority: 0.7, changeFrequency: "weekly" },
  { path: "/implementatie", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/security", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/guides", priority: 0.6, changeFrequency: "weekly" },
]

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const now = new Date()

  return ROUTES.map((route) => {
    return {
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }
  })
}

export default sitemap
