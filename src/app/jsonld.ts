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

export const buildOrganizationJsonLd = (): WithContext<Organization> => {
  const contactPoint: ContactPoint = {
    "@type": "ContactPoint",
    email: "info@youraiworker.nl",
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
    contactPoint,
    address: {
      "@type": "PostalAddress",
      addressCountry: "NL",
      addressLocality: "Amsterdam",
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
