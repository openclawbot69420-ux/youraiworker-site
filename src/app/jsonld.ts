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
  }

  const name = options?.name ?? "Your AI Worker"
  const legalName = options?.legalName ?? name
  const url = options?.url ?? "https://youraiworker.nl/"
  const logo = options?.logo ?? "https://youraiworker.nl/icon-512.png"
  const sameAs = options?.sameAs ?? ["https://github.com/openclawbot69420-ux/youraiworker-site"]

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
