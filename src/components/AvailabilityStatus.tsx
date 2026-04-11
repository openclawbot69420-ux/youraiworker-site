'use client'

import { useEffect, useState } from 'react'
import { Clock, CheckCircle, AlertCircle, Info } from 'lucide-react'

/**
 * Displays current availability status based on Amsterdam business hours.
 * Provides transparency about when users can expect a response.
 */
export const AvailabilityStatus: React.FC = () => {
  const [status, setStatus] = useState<'available' | 'limited' | 'unavailable' | null>(null)
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date()
      
      // Format current time in Amsterdam timezone
      const timeFormatter = new Intl.DateTimeFormat('nl-NL', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Amsterdam',
      })
      setCurrentTime(timeFormatter.format(now))

      // Get day and hour in Amsterdam timezone
      const dayFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        timeZone: 'Europe/Amsterdam',
      })
      const hourFormatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone: 'Europe/Amsterdam',
      })

      const day = dayFormatter.format(now)
      const hour = parseInt(hourFormatter.format(now), 10)

      // Check if it's a weekend (Sat = 6, Sun = 0 in JS for Date.getDay())
      // Note: dayFormatter gives short English names
      const isWeekend = day === 'Sat' || day === 'Sun'
      
      // Business hours: 9:00 - 17:00 on weekdays
      const isBusinessHours = !isWeekend && hour >= 9 && hour < 17
      
      // Limited hours: 17:00-21:00 on weekdays (might still respond)
      const isExtendedHours = !isWeekend && hour >= 17 && hour < 21

      if (isBusinessHours) {
        setStatus('available')
      } else if (isExtendedHours) {
        setStatus('limited')
      } else if (isWeekend) {
        setStatus('unavailable')
      } else {
        // Weekday outside hours
        setStatus('unavailable')
      }
    }

    checkAvailability()
    const interval = setInterval(checkAvailability, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  if (status === null) return null

  const config = {
    available: {
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      label: 'Nu online',
      message: 'Typisch antwoord binnen enkele uren',
    },
    limited: {
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      label: 'Beperkte beschikbaheid',
      message: 'Reactie mogelijk tot 21:00, anders morgen',
    },
    unavailable: {
      icon: Info,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      label: 'Offline',
      message: 'Reactie binnen 1 werkdag',
    },
  }

  const { icon: Icon, ...style } = config[status]

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border ${style.borderColor} ${style.bgColor} px-3 py-1.5`}>
      <Icon className={`h-3.5 w-3.5 ${style.color}`} aria-hidden="true" />
      <span className={`text-xs font-medium ${style.color}`}>
        {style.label} · {style.message}
      </span>
      <span className="text-xs text-slate-400" aria-hidden="true">|</span>
      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
        <Clock className="h-3 w-3" aria-hidden="true" />
        {currentTime} CET
      </span>
    </div>
  )
}

export default AvailabilityStatus