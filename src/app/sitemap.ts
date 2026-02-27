import { MetadataRoute } from "next"

const SITE_URL = "https://youraiworker.nl"

const routes = [
  { path: "", priority: 1.0, changefreq: "weekly" },
  { path: "/contact", priority: 0.9, changefreq: "monthly" },
  { path: "/pricing", priority: 0.9, changefreq: "weekly" },
  { path: "/implementatie", priority: 0.8, changefreq: "monthly" },
  { path: "/use-cases", priority: 0.8, changefreq: "weekly" },
  { path: "/integrations", priority: 0.7, changefreq: "weekly" },
  { path: "/security", priority: 0.6, changefreq: "monthly" },
  { path: "/privacy", priority: 0.4, changefreq: "monthly" },
  { path: "/guides", priority: 0.5, changefreq: "weekly" },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changefreq,
    priority: route.priority,
  }))
}
