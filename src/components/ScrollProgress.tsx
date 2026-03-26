"use client"

import { useEffect, useState } from "react"

/**
 * ScrollProgress - A subtle progress bar fixed at the top of the viewport.
 * Shows reading progress on scrollable pages. Adds professional polish
 * without interfering with the design.
 */
export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      // Calculate scroll progress as percentage
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, scrollPercent)))
    }

    // Throttle updates for performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress()
          ticking = false
        })
        ticking = true
      }
    }

    // Initial calculation
    updateProgress()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateProgress, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  // Don't render if at top (no progress to show)
  if (progress === 0) return null

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
      style={{
        width: `${progress}%`,
        transition: "width 0.1s ease-out",
      }}
      aria-hidden="true"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Leesvoortgang"
    />
  )
}
