import type {
  WithContext,
  Organization,
  WebSite,
  ContactPoint,
  ListItem,
  BreadcrumbList,
} from "schema-dts"

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
}): WithContext<Organization> => {
  const contactPoint: ContactPoint = {
    "@type": "ContactPoint",
    email: options?.email ?? "info@youraiworker.nl",
    ...(options?.telephone ? { telephone: options.telephone } : {}),
    contactType: "customer service",
    availableLanguage: ["Dutch", "English"],
    url: "https://youraiworker.nl/contact",
  }

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Your AI Worker",
    legalName: "Your AI Worker",
    url: "https://youraiworker.nl/",
    logo: "https://youraiworker.nl/icon-512.png",
    sameAs: ["https://github.com/openclawbot69420-ux/youraiworker-site"],
    ...(options?.kvk ? { identifier: options.kvk } : {}),
    ...(options?.vatId ? { vatID: options.vatId } : {}),
    contactPoint,
    address: {
      "@type": "PostalAddress",
      ...(options?.address?.streetAddress ? { streetAddress: options.address.streetAddress } : {}),
      ...(options?.address?.postalCode ? { postalCode: options.address.postalCode } : {}),
      addressCountry: options?.address?.addressCountry ?? "NL",
      addressLocality: options?.address?.addressLocality ?? "Amsterdam",
    },
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
  }
}

export const buildWebSiteJsonLd = (): WithContext<WebSite> => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Your AI Worker",
    url: "https://youraiworker.nl/",
    inLanguage: "nl-NL",
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
    description:
      "Maatwerk AI-agents die processen automatiseren. Security-first opzet, integraties en begeleiding van intake tot livegang.",
  }
}
