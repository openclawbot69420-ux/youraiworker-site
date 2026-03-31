"use client"

import { useState } from "react"
import { Mail, CheckCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react"

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      setStatus("error")
      setMessage("Vul een geldig e-mailadres in")
      return
    }

    setStatus("loading")
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json().catch(() => null)

      if (response.ok && data?.success) {
        // Redirect to dedicated thank you page for better UX and conversion tracking
        window.location.href = "/newsletter/bedankt"
        return
      } else {
        setStatus("error")
        setMessage(data?.error || "Er ging iets mis bij het aanmelden. Probeer het later opnieuw.")
      }
    } catch {
      setStatus("error")
      setMessage("Er ging iets mis bij het aanmelden. Probeer het later opnieuw.")
    }
  }

  return (
    <section id="nieuwsbrief" className="border-y border-slate-200/70 bg-gradient-to-br from-slate-50 to-slate-100" aria-labelledby="newsletter-heading">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left: Value prop */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              <Mail className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
              <span>Blijf op de hoogte</span>
            </div>
            <h2 id="newsletter-heading" className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Praktische updates over AI-agents voor je bedrijf
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Ontvang elke 2 weken een korte update met: nieuwe use-cases, implementatietips, en wat we leren uit productie deployments.
            </p>
            <p className="mt-2 text-xs text-slate-500">Geen spam. Uitschrijven kan altijd. Alleen relevante content.</p>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    E-mailadres
                  </label>
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <Mail className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </div>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jouw@bedrijf.nl"
                    disabled={status === "loading"}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-100 disabled:opacity-60"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Aanmelden...</span>
                    </>
                  ) : (
                    <span>Aanmelden</span>
                  )}
                </button>
              </div>

              {/* Status message */}
              {status === "error" && (
                <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{message}</span>
                </div>
              )}

              {/* Trust indicators */}
              <p className="text-xs leading-relaxed text-slate-500">
                Door je aan te melden ga je akkoord met ons{" "}
                <a href="/privacy" className="underline underline-offset-2 transition-colors hover:text-slate-700">
                  privacybeleid
                </a>
                . Je e-mail wordt alleen gebruikt om deze updates te sturen en nooit gedeeld.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
