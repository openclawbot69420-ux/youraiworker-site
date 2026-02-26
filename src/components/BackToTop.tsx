"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener("scroll", toggleVisibility)
    toggleVisibility() // Check initial position

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={[
        "fixed bottom-6 right-6 z-40",
        "inline-flex h-12 w-12 items-center justify-center",
        "rounded-full border border-slate-200 bg-white text-slate-700",
        "shadow-lg shadow-slate-900/10",
        "transition-all duration-200",
        "hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
        "motion-reduce:transition-none",
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none",
      ].join(" ")}
      aria-label="Scroll naar boven"
      aria-hidden={!isVisible}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}
