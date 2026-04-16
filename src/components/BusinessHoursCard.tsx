"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Calendar, CheckCircle, XCircle, AlertCircle } from "lucide-react"

const BUSINESS_HOURS = {
  start: 9, // 09:00
  end: 17, // 17:00
  timezone: "Europe/Amsterdam",
}

const DAYS_OFF = [0, 6] // Sunday = 0, Saturday = 6
const DAY_NAMES = ["zo", "ma", "di", "wo", "do", "vr", "za"]

type DaySchedule = {
  day: string
  hours: string
  isToday: boolean
  isOpen: boolean
}

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

function getResponseTimeMessage(date: Date, isOpen: boolean): string {
  const day = date.getDay()
  const hour = date.getHours()

  if (isOpen) {
    return "Reactie binnen enkele uren"
  }

  if (DAYS_OFF.includes(day)) {
    return "Reactie op maandag"
  }

  if (hour < BUSINESS_HOURS.start) {
    return "Reactie vanaf 09:00"
  }

  // After hours
  const tomorrow = new Date(date)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowDay = tomorrow.getDay()

  if (tomorrowDay === 6) {
    return "Reactie maandag 09:00"
  }
  if (tomorrowDay === 0) {
    return "Reactie maandag 09:00"
  }

  return "Reactie morgen 09:00"
}

function getSchedule(): DaySchedule[] {
  const amsterdamNow = getAmsterdamTime()
  const today = amsterdamNow.getDay()

  return Array.from({ length: 7 }, (_, i) => {
    const dayIndex = i
    const isToday = dayIndex === today
    const isWeekend = DAYS_OFF.includes(dayIndex)
    const isOpen = isToday ? isBusinessOpen(amsterdamNow) : !isWeekend

    return {
      day: DAY_NAMES[dayIndex],
      hours: isWeekend ? "Gesloten" : "09:00 - 17:00",
      isToday,
      isOpen: isWeekend ? false : isToday ? isOpen : true,
    }
  })
}

export const BusinessHoursCard: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>("")
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [schedule, setSchedule] = useState<DaySchedule[]>([])

  useEffect(() => {
    setMounted(true)
    const updateStatus = () => {
      const amsterdamTime = getAmsterdamTime()
      const open = isBusinessOpen(amsterdamTime)
      setIsOpen(open)
      setCurrentTime(
        amsterdamTime.toLocaleTimeString("nl-NL", {
          hour: "2-digit",
          minute: "2-digit",
        })
      )
      setResponseMessage(getResponseTimeMessage(amsterdamTime, open))
      setSchedule(getSchedule())
    }

    updateStatus()
    const interval = setInterval(updateStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="h-32 rounded-xl bg-slate-100" />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Openingstijden</h2>
          <p className="mt-1 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Amsterdam, Nederland
            </span>
          </p>
        </div>
        <div
          className={[
            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
            isOpen
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-slate-200 bg-slate-50 text-slate-600",
          ].join(" ")}
        >
          {isOpen ? (
            <CheckCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          ) : (
            <XCircle className="h-4 w-4 text-slate-400" aria-hidden="true" />
          )}
          <span className="text-sm font-medium">{isOpen ? "Nu open" : "Gesloten"}</span>
        </div>
      </div>

      {/* Current status */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium text-slate-900">{currentTime}</span>
            <span className="text-xs text-slate-500">CET/CEST</span>
          </span>
          <span className="hidden text-slate-300 sm:inline" aria-hidden="true">|</span>
          <span className="inline-flex items-center gap-1.5 text-sm">
            <AlertCircle className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <span className="text-slate-600">{responseMessage}</span>
          </span>
        </div>
      </div>

      {/* Weekly schedule */}
      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 mb-3">
          <Calendar className="h-3.5 w-3.5 inline mr-1" aria-hidden="true" />
          Weekoverzicht
        </p>
        <div className="grid grid-cols-7 gap-2">
          {schedule.map((day) => (
            <div
              key={day.day}
              className={[
                "rounded-lg border p-2 text-center transition-colors",
                day.isToday
                  ? "border-slate-900 bg-slate-900 text-white"
                  : day.isOpen
                  ? "border-slate-200 bg-white"
                  : "border-slate-100 bg-slate-50/50",
                day.isToday ? "ring-2 ring-slate-900 ring-offset-2" : "",
              ].join(" ")}
            >
              <p
                className={[
                  "text-xs font-semibold uppercase",
                  day.isToday ? "text-white" : "text-slate-500",
                ].join(" ")}
              >
                {day.day}
              </p>
              <p
                className={[
                  "mt-1 text-xs",
                  day.isToday
                    ? "text-white/90"
                    : day.hours === "Gesloten"
                    ? "text-slate-400"
                    : "text-slate-700",
                ].join(" ")}
              >
                {day.hours === "Gesloten" ? "-" : "09-17"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <p className="mt-5 text-xs text-slate-500">
        Weekend en feestdagen: gesloten. Bij urgente zaken tijdens kantooruren bellen we terug binnen 1 uur.
      </p>
    </div>
  )
}

export default BusinessHoursCard
