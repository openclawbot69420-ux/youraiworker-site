"use client"

import { useCallback } from "react"

export default function BackButton(): React.ReactElement {
  const goBack = useCallback(() => {
    window.history.back()
  }, [])

  return (
    <button
      onClick={goBack}
      type="button"
      className="text-sm text-slate-500 transition-colors hover:text-slate-700"
    >
      Ga terug naar de vorige pagina
    </button>
  )
}
