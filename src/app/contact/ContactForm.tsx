"use client"

import { useEffect, useMemo, useState } from "react"

import {
  formatConfigForEmail,
  summarizeConfig,
  type ConfigPayload,
} from "./configSummary"

const CONFIG_STORAGE_KEY = "yaiw_config_v1"

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [config, setConfig] = useState<ConfigPayload | null>(null)
  const [prefillMessage, setPrefillMessage] = useState<string>("")
  const [prefillEmailInput, setPrefillEmailInput] = useState<string>("")
  const [prefillMessageInput, setPrefillMessageInput] = useState<string>("")

  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      const configParam = url.searchParams.get("config")
      const intakeEmailParam = url.searchParams.get("intakeEmail") ?? url.searchParams.get("email")
      const intakeNoteParam = url.searchParams.get("intakeNote") ?? url.searchParams.get("note")

      if (intakeEmailParam) {
        setPrefillEmailInput(intakeEmailParam)
      }

      if (intakeNoteParam) {
        setPrefillMessageInput(intakeNoteParam)
      }

      const stored = localStorage.getItem(CONFIG_STORAGE_KEY)
      const raw = configParam ? decodeURIComponent(configParam) : stored

      if (!raw) {
        return
      }

      const parsed = JSON.parse(raw) as ConfigPayload
      setConfig(parsed)
      setPrefillMessage(`\n\n${formatConfigForEmail(parsed)}`)
    } catch {
      // ignore
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement | null)?.value ?? "",
      message: `${(form.elements.namedItem("message") as HTMLTextAreaElement).value}${prefillMessage}`,
      website: (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "",
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        // Redirect to thank-you page for professional conversion tracking
        window.location.href = "/contact/bedankt"
        return
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  // Note: success state renders on dedicated /contact/bedankt page after redirect
  // This keeps analytics clean and gives users a focused post-submit experience

  const configSummary = useMemo(() => {
    if (!config) {
      return null
    }
    return summarizeConfig(config)
  }, [config])

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {configSummary && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-900">Jouw configuratie</p>
          <p className="mt-2 text-sm text-slate-700">
            <span className="font-semibold">Pakket:</span> {configSummary.packageLabel}
          </p>
          <p className="mt-1 text-sm text-slate-700">
            <span className="font-semibold">Add-ons:</span>{" "}
            {configSummary.addOns.length > 0 ? configSummary.addOns.join(", ") : "Geen"}
          </p>
          <p className="mt-1 text-sm text-slate-700">
            <span className="font-semibold">Volumes:</span>{" "}
            {configSummary.volumes.emailsPerDay} e-mails/dag, {configSummary.volumes.leadsPerWeek} leads/week, {configSummary.volumes.ticketsPerWeek} tickets/week
          </p>
          <p className="mt-1 text-sm text-slate-700">
            <span className="font-semibold">Uurtarief:</span> €{configSummary.hourlyRateEuro}/uur
          </p>
          <a
            href="/configure"
            className="mt-3 inline-block text-sm font-medium text-slate-900 underline"
          >
            Wijzig configuratie
          </a>
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Naam *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            E-mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            defaultValue={prefillEmailInput}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-slate-700">
          Bedrijf
        </label>
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
          Telefoon <span className="text-slate-400 font-normal">(optioneel)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          placeholder="+31 6 12 34 56 78"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
        />
        <p className="mt-1 text-xs text-slate-500">Optioneel - alleen als je liever wordt gebeld</p>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          Bericht *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={prefillMessageInput}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Er ging iets mis bij het versturen. Probeer het later opnieuw.
        </p>
      )}

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
 <>
 <svg className="h-4 w-4 btn-spinner" fill="none" viewBox="0 0 24 24" aria-hidden="true">
 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
 </svg>
 <span>Versturen...</span>
 </>
 ) : (
 "Verstuur"
 )}
        </button>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700" aria-hidden="true">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </span>
          <span>Reactie binnen 1 werkdag gegarandeerd</span>
        </div>
      </div>
    </form>
  )
}
