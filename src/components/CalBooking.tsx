"use client";

import { useEffect, useState, useCallback } from "react"
import { Calendar, Loader2, AlertCircle } from "lucide-react"

interface CalBookingProps {
  calLink?: string
}

type LoadState = "loading" | "success" | "error"

// Professional Cal.com embed with loading state and error handling
// Prevents layout shift and provides clear feedback during load
export const CalBooking: React.FC<CalBookingProps> = ({
  calLink = "youraiworker",
}) => {
  const [loadState, setLoadState] = useState<LoadState>("loading")
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const handleRetry = useCallback(() => {
    setLoadState("loading")
    // Force re-render to re-attempt Cal initialization
    window.location.reload()
  }, [])

  useEffect(() => {
    // Check if Cal script already exists and is loaded
    const existing = document.getElementById("cal-booking-script") as HTMLScriptElement | null

    if (existing) {
      if (existing.dataset.loaded === "true") {
        setScriptLoaded(true)
        setLoadState("success")
      }
      return
    }

    const script = document.createElement("script")
    script.id = "cal-booking-script"
    script.src = "https://cal.com/embed.js"
    script.async = true
    script.defer = true

    script.onload = () => {
      script.dataset.loaded = "true"
      setScriptLoaded(true)
      setLoadState("success")
    }

    script.onerror = () => {
      setLoadState("error")
    }

    // Timeout fallback - Cal sometimes loads but doesn't fire onload
    const timeoutId = setTimeout(() => {
      if (!scriptLoaded) {
        // Check if Cal API is available (it loaded silently)
        if (typeof (window as {Cal?: unknown}).Cal !== "undefined") {
          setScriptLoaded(true)
          setLoadState("success")
        }
      }
    }, 5000)

    document.body.appendChild(script)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [scriptLoaded])

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        {/* Outer ring */}
        <div className="absolute inset-0 h-14 w-14 rounded-full border-2 border-slate-100" />
        {/* Animated ring */}
        <div className="h-14 w-14 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900">
        </div>
        {/* Icon centered */}
        <span className="absolute inset-0 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-slate-500" />
        </span>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-600">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        <span>Kalender wordt geladen...</span>
      </div>
      <p className="mt-2 text-xs text-slate-400">Dit duurt even als je dit voor de eerste keer doet</p>
    </div>
  )

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-rose-200 bg-rose-50">
        <AlertCircle className="h-6 w-6 text-rose-500" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">Kan kalender niet laden</h3>
      <p className="mt-1 max-w-xs text-sm text-slate-500">
        Er ging iets mis bij het laden van de afsprakenkalender.
        Dit kan door je netwerk of een ad-blocker komen.
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={handleRetry}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          <Loader2 className="h-4 w-4" />
          Opnieuw proberen
        </button>
        <a
          href={`https://cal.com/${calLink}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
        >
          Direct openen
          <span className="sr-only">(opent in nieuw tabblad)</span>
        </a>
      </div>
    </div>
  )

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {loadState === "loading" && <LoadingState />}

      {loadState === "error" && <ErrorState />}

      {loadState !== "error" && (
        <div
          data-cal-namespace=""
          data-cal-link={calLink}
          data-cal-config={`{"layout":"month_view","theme":"light"}`}
          className={`min-h-[580px] w-full ${loadState === "loading" ? "hidden" : ""}`}
          aria-live="polite"
          aria-busy={loadState === "loading"}
        />
      )}
    </div>
  )
}
