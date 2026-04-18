import type { Metadata } from "next"
import { Check, Building2, Sparkles, Calendar, Mail } from "lucide-react"
import { PrintButton } from "../../components/PrintButton"

export const metadata: Metadata = {
  title: "Bedrijfsprofiel | Your AI Worker - Downloadbaar overzicht",
  description: "Download het bedrijfsprofiel van Your AI Worker. Productierijpe AI-agents voor Nederlandse bedrijven. KvK 95290475.",
  alternates: { canonical: "https://youraiworker.nl/company-profile" },
  openGraph: {
    title: "Your AI Worker - Bedrijfsprofiel",
    description: "Productierijpe AI-agents voor Nederlandse bedrijven.",
    url: "https://youraiworker.nl/company-profile",
    images: [{ url: "/og-home.png" }],
  },
}

const FACTS = [
  { label: "Bedrijfsnaam", value: "Your AI Worker" },
  { label: "KvK", value: "95290475" },
  { label: "BTW", value: "NL8677.15.849.B01" },
  { label: "Locatie", value: "Amsterdam" },
  { label: "E-mail", value: "info@youraiworker.nl" },
]

const WHY = [
  "Eenmalige setup, geen maandelijkse kosten",
  "48-uurs garantie + 2 weken break-fix",
  "Nederlands bedrijf, KvK-geregistreerd",
  "Security-first: least privilege, audit trail",
]

const STEPS = [
  { n: "1", t: "Intake", d: "Scope bepalen", time: "20 min" },
  { n: "2", t: "Offerte", d: "Heldere planning", time: "1-2 dagen" },
  { n: "3", t: "Build", d: "Bouwen en testen", time: "3-10 dagen" },
  { n: "4", t: "Live", d: "Garantie + support", time: "48u" },
]

const INTEGRATIONS = ["Gmail", "Calendar", "WhatsApp", "Telegram", "Slack", "HubSpot", "Salesforce", "Zapier"]

export default function Page(): React.ReactNode {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50/70 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                <Building2 className="h-3.5 w-3.5" />
                <span>Zakelijk overzicht</span>
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Bedrijfsprofiel</h1>
              <p className="mt-2 text-slate-600">Print of deel dit overzicht met je team.</p>
            </div>
            <PrintButton />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <section>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white sm:p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <Sparkles className="h-6 w-6 text-cyan-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Your AI Worker</h2>
                <p className="mt-2 max-w-2xl text-white/80">
                  Productierijpe AI-agents voor Nederlandse bedrijven. Workflows met eigenaar, logging en support.
                </p>
                <p className="mt-4 text-xs text-white/60">KvK 95290475 - Amsterdam</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Bedrijfsgegevens</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.label} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <p className="text-xs font-medium uppercase text-slate-500">{f.label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{f.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Waarom wij</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {WHY.map((w) => (
              <div key={w} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm text-slate-700">{w}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Hoe we werken</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-900">{s.n}</span>
                  <h4 className="font-semibold text-slate-900">{s.t}</h4>
                </div>
                <p className="mt-1 text-xs text-slate-500">{s.time}</p>
                <p className="mt-2 text-sm text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Integraties</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {INTEGRATIONS.map((i) => (
              <span key={i} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700">{i}</span>
            ))}
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-500">+ meer</span>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Pricing</h3>
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-6">
            <div className="flex items-baseline justify-between">
              <p className="text-slate-900">Starter implementatie</p>
              <p className="text-2xl font-bold text-emerald-800">EUR 1.000</p>
            </div>
            <p className="mt-1 text-sm text-slate-600">Eenmalig, excl. btw. Geen maandelijkse kosten.</p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
          <h3 className="text-lg font-semibold">Klaar om te starten?</h3>
          <p className="mt-2 text-white/70">Plan een intake van 20 minuten. Geen verplichtingen.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100">
              <Calendar className="h-4 w-4" />
              Plan een intake
            </a>
            <a href="mailto:info@youraiworker.nl" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              <Mail className="h-4 w-4" />
              info@youraiworker.nl
            </a>
          </div>
          <p className="mt-4 text-xs text-white/50">KvK 95290475 - Amsterdam, Nederland</p>
        </section>
      </div>
    </main>
  );
}