"use client"

import { useState, useCallback } from "react"
import { Link2, Check } from "lucide-react"

interface CopySectionLinkProps {
  sectionId: string
  className?: string
}

export const CopySectionLink: React.FC<CopySectionLinkProps> = ({
  sectionId,
  className = "",
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: silently fail
    }
  }, [sectionId])

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={[
        "group inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium",
        "text-slate-400 transition-all duration-200",
        "hover:bg-slate-100 hover:text-slate-600",
        "focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1",
        copied ? "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" : "",
        className,
      ].join(" ")}
      title={copied ? "Link gekopieerd!" : "Kopieer link naar deze sectie"}
      aria-label={copied ? "Link gekopieerd naar klembord" : "Kopieer link naar sectie"}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Gekopieerd</span>
        </>
      ) : (
        <>
          <Link2 className="h-3.5 w-3.5 transition-transform group-hover:scale-110" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Kopieer link</span>
        </>
      )}
    </button>
  )
}

export default CopySectionLink
