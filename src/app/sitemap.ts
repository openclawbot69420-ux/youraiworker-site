import type { MetadataRoute } from "next"
import { GUIDES, USE_CASES, INTEGRATIONS } from "../lib/catalog"

const SITE_URL = "https://youraiworker.nl"

const pathToUrl = (path: string) => {
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`
  return `${SITE_URL}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Main landing pages
  const mainRoutes = [
    { path: "/", priority: 1.0, freq: "daily" as const },
    { path: "/pricing", priority: 0.9, freq: "weekly" as const },
    { path: "/use-cases", priority: 0.8, freq: "weekly" as const },
    { path: "/integrations", priority: 0.8, freq: "weekly" as const },
    { path: "/implementatie", priority: 0.8, freq: "weekly" as const },
    { path: "/contact", priority: 0.7, freq: "weekly" as const },
    { path: "/guides", priority: 0.7, freq: "weekly" as const },
    { path: "/faq", priority: 0.6, freq: "weekly" as const },
    { path: "/security", priority: 0.5, freq: "monthly" as const },
    { path: "/privacy", priority: 0.5, freq: "monthly" as const },
    { path: "/terms", priority: 0.5, freq: "monthly" as const },
    { path: "/configure", priority: 0.4, freq: "monthly" as const },
  ]

  // Individual use case pages (high SEO value - specific solutions)
  const useCaseRoutes = USE_CASES.map((useCase) => ({
    path: `/use-cases/${useCase.slug}`,
    priority: 0.75,
    freq: "monthly" as const,
  }))

  // Individual integration pages
  const integrationRoutes = INTEGRATIONS.map((integration) => ({
    path: `/integrations/${integration.slug}`,
    priority: 0.7,
    freq: "monthly" as const,
  }))

  // Individual guide pages (content freshness matters)
  const guideRoutes = GUIDES.map((guide) => ({
    path: `/guides/${guide.slug}`,
    priority: 0.65,
    freq: "weekly" as const,
    lastMod: guide.updatedAt ? new Date(guide.updatedAt) : now,
  }))

  // Build final sitemap
  const allRoutes = [
    ...mainRoutes.map((r) => ({
      url: pathToUrl(r.path),
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...useCaseRoutes.map((r) => ({
      url: pathToUrl(r.path),
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...integrationRoutes.map((r) => ({
      url: pathToUrl(r.path),
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...guideRoutes.map((r) => ({
      url: pathToUrl(r.path),
      lastModified: r.lastMod,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
  ]

  return allRoutes
}
