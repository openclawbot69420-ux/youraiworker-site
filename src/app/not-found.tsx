import type { Metadata } from "next"
import type * as React from "react"
import { FileX, Home, MessageSquare, ArrowRight, LifeBuoy } from "lucide-react"
import BackButton from "../components/BackButton"

export const metadata: Metadata = {
  title: "Pagina niet gevonden | Your AI Worker",
  description: "De pagina die je zoekt bestaat niet. Ga terug naar home of plan een intake.",
  robots: { index: false, follow: true },
}

const SUGGESTED_PAGES = [
  { href: "/", label: "Home", description: "Terug naar de hoofdpagina" },
  { href: "/pricing", label: "Prijzen", description: "Bekijk tarieven en pakketten" },
  { href: "/use-cases", label: "Toepassingen", description: "Voorbeelden van AI-agents" },
  { href: "/contact", label: "Contact", description: "Plan een intakegesprek" },
] as const

export default function NotFoundPage(): React.ReactElement {
  return (
    <main className="min-h-[70vh] bg-slate-50/50 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="text-center">
            {/* Icon */}
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
              <FileX className="h-8 w-8 text-slate-400" aria-hidden="true" />
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Pagina niet gevonden
            </h1>
            <p className="mt-3 text-base text-slate-600">
              De pagina die je zoekt bestaat niet (meer).
              Misschien is deze verplaatst of is er een fout in de URL.
            </p>

            {/* Error code */}
            <p className="mt-4 text-xs font-medium text-slate-400">Error code: 404</p>
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>Terug naar home</span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>Plan een intake</span>
            </a>
          </div>

          {/* Suggested pages */}
          <div className="mt-12 border-t border-slate-200 pt-10">
            <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
              Wellicht bedoelde je een van deze pagina's
            </h2>
            <nav aria-label="Voorgestelde pagina's" className="mt-6 grid gap-3 sm:grid-cols-2">
              {SUGGESTED_PAGES.map(({ href, label, description }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-slate-300 hover:bg-white hover:shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700">
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{label}</p>
                    <p className="text-xs text-slate-500">{description}</p>
                  </div>
                </a>
              ))}
            </nav>
          </div>

          {/* Support hint */}
            <div className="mt-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white">
                <LifeBuoy className="h-5 w-5 text-slate-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Nog steeds niet gevonden?</p>
                <p className="mt-1 text-sm text-slate-600">
                  Mail ons op{" "}
                  <a
                    href="mailto:info@youraiworker.nl"
                    className="font-medium text-slate-900 underline underline-offset-2 transition-colors hover:text-slate-700"
                  >
                    info@youraiworker.nl
                  </a>{" "}
                  of plan een intake. We helpen je graag verder.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back navigation */}
        <div className="mt-6 text-center">
          <BackButton />
        </div>
      </div>
    </main>
  )
}
