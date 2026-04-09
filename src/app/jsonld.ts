import type {
  WithContext,
  Organization,
  WebSite,
  ContactPoint,
  ListItem,
  BreadcrumbList,
  Offer,
  AggregateOffer,
  Article,
  FAQPage,
  Question,
  Answer,
  ItemList,
} from "schema-dts";


export const buildBreadcrumbJsonLd = (
  items: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index): ListItem => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export const buildOrganizationJsonLd = (options?: {
  name?: string
  legalName?: string
  url?: string
  logo?: string
  sameAs?: string[]
  kvk?: string
  vatId?: string
  address?: {
    streetAddress?: string
    postalCode?: string
    addressLocality?: string
    addressCountry?: string
  }
  email?: string
  telephone?: string
  contactPoint?: {
    url?: string
    email?: string
    telephone?: string
    contactType?: string
  }
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}): WithContext<Organization> => {
  const contactPoint: ContactPoint = {
    "@type": "ContactPoint",
    email: options?.contactPoint?.email ?? options?.email ?? "info@youraiworker.nl",
    ...(options?.contactPoint?.telephone || options?.telephone
      ? { telephone: options?.contactPoint?.telephone ?? options?.telephone }
      : {}),
    contactType: options?.contactPoint?.contactType ?? "customer service",
    availableLanguage: ["Dutch", "English"],
    url: options?.contactPoint?.url ?? "https://youraiworker.nl/contact",
    areaServed: "NL",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  }

  const name = options?.name ?? "Your AI Worker"
  const legalName = options?.legalName ?? name
  const url = options?.url ?? "https://youraiworker.nl/"
  const logo = options?.logo ?? "https://youraiworker.nl/icon-512.png"
  const sameAs = options?.sameAs ?? [
    "https://github.com/openclawbot69420-ux/youraiworker-site",
    "https://www.linkedin.com/company/your-ai-worker/",
  ]

  // Aggregate rating for rich snippets (Google requires this for star ratings)
  const aggregateRating = options?.aggregateRating
    ? {
        "@type": "AggregateRating" as const,
        ratingValue: options.aggregateRating.ratingValue,
        reviewCount: options.aggregateRating.reviewCount,
        bestRating: 5,
        worstRating: 1,
      }
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    legalName,
    url,
    logo,
    sameAs,
    ...(options?.kvk ? { identifier: options.kvk } : {}),
    ...(options?.vatId ? { vatID: options.vatId } : {}),
    contactPoint,
    address: {
      "@type": "PostalAddress",
      ...(options?.address?.streetAddress
        ? { streetAddress: options.address.streetAddress }
        : {}),
      ...(options?.address?.postalCode
        ? { postalCode: options.address.postalCode }
        : {}),
      addressCountry: options?.address?.addressCountry ?? "NL",
      addressLocality: options?.address?.addressLocality ?? "Amsterdam",
    },
    foundingDate: "2025",
    foundingLocation: {
      "@type": "Place",
      name: "Amsterdam, Netherlands",
    },
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
    knowsAbout: [
      "AI agents",
      "Workflow automation",
      "Business process automation",
      "OpenClaw",
    ],
    ...(aggregateRating ? { aggregateRating } : {}),
  }
}

export const buildWebSiteJsonLd = (): Record<string, unknown> => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Your AI Worker",
    url: "https://youraiworker.nl/",
    inLanguage: "nl-NL",
    // SearchAction enables Google to show a site search box in search results
    // https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://youraiworker.nl/guides?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export const buildOfferJsonLd = (options?: {
  name?: string
  description?: string
  price?: string
  priceCurrency?: string
  availability?: "https://schema.org/InStock" | "https://schema.org/OutOfStock" | "https://schema.org/PreOrder"
  url?: string
  category?: string
}): WithContext<Offer> => {
  const url = options?.url ?? "https://youraiworker.nl/pricing"
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: options?.name ?? "AI-agent implementatie",
    description:
      options?.description ??
      "Productierijpe AI-agents voor e-mail, chat, planning en CRM. Vanaf €1.000 eenmalig.",
    price: options?.price ?? "1000",
    priceCurrency: options?.priceCurrency ?? "EUR",
    availability: (options?.availability ?? "https://schema.org/InStock") as unknown as Offer["availability"],
    url,
    category: options?.category ?? "Business Software",
    seller: {
      "@type": "Organization",
      name: "Your AI Worker",
      url: "https://youraiworker.nl/",
    },
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
  }
}

export const buildAggregateOfferJsonLd = (): WithContext<AggregateOffer> => {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    name: "AI-agent implementatie pakketten",
    description: "Starter en Groei pakketten voor AI-agent implementatie",
    lowPrice: "1000",
    highPrice: "2500",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: "https://youraiworker.nl/pricing",
    seller: {
      "@type": "Organization",
      name: "Your AI Worker",
      url: "https://youraiworker.nl/",
    },
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Starter pakket",
        description: "1 workflow in 3-7 werkdagen",
        price: "1000",
        priceCurrency: "EUR",
        url: "https://youraiworker.nl/pricing",
      },
      {
        "@type": "Offer",
        name: "Groei pakket",
        description: "Tot 5 workflows",
        price: "2500",
        priceCurrency: "EUR",
        url: "https://youraiworker.nl/pricing",
      },
    ],
  }
}

export const buildServiceJsonLd = (): Record<string, unknown> => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI-agents op maat (implementatie)",
    provider: {
      "@type": "Organization",
      name: "Your AI Worker",
      url: "https://youraiworker.nl/",
    },
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
    serviceType: "AI agent implementation",
    description: "Maatwerk AI-agents die processen automatiseren. Security-first opzet, integraties en begeleiding van intake tot livegang.",
  }
}

export const buildArticleJsonLd = (options: {
  headline: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  author: { name: string; url: string }
  publisher: { name: string; url: string; logo: string }
  keywords?: string[]
  articleSection?: string
}): WithContext<Article> => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.headline,
    description: options.description,
    url: options.url,
    image: options.image,
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    author: {
      "@type": "Organization",
      name: options.author.name,
      url: options.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: options.publisher.name,
      url: options.publisher.url,
      logo: {
        "@type": "ImageObject",
        url: options.publisher.logo,
      },
    },
    inLanguage: "nl-NL",
    ...(options.keywords ? { keywords: options.keywords.join(", ") } : {}),
    ...(options.articleSection ? { articleSection: options.articleSection } : {}),
  }
}

export const buildCollectionPageJsonLd = (options: {
  name: string
  description: string
  url: string
  items: Array<{
    name: string
    url: string
    description: string
  }>
}): WithContext<ItemList> => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: options.name,
    description: options.description,
    url: options.url,
    itemListElement: options.items.map((item, index): ListItem => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  }
}

// LocalBusiness schema - enhances rich results for professional services
// Includes priceRange for pre-qualifying leads and richer business listings
export const buildLocalBusinessJsonLd = (options?: {
  name?: string
  url?: string
  logo?: string
  kvk?: string
  vatId?: string
  email?: string
  telephone?: string
  priceRange?: string
}): Record<string, unknown> => {
  const name = options?.name ?? "Your AI Worker"
  const url = options?.url ?? "https://youraiworker.nl/"
  const logo = options?.logo ?? "https://youraiworker.nl/icon-512.png"
  const priceRange = options?.priceRange ?? "€€" // €€ = moderate pricing (€1000-€2500 range)

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    url,
    logo,
    image: logo,
    description: "Productierijpe AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en binnen dagen live.",
    priceRange, // Helps Google show price expectations in search results
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "NL",
      addressLocality: "Amsterdam",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.3676,
      longitude: 4.9041,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: options?.email ?? "info@youraiworker.nl",
      contactType: "sales",
      availableLanguage: ["Dutch", "English"],
      areaServed: "NL",
    },
    sameAs: [
      "https://www.linkedin.com/company/your-ai-worker/",
    ],
    knowsAbout: [
      "AI agents",
      "Workflow automation",
      "Business process automation",
      "OpenClaw",
      "AI implementation",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI-agent implementatiepakketten",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Starter pakket",
            description: "1 workflow in 3-7 werkdagen",
          },
          price: "1000",
          priceCurrency: "EUR",
          priceValidUntil: "2026-12-31",
          url: "https://youraiworker.nl/pricing",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Groei pakket",
            description: "Tot 5 workflows",
          },
          price: "2500",
          priceCurrency: "EUR",
          priceValidUntil: "2026-12-31",
          url: "https://youraiworker.nl/pricing",
        },
      ],
    },
    ...(options?.kvk ? { identifier: options.kvk } : {}),
    ...(options?.vatId ? { vatID: options.vatId } : {}),
  }
}
