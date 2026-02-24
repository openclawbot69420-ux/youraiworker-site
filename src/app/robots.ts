import type { MetadataRoute } from "next"

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://youraiworker.nl/sitemap.xml",
  }
}

export default robots
