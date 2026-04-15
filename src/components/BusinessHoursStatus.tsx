"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

const BUSINESS_HOURS = {
  start: 9, // 09:00
  end: 17, // 17:00
  timezone: "Europe/Amsterdam",
}

const DAYS_OFF = [0, 6] // Sunday, Saturday

function getAmsterdamTime(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: BUSINESS_HOURS.timezone })
  )
}

function isBusinessOpen(date: Date): boolean {
  const day = date.getDay()
  const hour = date.getHours()

  if (DAYS_OFF.includes(day)) return false
  return hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end
}

function formatAmsterdamTime(date: Date): string {
  return date.toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: BUSINESS_HOURS.timezone,
  })
}

function getNextOpenTime(date: Date): string {
  const day = date.getDay()
  const hour = date.getHours()

  if (DAYS_OFF.includes(day)) {
    // Next open is Monday 09:00
    return "maandag 09:00"
  }

  if (hour < BUSINESS_HOURS.start) {
    return "vandaag 09:00"
  }

  if (hour >= BUSINESS_HOURS.end) {
    // Tomorrow, but check if it's a weekend
    const tomorrow = new Date(date)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowDay = tomorrow.getDay()

    if (DAYS_OFF.includes(tomorrowDay)) {
      // Find next Monday
      const daysUntilMonday = tomorrowDay === 6 ? 2 : 1
      return `maandag 09:00`
    }

    return "morgen 09:00"
  }

  return "maandag 09:00"
}

export const BusinessHoursStatus: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const [amsterdamTime, setAmsterdamTime] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const time = getAmsterdamTime()
      setAmsterdamTime(time)
      setIsOpen(isBusinessOpen(time))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || !amsterdamTime) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
        <Clock className="h-3 w-3" aria-hidden="true" />
        <span>Amsterdam (CET)</span>
      </span>
    )
  }

  const nextOpen = getNextOpenTime(amsterdamTime)

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] transition-colors"
      title={`We zijn ${isOpen ? "open" : "gesloten"}. ${isOpen ? "Sluit om 17:00" : `Volgende keer open: ${nextOpen}`}`}
    >
      <Clock className="h-3 w-3" aria-hidden="true" />
      <span className="text-slate-400">{formatAmsterdamTime(amsterdamTime)}</span>
      <span
        className={[
          "inline-flex h-1.5 w-1.5 rounded-full",
          isOpen ? "bg-emerald-500" : "bg-slate-300",
        ].join(" ")}
        aria-hidden="true"
      />
      <span className={isOpen ? "text-emerald-700" : "text-slate-500"}>
        {isOpen ? "Open" : "Gesloten"}
      </span>
      {!isOpen && (
        <span className="text-slate-400">- weer open {nextOpen}</span>
      )}
    </span>
  )
}
