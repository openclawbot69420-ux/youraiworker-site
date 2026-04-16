import type { Metadata } from "next"
import React from "react"
import { FileQuestion, ArrowLeft, Home, Calendar, Tag } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pagina niet gevonden | Your AI Worker",
  description: "Deze pagina bestaat niet. Bekijk onze populaire pagina's of neem contact op.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Pagina niet gevonden | Your AI Worker",
    description: "Deze pagina bestaat niet. Bekijk onze populaire pagina's of neem contact op.",
    images: ["/og-home.png"],
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pagina niet gevonden | Your AI Worker",
    description: "Deze pagina bestaat niet. Bekijk onze populaire pagina's of neem contact op.",
    images: ["/og-home.png"],
  },
}

const POPULAR_PAGES = [
  { href: "/pricing", label: "Prijzen en pakketten", description: "Vanaf €1.000" },
  { href: "/use-cases", label: "Use cases", description: "Toepassingen" },
  { href: "/implementatie", label: "Implementatie", description: "Hoe het werkt" },
  { href: "/integrations", label: "Integraties", description: "Koppelingen" },
  { href: "/faq", label: "FAQ", description: "Veelgestelde vragen" },
  { href: "/security", label: "Security", description: "Beveiliging" },
] as const

export default function NotFound(): React.ReactNode {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:py-24" aria-labelledby="not-found-title">
      <div className="text-center">
        {/* Icon with subtle animation */}
        <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 sm:h-24 sm:w-24">
          <FileQuestion className="h-10 w-10 text-slate-400 sm:h-12 sm:w-12" aria-hidden="true" />
        </div>

        <h1 id="not-found-title" className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Pagina niet gevonden
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base text-slate-600">
          De link die je hebt geopend bestaat niet (meer) op Your AI Worker.
        </p>
        <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
          Controleer de URL, bekijk onze populaire pagina's of plan direct een intake.
        </p>

        {/* Quick actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 sm:w-auto"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Terug naar home
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 sm:w-auto"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Plan een intake
          </Link>
          <Link
            href="/pricing"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 sm:w-auto"
          >
            <Tag className="h-4 w-4" aria-hidden="true" />
            Bekijk prijzen
          </Link>
        </div>
      </div>

      {/* Popular pages grid */}
      <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
          Populaire pagina's
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-all hover:border-slate-300 hover:shadow-sm"
            >
              <div>
                <p className="font-medium text-slate-900 group-hover:text-slate-700">
                  {page.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{page.description}</p>
              </div>
              <ArrowLeft className="h-4 w-4 -rotate-180 text-slate-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>

      {/* Trust indicators */}
      <div className="mt-8 flex flex-col items-center justify-center gap-2 text-xs text-slate-500 sm:flex-row sm:gap-4">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          KvK: 95290475
        </span>
        <span className="hidden text-slate-300 sm:inline">|</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          BTW: NL8677.15.849.B01
        </span>
        <span className="hidden text-slate-300 sm:inline">|</span>
        <span>Amsterdam</span>
      </div>

      {/* Contact hint */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Vragen? Mail ons op{" "}
        <a
          href="mailto:info@youraiworker.nl"
          className="font-medium text-slate-700 underline underline-offset-2 hover:text-slate-900"
        >
          info@youraiworker.nl
        </a>{" "}
        of bekijk de{" "}
        <Link
          href="/sitemap"
          className="font-medium text-slate-700 underline underline-offset-2 hover:text-slate-900"
        >
          sitemap
        </Link>
        .
      </p>

      {/* Error code for tech-savvy users */}
      <p className="mt-8 text-center text-xs text-slate-400">
        Error code: <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600">404</code>
      </p>
    </section>
  )
}
