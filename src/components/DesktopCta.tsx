"use client"

import { useEffect, useState } from "react"
import { Calendar, X, ArrowRight } from "lucide-react"

const CONTACT_CALENDAR_URL = "https://cal.com/youraiworker"
const CONTACT_EMAIL = "info@youraiworker.nl"

/**
 * DesktopCta - A sticky sidebar CTA for desktop users.
 * Appears after scrolling past the hero section.
 * Provides constant access to booking without intruding on content.
 */
export const DesktopCta: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      // Show after scrolling 600px (past hero) on desktop only
      const isDesktop = window.innerWidth >= 1024
      setVisible(isDesktop && scrollY > 600 && !dismissed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [dismissed])

  if (!visible) return null

  return (
    <aside className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
      <div className="w-64 rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-lg shadow-slate-900/10 backdrop-blur-xl animate-in slide-in-from-right-4 duration-300">
        <button
          onClick={() => setDismissed(true)}
          className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          aria-label="Sluit sidebar"
          title="Sluiten"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Calendar className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Klaar om te automatiseren?</p>
            <p className="text-xs text-slate-500">Plan een intake</p>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-600">
          Bespreken jouw workflow, schatting van scope en planning. Binnen 1 werkdag reactie.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <a
            href={CONTACT_CALENDAR_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:shadow-sm"
            aria-label="Plan een intake van 20 minuten"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>Plan intake (20 min)</span>
            <ArrowRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
          </a>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <span>Mail je vraag</span>
          </a>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          <span>Reactie binnen 1 werkdag</span>
        </div>
      </div>
    </aside>
  )
}
