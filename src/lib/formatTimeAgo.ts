/**
 * Format a date as relative time in Dutch
 * Shows "2 maanden geleden" style strings for recent dates
 * Falls back to absolute dates for older content
 */

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const YEAR = 365 * DAY

interface TimeAgoOptions {
  /** Show "just now" for very recent dates (default: true) */
  includeJustNow?: boolean
  /** Threshold in days after which to show absolute date instead (default: 365) */
  absoluteAfterDays?: number
}

export function formatTimeAgo(
  date: Date | string,
  options: TimeAgoOptions = {}
): string {
  const { includeJustNow = true, absoluteAfterDays = 365 } = options

  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()

  // Future dates
  if (diff < 0) {
    return "binnenkort"
  }

  // Just now (under 1 minute)
  if (includeJustNow && diff < MINUTE) {
    return "zojuist"
  }

  // Minutes
  if (diff < HOUR) {
    const minutes = Math.floor(diff / MINUTE)
    return `${minutes} minuut${minutes === 1 ? "" : "en"} geleden`
  }

  // Hours
  if (diff < DAY) {
    const hours = Math.floor(diff / HOUR)
    return `${hours} uur geleden`
  }

  // Days (under a week)
  if (diff < WEEK) {
    const days = Math.floor(diff / DAY)
    if (days === 1) return "gisteren"
    return `${days} dagen geleden`
  }

  // Weeks (under a month)
  if (diff < MONTH) {
    const weeks = Math.floor(diff / WEEK)
    if (weeks === 1) return "1 week geleden"
    return `${weeks} weken geleden`
  }

  // Months (under a year)
  if (diff < YEAR) {
    const months = Math.floor(diff / MONTH)
    if (months === 1) return "1 maand geleden"
    return `${months} maanden geleden`
  }

  // Over threshold - return absolute date
  const days = Math.floor(diff / DAY)
  if (days > absoluteAfterDays) {
    return new Intl.DateTimeFormat("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d)
  }

  // Years
  const years = Math.floor(diff / YEAR)
  if (years === 1) return "1 jaar geleden"
  return `${years} jaar geleden`
}

/**
 * Format a date range as "X - Y" with relative time hint
 */
export function formatDateRange(start: Date | string, end?: Date | string): string {
  const startStr = typeof start === "string" ? start : start.toISOString()
  if (!end) {
    return formatTimeAgo(startStr)
  }

  const s = new Date(start)
  const e = new Date(end)
  const now = new Date()

  // If both in past, show relative time for start
  if (s < now && e < now) {
    return formatTimeAgo(s)
  }

  // Otherwise show absolute dates
  const fmt = new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
  })

  return `${fmt.format(s)} - ${fmt.format(e)}`
}

/**
 * Format for data attributes (accessibility)
 */
export function formatDatetimeAttr(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toISOString()
}
