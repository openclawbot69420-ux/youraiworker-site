type TrustMetric = {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  value: string
  unit: string
  label: string
  description: string
}

type SectorBadge = {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
  description: string
}

export const TrustIndicatorsJsonLd: React.FC<{
  trustMetrics: TrustMetric[]
  sectorBadges: SectorBadge[]
  siteName: string
  siteUrl: string
}> = (props) => {
  const { trustMetrics, sectorBadges, siteName, siteUrl } = props

  const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Service characteristics as ItemList
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#service-characteristics`,
        name: "Dienstverleningskenmerken",
        itemListElement: trustMetrics.map((metric, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: metric.label,
          description: metric.description,
          additionalProperty: {
            "@type": "PropertyValue",
            name: "waarde",
            value: metric.value,
            unitText: metric.unit,
          },
        })),
      },
      // Target sectors as ItemList
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#target-sectors`,
        name: "Doelsectoren",
        description: `Sectoren die ${siteName} bedient met AI-automatisering`,
        itemListElement: sectorBadges.map((sector, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: sector.label,
          description: sector.description,
        })),
      },
      // Organization/service stats
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-offering`,
        name: `${siteName} - AI-agent implementatie`,
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI-agent services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI-agent setup",
                description: "Production-ready AI-agents voor workflows",
              },
            },
          ],
        },
        serviceType: "AI-automatisering",
        areaServed: {
          "@type": "Country",
          name: "Nederland",
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }}
    />
  )
}
