'use client'

import { useEffect, useState } from 'react'
import { Copy } from 'lucide-react'
import { useSuccessToast } from './Toast'

/**
 * Format a date to relative time in Dutch (e.g., "2 uur geleden", "vandaag")
 */
const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  // Less than 1 hour ago
  if (diffInMinutes < 1) {
    return 'zojuist'
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minuut' : 'minuten'} geleden`
  }

  // Less than 24 hours ago
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'uur' : 'uur'} geleden`
  }

  // Today (same calendar day)
  if (date.toDateString() === now.toDateString()) {
    return 'vandaag'
  }

  // Yesterday
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) {
    return 'gisteren'
  }

  // Less than 7 days ago
  if (diffInDays < 7) {
    return `${diffInDays} dagen geleden`
  }

  // Less than 30 days ago
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks} ${weeks === 1 ? 'week' : 'weken'} geleden`
  }

  // Fallback to absolute date
  return date.toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Displays the last build/update date with relative time indicator.
 * Shows the build timestamp to demonstrate active site maintenance.
 * Includes human-readable relative time (e.g., "2 uur geleden") for modern polish.
 */
export const BuildInfo: React.FC = () => {
  const [buildDate, setBuildDate] = useState<string>('')
  const [relativeTime, setRelativeTime] = useState<string>('')

  useEffect(() => {
    // Use build time from env or fallback to current date for static generation
    const date = process.env.NEXT_PUBLIC_BUILD_DATE
      ? new Date(process.env.NEXT_PUBLIC_BUILD_DATE)
      : new Date()
    setBuildDate(
      date.toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }) +
        ' ' +
        date.toLocaleTimeString('nl-NL', {
          hour: '2-digit',
          minute: '2-digit',
        }) +
        ' CET'
    )
    setRelativeTime(formatRelativeTime(date))
  }, [])

  if (!buildDate) return null

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400" title={`Laatste site-update: ${buildDate}`}>
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" aria-hidden="true" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
      </span>
      <span>Actief beheerd - bijgewerkt{" "}
        <time dateTime={process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString()}>
          {relativeTime}
        </time>
      </span>
    </span>
  )
}

/**
 * CopyButton - Small button to copy text to clipboard with toast feedback.
 */
interface CopyButtonProps {
  text: string
  label: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, label }) => {
  const showSuccess = useSuccessToast()
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      showSuccess(`${label} gekopieerd naar klembord`)
    } catch {
      // Silently fail if clipboard API not available
    }
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
      title={`Kopieer ${label}`}
      aria-label={`Kopieer ${label}`}
    >
      <Copy className="h-3 w-3" aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}

export default BuildInfo
