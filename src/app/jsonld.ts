import type { WithContext, Organization, WebSite } from "schema-dts"

export const buildOrganizationJsonLd = (): WithContext<Organization> => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Your AI Worker",
    url: "https://youraiworker.nl/",
    logo: "https://youraiworker.nl/icon-512.png",
    sameAs: ["https://www.linkedin.com/company/youraiworker"],
  }
}

export const buildWebSiteJsonLd = (): WithContext<WebSite> => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Your AI Worker",
    url: "https://youraiworker.nl/",
    inLanguage: "nl-NL",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://youraiworker.nl/guides?query={search_term_string}",
    } as any,
  }
}
