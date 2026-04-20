"use client"

import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export function BackButton(): React.ReactNode {
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    // Check if there's history to go back to
    if (typeof window !== "undefined" && window.history.length > 1) {
      setCanGoBack(true)
    }
  }, [])

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back()
    }
  }

  // Only render if we can go back
  if (!canGoBack) {
    return null
  }

  return (
    <button
      onClick={handleGoBack}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 sm:w-auto"
      type="button"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      Ga terug
    </button>
  )
}
