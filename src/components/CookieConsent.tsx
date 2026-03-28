"use client"

import { useEffect, useState } from "react"
import { X, Cookie, ExternalLink } from "lucide-react"

const CONSENT_KEY = "cookie-consent"

type ConsentState = "accepted" | "declined" | "pending"

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [consent, setConsent] = useState<ConsentState>("pending")

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
    setConsent(stored as ConsentState)
  }, [])

  const handleAccept = () => {
    setConsent("accepted")
    setVisible(false)
    localStorage.setItem(CONSENT_KEY, "accepted")
  }

  const handleDecline = () => {
    setConsent("declined")
    setVisible(false)
    localStorage.setItem(CONSENT_KEY, "declined")
  }

  const handleDismiss = () => {
    setVisible(false)
  }

  // Don't render if already decided or not visible
  if (!visible || consent !== "pending") return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-instellingen"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-2xl sm:border sm:p-5"
    >
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
          <Cookie className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-900">
              Cookies en privacy
            </h2>
            <button
              onClick={handleDismiss}
              aria-label="Sluiten"
              className="-mr-1 -mt-1 inline-flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            We gebruiken alleen functionele cookies die nodig zijn voor het
            werken van deze website. Geen tracking, geen advertenties.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href="/privacy"
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 underline underline-offset-2 transition-colors hover:text-slate-900"
            >
              Privacybeleid
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={handleAccept}
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
        >
          Begrepen
        </button>
        <button
          onClick={handleDecline}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Weigeren
        </button>
      </div>
    </div>
  )
}
