"use client"

import { usePathname } from "next/navigation"
import { ExternalLink } from "lucide-react"
import { MobileNav } from "./MobileNav"

type NavItem = {
  href: string
  label: string
  title?: string
  external?: boolean
  rel?: string
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
    href: "https://docs.openclaw.ai",
    label: "OpenClaw",
    title: "Lees over OpenClaw (opent in nieuw tabblad)",
    external: true,
    rel: "nofollow",
  },
]

const HEADER_CTA: NavItem = {
  href: "/contact",
  label: "Plan een intake (20 min)",
  title: "Plan een intakegesprek van 20 minuten",
}

const CONTACT_CALENDAR_URL = "https://cal.com/youraiworker"

const buildNavHref = (item: NavItem) => {
  if (!item.external) return item.href
  const url = new URL(item.href)
  return `${url.pathname}${url.search}${url.hash}`
}

export const NavigationHeader: React.FC = () => {
  const currentPath = usePathname()

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
        <MobileNav items={NAV_ITEMS} cta={HEADER_CTA} currentPath={currentPath} />
        <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
          {NAV_ITEMS.map((item) => {
            const href = buildNavHref(item)
            const isActive = currentPath === item.href
            return (
              <a
                key={item.href}
                className="hover:text-slate-900 transition-colors inline-flex items-center gap-1"
                href={href}
                title={item.title}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? item.rel ?? "noreferrer" : undefined}
                {...(isActive ? { "aria-current": "page" } : {})}
              >
                <span>{item.label}</span>
                {item.external ? (
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                ) : null}
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
