import type { Metadata } from "next"
import { Github, Linkedin, MapPin, Lock, LifeBuoy } from "lucide-react"
import { MobileNav } from "../components/MobileNav"
import { BackToTop } from "../components/BackToTop"
import "../styles/globals.css"
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "./jsonld"

const SITE_NAME = "Your AI Worker"
const SITE_URL = "https://youraiworker.nl"
const DEFAULT_TITLE = "Productierijpe AI-agents voor je organisatie"
const DEFAULT_DESCRIPTION =
  "Maatwerk AI-agents die je organisatie echt werk uit handen nemen. Productierijp, veilig ingericht en binnen dagen live."

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - ${DEFAULT_TITLE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
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
    canonical: `${SITE_URL}/`,
    languages: {
      nl: `${SITE_URL}/`,
      "x-default": `${SITE_URL}/`,
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${DEFAULT_TITLE}`,
    description: DEFAULT_DESCRIPTION,
    url: `${SITE_URL}/`,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ${DEFAULT_TITLE}`,
    description: DEFAULT_DESCRIPTION,
    images: ["/og.png"],
  },
  other: {
    "application-name": SITE_NAME,
    "apple-mobile-web-app-title": SITE_NAME,
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "msapplication-TileColor": "#0f172a",
  },
  authors: [{ name: "Your AI Worker" }],
  creator: "Your AI Worker",
  publisher: "Your AI Worker",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
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
  external?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { href: "/use-cases", label: "Toepassingen" },
  { href: "/integrations", label: "Integraties" },
  { href: "/implementatie", label: "Implementatie" },
  { href: "/pricing", label: "Prijzen" },
  { href: "/contact", label: "Contact" },
  { href: "/security", label: "Beveiliging" },
  {
    href: "https://github.com/openclawbot69420-ux/youraiworker-site",
    label: "GitHub",
    external: true,
  },
]

const HEADER_CTA: NavItem = { href: "/contact", label: "Plan een intake" }

const buildNavHref = (item: NavItem) => {
  if (!item.external) return item.href

  const url = new URL(item.href)

  return `${url.pathname}${url.search}${url.hash}`
}

const RootLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props

  const orgJsonLd = buildOrganizationJsonLd()
  const websiteJsonLd = buildWebSiteJsonLd()

  return (
    <html lang="nl">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="robots" content="index, follow" />

        <meta name="theme-color" content="#0f172a" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
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
        <a href="/" className="text-lg font-semibold tracking-tight text-slate-900">
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
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
              >
                {item.label}
              </a>
            )
          })}
          <a
            className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 transition-colors"
            href={HEADER_CTA.href}
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
              <LifeBuoy className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              48u warranty + 2 weken support
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12 text-sm text-slate-600">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="text-base font-semibold text-slate-900">Your AI Worker</p>
            <p className="mt-2 max-w-sm leading-relaxed">
              Production-ready AI-agents voor Nederlandse bedrijven. Maatwerk automatisering,
              veilig ingericht en snel live.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/youraiworker"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://github.com/openclawbot69420-ux/youraiworker-site"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
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
              <a className="transition-colors hover:text-slate-900" href="/use-cases">
                Toepassingen
              </a>
              <a className="transition-colors hover:text-slate-900" href="/integrations">
                Integraties
              </a>
              <a className="transition-colors hover:text-slate-900" href="/implementatie">
                Implementatie
              </a>
              <a className="transition-colors hover:text-slate-900" href="/pricing">
                Prijzen
              </a>
              <a className="transition-colors hover:text-slate-900" href="/contact">
                Contact
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Bedrijf
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a className="transition-colors hover:text-slate-900" href="/security">
                Beveiliging
              </a>
              <a className="transition-colors hover:text-slate-900" href="/privacy">
                Privacy
              </a>
              <a className="transition-colors hover:text-slate-900" href="/guides">
                Handleidingen
              </a>
              <a className="transition-colors hover:text-slate-900" href="/contact">
                Plan een intake
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Your AI Worker. Alle rechten voorbehouden.</p>
          <p className="flex flex-col gap-1 text-right">
            <a
              className="transition-colors hover:text-slate-600"
              href="mailto:info@youraiworker.nl"
            >
              info@youraiworker.nl
            </a>
            <a
              className="text-[11px] text-slate-300 transition-colors hover:text-slate-500"
              href="/privacy"
            >
              Privacybeleid
            </a>
            <span className="text-[11px] text-slate-300">
              KvK: 95290475 | BTW: NL8677.15.849.B01
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default RootLayout
