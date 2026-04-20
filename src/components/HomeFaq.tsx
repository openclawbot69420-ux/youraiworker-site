"use client"

import { useState, useCallback } from "react"
import { FaqJsonLd } from "./FaqJsonLd"
import { Link2, Check } from "lucide-react"

type FaqItem = {
  question: string
  answer: string
  slug: string
}

const FAQ_ITEMS: ReadonlyArray<FaqItem> = [
  {
    slug: "wat-leveren-jullie",
    question: "Wat leveren jullie precies op?",
    answer: "Je krijgt een production-ready AI-agent voor een afgebakende workflow, inclusief scope, acceptatiecriteria, integraties, testcases, handover en support binnen de afgesproken periode.",
  },
  {
    slug: "hoe-snel-live",
    question: "Hoe snel kunnen we live?",
    answer: "Meestal binnen 3-10 werkdagen. Je krijgt reactie binnen 1 werkdag en na intake een concrete planning.",
  },
  {
    slug: "verschil-va-zelf-bouwen",
    question: "Wat is het verschil met een VA of zelf bouwen?",
    answer: "Wij leveren een afgebakende workflow die productie draait, inclusief security baseline, logging, foutafhandeling en duidelijke overdracht. Een VA is vooral capaciteit. Zelf bouwen kan, maar kost vaak weken tot maanden aan ontwikkeling en beheer.",
  },
  {
    slug: "maandelijkse-kosten",
    question: "Zijn er maandelijkse kosten?",
    answer: "Onze implementatie is eenmalig. Wel kunnen er kosten zijn voor tools, nummers, licenties of model-usage van derde partijen. Die stemmen we vooraf af.",
  },
  {
    slug: "support-na-oplevering",
    question: "Hoe ziet support eruit na oplevering?",
    answer: "Standaard: 48-uurs garantie (bugs en regressies) en 2 weken break-fix tijdens business hours. Daarna kun je kiezen voor support op aanvraag.",
  },
  {
    slug: "toegang-systemen",
    question: "Moeten jullie toegang hebben tot al onze systemen?",
    answer: "Nee. We werken met least privilege: alleen toegang tot wat nodig is voor de workflow. Remote access via Tailscale, zodat je geen poorten hoeft open te zetten.",
  },
  {
    slug: "privacy-data",
    question: "Hoe zit het met privacy en data?",
    answer: "We gebruiken een minimale set aan rechten, loggen acties waar nodig en richten approvals in voor kritieke stappen. In de intake stemmen we af welke data de agent mag zien, wat er opgeslagen wordt, en welke retention past bij je proces.",
  },
  {
    slug: "wat-hebben-jullie-nodig",
    question: "Wat hebben wij nodig van jullie kant?",
    answer: "Een aanspreekpunt voor goedkeuringen tijdens de build, toegang tot de systemen die gekoppeld moeten worden (least privilege) en realistische testcases. Je hoeft geen technisch persoon te leveren - wij draaien de implementatie.",
  },
] as const

const LAST_UPDATED = new Date(process.env.NEXT_PUBLIC_BUILD_DATE || Date.now())
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

// Hook for copy-to-clipboard with feedback
const useCopyLink = () => {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const copyLink = useCallback((slug: string) => {
    const url = new URL(window.location.href)
    url.hash = `#faq-${slug}`
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopiedSlug(slug)
      setTimeout(() => setCopiedSlug(null), 2000)
    }).catch(() => {
      // Silently fail if clipboard API is unavailable
    })
  }, [])

  return { copiedSlug, copyLink }
}

export const HomeFaq = () => {
  const { copiedSlug, copyLink } = useCopyLink()

  return (
    <section aria-labelledby="faq-title" className="border-b border-slate-200/70 bg-white">
      <FaqJsonLd items={[...FAQ_ITEMS]} />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">FAQ</p>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <p className="text-xs text-slate-400">
                Bijgewerkt:{" "}
                <time dateTime={LAST_UPDATED.toISOString()}>
                  {formatDate(LAST_UPDATED)}
                </time>
              </p>
          </div>
          <h2 id="faq-title" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Veelgestelde vragen
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Snelle antwoorden op de vragen die we het meest krijgen tijdens intake.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.slug}
              id={`faq-${item.slug}`}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/40 p-5 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-sm"
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </div>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
              {/* Copy link button */}
              <div className="mt-4 flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    copyLink(item.slug)
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                  aria-label={`Kopieer link naar: ${item.question}`}
                >
                  {copiedSlug === item.slug ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                      <span className="text-emerald-700">Gekopieerd</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Link kopiëren</span>
                    </>
                  )}
                </button>
              </div>
            </details>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="/contact" className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800">
            Plan een intake
          </a>
          <a href="/pricing" className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50">
            Bekijk prijzen
          </a>
        </div>
      </div>
    </section>
  )
}
