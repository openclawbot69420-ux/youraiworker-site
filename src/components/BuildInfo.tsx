'use client'

import { useEffect, useState } from 'react'
import { Copy } from 'lucide-react'
import { useSuccessToast } from './Toast'

/**
 * Displays the last build/update date.
 * Shows the build timestamp to demonstrate active site maintenance.
 */
export const BuildInfo: React.FC = () => {
  const [buildDate, setBuildDate] = useState<string>('')

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
  }, [])

  if (!buildDate) return null

  return (
    <span className="text-[11px] text-slate-400" title="Laatste site-update">
      Laatst bijgewerkt:{" "}
      <time dateTime={process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString()}>
        {buildDate}
      </time>
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
