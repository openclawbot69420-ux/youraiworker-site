"use client"

import { ExternalLink } from "lucide-react"
import { usePathname } from "next/navigation"
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
  { href: "/about", label: "Over ons", title: "Lees meer over ons" },
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

// Helper to check if a nav item is active
// Matches exact path or subpaths (e.g., /guides matches /guides/slug)
const isActivePath = (pathname: string, href: string): boolean => {
  if (href === "/") return pathname === "/"
  if (href.startsWith("http")) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

export const Header: React.FC = () => {
  const pathname = usePathname()

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

        {/* Mobile navigation with current path for active state */}
        <MobileNav items={NAV_ITEMS} cta={HEADER_CTA} currentPath={pathname} />

        {/* Desktop navigation with active states */}
        <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = isActivePath(pathname, item.href)
            return (
              <a
                key={item.href}
                className={[
                  "inline-flex items-center gap-1 transition-colors relative",
                  isActive
                    ? "text-slate-900 font-medium"
                    : "text-slate-700 hover:text-slate-900",
                ].join(" ")}
                href={item.href}
                title={item.title}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? (item.rel ?? "noreferrer") : undefined}
                {...(isActive ? { "aria-current": "page" } : {})}
              >
                <span>{item.label}</span>
                {item.external ? (
                  <ExternalLink
                    className="h-3.5 w-3.5 text-slate-400"
                    aria-hidden="true"
                  />
                ) : null}
                {/* Active indicator dot */}
                {isActive && !item.external && (
                  <span
                    className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-500"
                    aria-hidden="true"
                  />
                )}
              </a>
            )
          })}
          <a
            className="rounded-lg bg-slate-900 px-4 py-2 text-white transition-colors hover:bg-slate-800"
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
