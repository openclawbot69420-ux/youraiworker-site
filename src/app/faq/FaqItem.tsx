"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Link2, Check } from "lucide-react"

interface FaqItemProps {
  id: string
  question: string
  answer: string
}

export function FaqItem({ id, question, answer }: FaqItemProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const detailsRef = useRef<HTMLDetailsElement>(null)

  // Sync the open state with the details element
  const handleToggle = useCallback(() => {
    if (detailsRef.current) {
      setIsOpen(detailsRef.current.open)
    }
  }, [])

  // Check if URL has hash matching this FAQ on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === `#${id}`) {
      const el = document.getElementById(id) as HTMLDetailsElement | null
      if (el) {
        el.open = true
        setIsOpen(true)
      }
    }
  }, [id])

  const copyLink = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: update URL hash
      window.history.replaceState(null, "", `#${id}`)
    }
    // Open the details element
    const el = document.getElementById(id) as HTMLDetailsElement | null
    if (el) {
      el.open = true
      setIsOpen(true)
    }
  }, [id])

  return (
    <details
      id={id}
      ref={detailsRef}
      onToggle={handleToggle}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm scroll-mt-24"
    >
      <summary
        className="cursor-pointer list-none text-base font-semibold text-slate-900"
        aria-expanded={isOpen}
      >
        <span className="flex items-start justify-between gap-4">
          <span className="flex items-center gap-3">
            {question}
            <button
              onClick={copyLink}
              className={[
                "inline-flex opacity-0 transition-all group-hover:opacity-100 focus:opacity-100",
                "rounded-full border p-1.5",
                copied
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600 opacity-100"
                  : "border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                "focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1",
              ].join(" ")}
              aria-label={copied ? "Link gekopieerd naar klembord" : "Kopieer link naar deze vraag"}
              title={copied ? "Link gekopieerd" : "Kopieer link naar deze vraag"}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          </span>
          <span aria-hidden="true" className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform group-open:rotate-45">
            +
          </span>
        </span>
      </summary>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{answer}</p>
    </details>
  )
}
