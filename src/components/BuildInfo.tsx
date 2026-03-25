'use client'

import { useEffect, useState } from 'react'

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
    
    setBuildDate(date.toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }) + ' ' + date.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
    }) + ' CET')
  }, [])

  if (!buildDate) return null

  return (
    <span className="text-[11px] text-slate-400" title="Laatste site-update">
      Laatst bijgewerkt: {buildDate}
    </span>
  )
}

export default BuildInfo
