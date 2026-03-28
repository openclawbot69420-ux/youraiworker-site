"use client"

import { useEffect } from "react"
import { AlertTriangle, Home, RefreshCw, MessageSquare, LifeBuoy } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service if available
    console.error("Application error:", error)
  }, [error])

  return (
    <main className="min-h-[70vh] bg-slate-50/50 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="text-center">
            {/* Icon */}
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50">
              <AlertTriangle className="h-8 w-8 text-amber-600" aria-hidden="true" />
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Er ging iets mis
            </h1>
            <p className="mt-3 text-base text-slate-600">
              We ondervonden een probleem bij het laden van deze pagina. Dit is een tijdelijk
              technisch issue - probeer het opnieuw.
            </p>

            {/* Error reference for support */}
            {error.digest && (
              <p className="mt-4 text-xs font-mono text-slate-400">
                Referentie: {error.digest}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              <span>Probeer opnieuw</span>
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>Terug naar home</span>
            </a>
          </div>

          {/* Support section */}
            <div className="mt-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white">
              <LifeBuoy className="h-5 w-5 text-slate-600" aria-hidden="true" />
              </div>
              <div>
              <p className="text-sm font-semibold text-slate-900">Blijft dit probleem aan?</p>
              <p className="mt-1 text-sm text-slate-600">
                Mail ons op{" "}
                <a
                href="mailto:info@youraiworker.nl"
                className="font-medium text-slate-900 underline underline-offset-2 transition-colors hover:text-slate-700"
                >
                info@youraiworker.nl
                </a>
                {" "}of{" "}
                <a
                href="/contact"
                className="font-medium text-slate-900 underline underline-offset-2 transition-colors hover:text-slate-700"
                >
                plan een intake
                </a>
                . Vermeld eventueel de referentiecode hierboven.
              </p>
              </div>
            </div>
            </div>

          {/* Quick links */}
          <div className="mt-8 border-t border-slate-200 pt-8">
            <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
              Wellicht relevant
            </h2>
            <nav className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { href: "/pricing", label: "Prijzen", desc: "Bekijk tarieven" },
                { href: "/use-cases", label: "Toepassingen", desc: "Voorbeelden" },
                { href: "/faq", label: "FAQ", desc: "Veelgestelde vragen" },
                { href: "/contact", label: "Contact", desc: "Direct contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 transition-all hover:border-slate-300 hover:bg-white hover:shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{link.label}</p>
                    <p className="text-xs text-slate-500">{link.desc}</p>
                  </div>
                  <span className="text-slate-400 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </main>
  )
}
