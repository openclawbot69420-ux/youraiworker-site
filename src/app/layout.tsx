import type { Metadata } from "next"
import { Github, Linkedin, MapPin, Lock, LifeBuoy, ShieldCheck } from "lucide-react"
import { MobileNav } from "../components/MobileNav"
import { BackToTop } from "../components/BackToTop"
import "../styles/globals.css"
import { buildOrganizationJsonLd, buildServiceJsonLd, buildWebSiteJsonLd } from "./jsonld"

const SITE_NAME = "Your AI Worker"
const SITE_URL = "https://youraiworker.nl"
const DEFAULT_TITLE = "Productierijpe AI-agents voor Nederlandse bedrijven"
const DEFAULT_DESCRIPTION =
  "Productierijpe AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en binnen dagen live. Plan een intakegesprek (20 min) en ontvang binnen 1 werkdag een concreet voorstel. KVK 95290475."

const DEFAULT_OG_IMAGE = "/og-home.png"
const DEFAULT_TWITTER_IMAGE = "/og-home.png"

// Extra share preview image (used by some platforms, and as a fallback when the primary OG image fails).
const FALLBACK_OG_IMAGE = "/og.png"

const DEFAULT_OG_ALT = "Your AI Worker - Productierijpe AI-agents voor Nederlandse bedrijven"

// Basic SEO: makes it easier for crawlers and browsers to show a stable preview title.
const DEFAULT_META_TITLE = `${SITE_NAME} - ${DEFAULT_TITLE}`

// Keep this aligned with public/favicon.svg to avoid 404s.
const DEFAULT_FAVICON_SVG = "/favicon.svg"

const COMPANY_NAME = "Your AI Worker"
const COMPANY_LEGAL_NAME = "Your AI Worker"
const COMPANY_BRAND_TAGLINE = "Productierijpe AI-agents voor Nederlandse bedrijven"
const COMPANY_LOGO_URL = `${SITE_URL}/icon-512.png`
const COMPANY_CONTACT_URL = `${SITE_URL}/contact`

const DEFAULT_META_IMAGE_WIDTH = 1200
const DEFAULT_META_IMAGE_HEIGHT = 630

const CONTACT_HOURS = "Ma-vr 09:00-17:00 (Amsterdam)"
const CONTACT_RESPONSE_TIME = "Reactie binnen 1 werkdag"
const CONTACT_RESPONSE_SLA = "Reactie binnen 24 uur op werkdagen"
const CONTACT_TURNAROUND = "Binnen 1 werkdag"
const CONTACT_CALENDAR_URL = "https://cal.com/youraiworker"
const CONTACT_EMAIL_DISPLAY = "info@youraiworker.nl"
const CONTACT_EMAIL = "info@youraiworker.nl"
const CONTACT_PHONE: string | undefined = undefined
// Use real contact details here.
// Avoid publishing placeholder phone numbers.
// CONTACT_PHONE stays undefined to avoid exposing phone numbers on the public site.
// CONTACT_PHONE_DISPLAY is used only for microcopy explaining phone support (no number shown).
const CONTACT_KVK = "95290475"
const CONTACT_BTW = "NL8677.15.849.B01"

// Quick trust indicator for first-time visitors.
// Keep it short and factual.
const CONTACT_EVENING_WEEKEND_NOTICE = "Avond en weekend op afspraak"
const CONTACT_PHONE_NOTICE = "Telefonisch op afspraak"

const COMPANY_LINKEDIN_URL = "https://www.linkedin.com/company/your-ai-worker/"

// Keep these as "undefined" until you have real IDs.
// This avoids publishing placeholders in metadata.
const SOCIAL_LINKEDIN: string | undefined = COMPANY_LINKEDIN_URL
const SOCIAL_GITHUB: string | undefined = "https://github.com/openclawbot69420-ux/youraiworker-site"

const CONTACT_STREET_ADDRESS = ""
const CONTACT_POSTAL_CODE = ""
const CONTACT_CITY = "Amsterdam"
const CONTACT_COUNTRY = "NL"

const CONTACT_ADDRESS_LINE = [CONTACT_STREET_ADDRESS, CONTACT_POSTAL_CODE, CONTACT_CITY, "Nederland"]
  .filter(Boolean)
  .join(", ")

const CONTACT_ADDRESS_DISPLAY = CONTACT_ADDRESS_LINE || `${CONTACT_CITY}, Nederland`
const CONTACT_KVK_LABEL = "KvK"
const CONTACT_BTW_LABEL = "BTW"

// Minimal legal footer line for extra credibility. Keep it factual and short.
const COMPANY_LEGAL_LINE = `Your AI Worker (KvK ${CONTACT_KVK}, BTW ${CONTACT_BTW})`
const COMPANY_BRAND_FOOTER_LINE = `${COMPANY_BRAND_TAGLINE}.`

const CONTACT_CTA: NavItem = {
  href: CONTACT_CALENDAR_URL,
  label: "Plan een intake (20 min)",
  title: "Plan een intakegesprek van 20 minuten",
  external: true,
}

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - ${DEFAULT_TITLE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  // Adds canonical icon for iOS and a subtle professionalism boost in SERPs.
  // Safe, no external dependencies.
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: "default",
  },
  keywords: [
    "AI agents",
    "AI agent",
    "workflow automation",
    "automatisering",
    "LLM",
    "agentic AI",
    "Nederland",
    "security",
    "integraties",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: {
      nl: SITE_URL,
      "x-default": SITE_URL,
    },
  },
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${DEFAULT_TITLE}`,
    description: DEFAULT_DESCRIPTION,
    url: `${SITE_URL}/`,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: DEFAULT_META_IMAGE_WIDTH,
        height: DEFAULT_META_IMAGE_HEIGHT,
        alt: DEFAULT_OG_ALT,
      },
      {
        url: FALLBACK_OG_IMAGE,
        width: DEFAULT_META_IMAGE_WIDTH,
        height: DEFAULT_META_IMAGE_HEIGHT,
        alt: DEFAULT_OG_ALT,
      },
    ],
  },
  other: {
    // Helps browsers and social platforms pick the canonical language.
    // Also improves perceived polish in share previews.
    "content-language": "nl-NL",

    // Used by some platforms when building share previews.
    "og:image:alt": DEFAULT_OG_ALT,
    "twitter:image:alt": DEFAULT_OG_ALT,

    "application-name": SITE_NAME,
    "msapplication-TileColor": "#0f172a",
    "msapplication-config": "/browserconfig.xml",

    // Optional social pointers (not standard, but harmless as metadata "other" entries).
    ...(SOCIAL_LINKEDIN ? { "social:linkedin": SOCIAL_LINKEDIN } : {}),
    ...(SOCIAL_GITHUB ? { "social:github": SOCIAL_GITHUB } : {}),

    "twitter:image": `${SITE_URL}${DEFAULT_TWITTER_IMAGE}`,
    "twitter:image:width": String(DEFAULT_META_IMAGE_WIDTH),
    "twitter:image:height": String(DEFAULT_META_IMAGE_HEIGHT),
    "og:image": `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    "og:image:secure_url": `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    "og:image:url": `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    "og:image:width": String(DEFAULT_META_IMAGE_WIDTH),
    "og:image:height": String(DEFAULT_META_IMAGE_HEIGHT),

    // Extra credibility signals for crawlers and some business directories.
    "business:entity": "LocalBusiness",
    "business:country": CONTACT_COUNTRY,
    "business:city": CONTACT_CITY,

    // Business contact info (used by some crawlers).
    "contact:email": CONTACT_EMAIL,
    "contact:hours": CONTACT_HOURS,
    "contact:response_time": CONTACT_RESPONSE_TIME,
    "contact:turnaround": CONTACT_TURNAROUND,
    "business:kvk": CONTACT_KVK,
    "business:vat": CONTACT_BTW,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ${DEFAULT_TITLE}`,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_TWITTER_IMAGE],
    // Keep handles undefined until you have the real account.
    // Publishing placeholders can look unprofessional in share previews.
    site: undefined,
    creator: undefined,
  },
  // Small polish: show a lightweight site name suffix in browser UI (where supported).
  // Keeps titles consistent across pages.
  applicationName: SITE_NAME,
  formatDetection: {
    // Prevent iOS/Safari from auto-linking phone numbers and addresses.
    // This avoids accidental "tappable" formatting in the footer and keeps typography clean.
    email: true,
    address: false,
    telephone: false,
  },
  verification: {
    // Add verification tokens here when available.
    // google: "...",
    // yandex: "...",
    // other: { "msvalidate.01": "..." },
  },
  authors: [{ name: "Your AI Worker" }],
  creator: "Your AI Worker",
  publisher: "Your AI Worker",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

type NavItem = {
  href: string
  label: string
  title?: string
  external?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { href: "/use-cases", label: "Toepassingen", title: "Bekijk toepassingen" },
  { href: "/integrations", label: "Integraties", title: "Bekijk integraties" },
  { href: "/implementatie", label: "Implementatie", title: "Lees hoe implementatie werkt" },
  { href: "/pricing", label: "Prijzen", title: "Bekijk prijzen" },
  { href: "/contact", label: "Contact", title: "Neem contact op" },
  { href: "/faq", label: "FAQ", title: "Veelgestelde vragen" },
  { href: "/security", label: "Beveiliging", title: "Lees over beveiliging" },
  {
    href: "https://github.com/openclawbot69420-ux/youraiworker-site",
    label: "GitHub",
    title: "Bekijk de repository op GitHub",
    external: true,
  },
]

const HEADER_CTA: NavItem = {
  href: "/contact",
  label: "Plan een intake (20 min)",
  title: "Plan een intakegesprek van 20 minuten",
}

const buildNavHref = (item: NavItem) => {
  if (!item.external) return item.href

  const url = new URL(item.href)

  return `${url.pathname}${url.search}${url.hash}`
}

const RootLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props

  const orgJsonLd = buildOrganizationJsonLd({
    name: COMPANY_NAME,
    legalName: COMPANY_LEGAL_NAME,
    url: SITE_URL,
    logo: COMPANY_LOGO_URL,
    contactPoint: {
      url: COMPANY_CONTACT_URL,
      email: CONTACT_EMAIL,
      contactType: "sales",
    },
    kvk: CONTACT_KVK,
    vatId: CONTACT_BTW,
    address: {
      streetAddress: CONTACT_STREET_ADDRESS,
      postalCode: CONTACT_POSTAL_CODE,
      addressLocality: CONTACT_CITY,
      addressCountry: CONTACT_COUNTRY,
    },
    email: CONTACT_EMAIL,
    ...(CONTACT_PHONE ? { telephone: CONTACT_PHONE } : {}),
  })
  const websiteJsonLd = buildWebSiteJsonLd()
  const serviceJsonLd = buildServiceJsonLd()

  return (
    <html lang="nl">
      <head>
        {/* Icons: keep deterministic, no duplicates. */}
        <link rel="icon" href={DEFAULT_FAVICON_SVG} type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/icon.svg" color="#0f172a" />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta name="application-name" content={SITE_NAME} />
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="light" />
        {/* Canonical favicon helps older browsers that do not parse Next metadata icons reliably. */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="author" href="/humans.txt" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs" />
        <link rel="alternate" type="text/plain" href="/humans.txt" title="Humans" />
        <link rel="alternate" type="text/plain" href="/.well-known/security.txt" title="Security" />
        <link rel="alternate" type="text/plain" href="/robots.txt" title="Robots" />
        <link rel="alternate" type="application/xml" href="/sitemap.xml" title="Sitemap" />
        <meta name="rating" content="general" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*
          Note: SEO + social metadata is handled by Next.js `metadata` above.
          Keep `<head>` deterministic and avoid duplicating canonical/OG/robots tags.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a
          href="/"
          title="Your AI Worker - terug naar home"
          className="text-lg font-semibold tracking-tight text-slate-900"
        >
          Your AI Worker
        </a>
        <MobileNav items={NAV_ITEMS} cta={HEADER_CTA} />
        <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
          {NAV_ITEMS.map((item) => {
            const href = buildNavHref(item)

            return (
              <a
                key={item.href}
                className="hover:text-slate-900 transition-colors"
                href={href}
                title={item.title}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
              >
                {item.label}
              </a>
            )
          })}
          <a
            className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 transition-colors"
            href={CONTACT_CALENDAR_URL}
            title={HEADER_CTA.title}
            target="_blank"
            rel="noreferrer"
          >
            {HEADER_CTA.label}
          </a>
        </nav>
      </div>
    </header>
  )
}

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/70 bg-slate-50/80">
      {/* Trust indicators bar */}
      <div className="border-b border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 sm:gap-8">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              Gevestigd in Nederland
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              Security-first opzet
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              KvK: {CONTACT_KVK}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LifeBuoy className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              {CONTACT_RESPONSE_SLA}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LifeBuoy className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              {CONTACT_EVENING_WEEKEND_NOTICE}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LifeBuoy className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              {CONTACT_PHONE_NOTICE}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              BTW: {CONTACT_BTW}
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="text-base font-semibold text-slate-900">Your AI Worker</p>
            <p className="mt-2 max-w-sm leading-relaxed">
              {COMPANY_BRAND_FOOTER_LINE} Maatwerk automatisering, veilig ingericht en snel live.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
              Plan een intake van 20 minuten en ontvang binnen 1 werkdag een concreet voorstel.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKEDIN ? (
                <a
                  href={SOCIAL_LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="Volg ons op LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
              <a
                href="https://github.com/openclawbot69420-ux/youraiworker-site"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="Bekijk de code op GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Navigatie
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                className="transition-colors hover:text-slate-900"
                href="/use-cases"
                title="Bekijk toepassingen"
              >
                Toepassingen
              </a>
              <a
                className="transition-colors hover:text-slate-900"
                href="/integrations"
                title="Bekijk integraties"
              >
                Integraties
              </a>
              <a
                className="transition-colors hover:text-slate-900"
                href="/implementatie"
                title="Lees hoe implementatie werkt"
              >
                Implementatie
              </a>
              <a
                className="transition-colors hover:text-slate-900"
                href="/pricing"
                title="Bekijk prijzen"
              >
                Prijzen
              </a>
              <a
                className="transition-colors hover:text-slate-900"
                href="/contact"
                title="Neem contact op"
              >
                Contact
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Bedrijf
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                className="transition-colors hover:text-slate-900"
                href="/security"
                title="Lees over beveiliging"
              >
                Beveiliging
              </a>
              <a
                className="transition-colors hover:text-slate-900"
                href="/privacy"
                title="Lees het privacybeleid"
              >
                Privacy
              </a>
              <a className="transition-colors hover:text-slate-900" href="/faq" title="Veelgestelde vragen">
                FAQ
              </a>
              <a
                className="transition-colors hover:text-slate-900"
                href="/guides"
                title="Bekijk handleidingen"
              >
                Handleidingen
              </a>
              <a
                className="transition-colors hover:text-slate-900"
                href="/contact"
                title="Plan een intakegesprek"
              >
                Plan een intake
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:grid-cols-[1fr_auto] sm:items-start">
          <div className="flex flex-col gap-2">
            <p>© {new Date().getFullYear()} Your AI Worker. Alle rechten voorbehouden.</p>
            <p className="text-[11px] text-slate-400">{CONTACT_ADDRESS_DISPLAY}</p>
            <p className="text-[11px] text-slate-400">{COMPANY_LEGAL_LINE}</p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
              href={CONTACT_CTA.href}
              title={CONTACT_CTA.title}
              target="_blank"
              rel="noreferrer"
            >
              {CONTACT_CTA.label}
            </a>

            <p className="text-[11px] text-slate-400">
              {CONTACT_HOURS} - {CONTACT_RESPONSE_TIME}
            </p>

            <p className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
              <a
                className="underline underline-offset-2 transition-colors hover:text-slate-500"
                href="/security"
                title="Lees over beveiliging"
              >
                Security-first
              </a>
              <span className="text-slate-300">|</span>
              <a
                className="underline underline-offset-2 transition-colors hover:text-slate-500"
                href="/privacy"
                title="Lees het privacybeleid"
              >
                Privacy
              </a>
            </p>

            <div className="flex flex-col gap-1 text-left sm:text-right">
              <a
                className="transition-colors hover:text-slate-600"
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label={`Stuur een e-mail naar ${CONTACT_EMAIL_DISPLAY}`}
                title={`Stuur een e-mail naar ${CONTACT_EMAIL_DISPLAY}`}
              >
                {CONTACT_EMAIL_DISPLAY}
              </a>
              {CONTACT_PHONE ? (
                <a className="transition-colors hover:text-slate-600" href={`tel:${CONTACT_PHONE}`}>
                  {CONTACT_PHONE}
                </a>
              ) : null}
              <span className="text-[11px] text-slate-300">
                {CONTACT_KVK_LABEL}: {CONTACT_KVK} | {CONTACT_BTW_LABEL}: {CONTACT_BTW}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default RootLayout
