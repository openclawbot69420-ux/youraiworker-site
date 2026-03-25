"use client"

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type BreadcrumbItem = {
  label: string
  href: string
  isCurrent?: boolean
}

const PATH_LABELS: Record<string, string> = {
  "pricing": "Prijzen",
  "contact": "Contact",
  "use-cases": "Toepassingen",
  "faq": "FAQ",
  "security": "Beveiliging",
  "privacy": "Privacy",
  "terms": "Voorwaarden",
  "guides": "Handleidingen",
  "implementatie": "Implementatie",
  "integrations": "Integraties",
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }]
  
  const segments = pathname.split("/").filter(Boolean)
  
  segments.forEach((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const label = PATH_LABELS[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    crumbs.push({
      label,
      href,
      isCurrent: index === segments.length - 1,
    })
  })
  
  return crumbs
}

export function Breadcrumbs(): React.ReactElement | null {
  const pathname = usePathname()
  
  // Only show on inner pages, not home
  if (pathname === "/" || !pathname) return null
  
  // Don't show on very short paths that might be modals or special routes
  if (pathname.startsWith("/api/")) return null
  
  const items = generateBreadcrumbs(pathname)
  
  return (
    <nav
      aria-label="Breadcrumb navigatie"
      className="border-b border-slate-200/70 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-3">
        <ol
          className="flex flex-wrap items-center gap-1.5 text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => (
            <li
              key={item.href}
              className="flex items-center gap-1.5"
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(index + 1)} />
              {item.isCurrent ? (
                <span
                  itemProp="name"
                  className="font-medium text-slate-900"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  itemProp="item"
                  className={[
                    "flex items-center gap-1 text-slate-600 transition-colors hover:text-slate-900",
                    index === 0 ? "inline-flex items-center gap-1" : "",
                  ].join(" ")}
                  title={`Ga naar ${item.label}`}
                >
                  <span itemProp="name">
                    {index === 0 ? (
                      <>
                        <Home className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="sr-only">{item.label}</span>
                      </>
                    ) : (
                      item.label
                    )}
                  </span>
                </Link>
              )}
              {!item.isCurrent && (
                <ChevronRight
                  className="h-3.5 w-3.5 text-slate-400"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
