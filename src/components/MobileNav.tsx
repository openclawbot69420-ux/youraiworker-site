"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

type NavItem = {
  href: string
  label: string
}

interface MobileNavProps {
  items: NavItem[]
  cta: NavItem
}

export const MobileNav: React.FC<MobileNavProps> = (props) => {
  const { items, cta } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Sluit menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-site-nav"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900"
      >
        {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>

      {isOpen ? (
        <div
          id="mobile-site-nav"
          className="absolute right-0 top-full mt-3 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-900/10"
        >
          <nav className="flex flex-col gap-1 text-sm text-slate-700">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
            <a
              href={cta.href}
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-lg bg-slate-900 px-3 py-2 text-center font-medium text-white transition-colors hover:bg-slate-800"
            >
              {cta.label}
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  )
}
