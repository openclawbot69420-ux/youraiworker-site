import type { MetadataRoute } from "next"

const sitemap = (): MetadataRoute.Sitemap => {
  const baseUrl = "https://www.youraiworker.nl"

  const routes = ["/", "/use-cases", "/integrations", "/guides", "/pricing", "/contact", "/security", "/privacy"]

  return routes.map((route) => {
    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "/" ? 1 : 0.7,
    }
  })
}

export default sitemap
