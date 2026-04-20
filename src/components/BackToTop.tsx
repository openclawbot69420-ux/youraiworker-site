"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Show button after scrolling down 400px
      setIsVisible(scrollY > 400)

      // Calculate scroll progress: 0% to 100%
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Calculate SVG circle properties for progress ring
  const radius = 20
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

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
        isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none",
      ].join(" ")}
      aria-label={`Scroll naar boven (${Math.round(scrollProgress)}% gelezen)`}
      aria-hidden={!isVisible}
      title={`${Math.round(scrollProgress)}% gelezen - klik om naar boven te scrollen`}
    >
      {/* Progress ring SVG */}
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="2"
        />
        {/* Progress indicator */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#0f172a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="motion-reduce:transition-none"
          style={{
            transition: "stroke-dashoffset 0.1s ease-out",
          }}
        />
      </svg>
      <ArrowUp className="h-5 w-5 relative z-10" aria-hidden="true" />
    </button>
  )
}
