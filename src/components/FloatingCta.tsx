'use client'

import { useEffect, useState } from 'react'
import { Calendar } from 'lucide-react'

const CONTACT_CALENDAR_URL = 'https://cal.com/youraiworker'

export const FloatingCta: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Only show on mobile/tablet after scrolling 400px
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const isMobile = window.innerWidth < 1024
      setVisible(isMobile && scrollY > 400 && !dismissed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [dismissed])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-lg shadow-slate-900/10 backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">
            Plan een intake
          </p>
          <p className="text-xs text-slate-500 truncate">
            20 min - reactie binnen 1 werkdag
          </p>
        </div>
        <a
          href={CONTACT_CALENDAR_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          aria-label="Plan een intake van 20 minuten"
        >
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <span>Boeken</span>
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="ml-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label="Sluit CTA"
          title="Sluiten"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  )
}
