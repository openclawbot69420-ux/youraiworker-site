import type { Metadata } from "next"
import { ShieldCheck, Clock, LifeBuoy, AlertCircle, Mail } from "lucide-react"
import { buildBreadcrumbJsonLd } from "../jsonld"

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Garantie", url: "https://youraiworker.nl/garantie" },
])

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export const metadata: Metadata = {
  title: "48-uurs Garantie | Wat dekt onze garantie | Your AI Worker",
  description: "Transparante garantievoorwaarden voor AI-agent implementaties. Wat wel en niet gedekt is, hoe je een claim indient en onze toewijding aan kwaliteit.",
  alternates: {
    canonical: "https://youraiworker.nl/garantie",
  },
  openGraph: {
    title: "48-uurs Garantie op AI-agent implementatie | Your AI Worker",
    description: "Garantievoorwaarden,, claimproces en wat je mag verwachten van je implementatie.",
    url: "https://youraiworker.nl/garantie",
    images: [{
      url: "https://youraiworker.nl/garantie/opengraph-image",
      width: 1200,
      height: 630,
      alt: "48-uurs Garantie op AI-agent implementatie - Transparante voorwaarden",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "48-uurs Garantie op AI-agent implementatie | Your AI Worker",
    description: "Transparante garantie voor voor je AI-agent implementatie.",
    images: ["https://youraiworker.nl/garantie/opengraph-image"],
  },
}

const WARRANTY_COVERED = [
  {
    title: "Bugs binnen scope",
    desc: "Fouten in de geimplementeerde agent die niet conform de afgesproken acceptatiecriteria werken.",
  },
  {
    title: "Regressies",
    desc: "Functionaliteit die na livegang plotseling stopt met werken zonder dat er iets is gewijzigd aan configuratie of data.",
  },
  {
    title: "Integratiefouten",
    desc: "Problemen met afgesproken integraties die direct door onze implementatie veroorzaakt worden.",
  },
]

const WARRANTY_NOT_COVERED = [
  {
    title: "Wijzigingen bij derden",
    desc: "API-wijzigingen, autenticatieproblemen of downtime bij externe tools (Gmail, WhatsApp, CRM-leveranciers).",
  },
  {
    title: "Scope uitbreiding",
    desc: "Wensen voor nieuwe features, extra workflows of ander gedrag dan oorspronkelijk afgesproken.",
  },
  {
    title: "Data-/configuratieproblemen",
    desc: "Problemen door gewijzigde data in je bronnen of aangepaste configuratie na handover.",
  },
]

const WARRANTY_PROCESS = [
  {
    step: "1",
    title: "Meld binnen 48 uur",
    desc: "Stuur een mail met probleembeschrijving en voorbeelden binnen 48 uur na livegang of detectie.",
  },
  {
    step: "2",
    title: "We beoordelen snel",
    desc: "Binnen 1 werkdag reactie: garantie-claim of buiten scope (met duidelijke uitleg).",
  },
  {
    step: "3",
    title: "Oplossing of terugbetaling",
    desc: "Binnen scope: kosteloze fix. Indien niet oplosbaar: proportionele terugbetaling.",
  },
]

export default function GarantiePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>Transparante garantie</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            48-uurs Garantie op je implementatie
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            We bouwen zorgvuldig en leveren met confidence. Deze garantie dekt wat we maken zodat je risico minimaal is.
            Geen kleine lettertjes - gewoon duidelijke afspraken.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { icon: Clock, label: "48 uur claimperiode" },
            { icon: LifeBuoy, label: "Reactie binnen 1 werkdag" },
            { icon: ShieldCheck, label: "KvK-geregistreerd (95290475)" },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm">
              <Icon className="h-4 w-4 text-slate-500" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-700">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Wat is gedekt</h2>
            </div>
            <ul className="mt-5 space-y-4">
              {WARRANTY_COVERED.map(({ title, desc }) => (
                <li key={title} className="flex gap-3 rounded-xl border border-emerald-200/70 bg-white px-4 py-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">{title}</p>
                    <p className="text-sm text-slate-600">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">
                <AlertCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Niet gedekt</h2>
            </div>
            <ul className="mt-5 space-y-4">
              {WARRANTY_NOT_COVERED.map(({ title, desc }) => (
                <li key={title} className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">{title}</p>
                    <p className="text-sm text-slate-600">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Hoe claimen werkt</h2>
          <p className="mt-2 text-sm text-slate-600">Drie stappen. Geen langdradig proces of formulieren die nergens heen leiden.</p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {WARRANTY_PROCESS.map(({ step, title, desc }) => (
              <li key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <span className="inline-flex h-7 w-7                items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-900">
                  {step}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 sm:p-8 text-white">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Garantie claimen?</h2>
              <p className="mt-2 text-sm text-white/70">
                Stuur een mail naar{" "}
                <a href="mailto:info@youraiworker.nl" className="underline underline-offset-2 hover:text-white">
                  info@youraiworker.nl
                </a>{" "}
                met jouw specifieke situatie.
              </p>
            </div>
            <a
              href="mailto:info@youraiworker.nl?subject=Garantie%20claim%20-%20[projectnaam]"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Claim indienen
            </a>
          </div>
      </div>
      </div>
    </>
  )
}
