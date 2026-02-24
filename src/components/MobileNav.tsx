"use client"

import { useEffect, useState } from "react"
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

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove("overflow-hidden")
      return
    }

    document.body.classList.add("overflow-hidden")
    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Sluit menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-site-nav"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        className={[
          "fixed inset-0 z-50 transition-opacity duration-300",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          tabIndex={isOpen ? 0 : -1}
          aria-label="Sluit menu overlay"
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-slate-950/50"
        />
        <div
          id="mobile-site-nav"
          role="dialog"
          aria-modal="true"
          className={[
            "absolute right-0 top-0 h-screen w-[min(22rem,92vw)] border-l border-slate-200 bg-white shadow-2xl shadow-slate-950/20",
            "transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="flex h-full flex-col p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Menu</p>
              <button
                type="button"
                aria-label="Sluit menu"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-6 flex flex-1 flex-col gap-1 text-sm text-slate-700">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href={cta.href}
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              {cta.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
