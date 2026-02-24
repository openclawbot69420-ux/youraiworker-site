import type { Metadata } from "next"

import { Builder } from "./Builder"

export const metadata: Metadata = {
  title: "Prijzen",
  description: "Kies een package en add-ons voor AI-agents. Builder-first overzicht met intakeflow.",
  alternates: {
    canonical: "https://youraiworker.nl/pricing",
  },
  openGraph: {
    title: "Prijzen voor AI-agents | Your AI Worker",
    description: "Builder-first pricing met Starter, Groei en add-ons voor implementatie en provisioning.",
    url: "https://youraiworker.nl/pricing",
    images: [
      {
        url: "/og.png",
        alt: "Your AI Worker prijzen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prijzen AI-agents | Your AI Worker",
    description: "Stel package en add-ons samen en start direct een intake.",
    images: ["/og.png"],
  },
}

const PricingPage = () => {
  return (
    <>
      <Builder />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Wat zit er wel en niet in
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Zo houden we scope, planning en verwachtingen voorspelbaar tijdens intake en uitvoering.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Inbegrepen</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                {[
                  "Scopebepaling en acceptatiecriteria voor de gekozen workflow(s)",
                  "Implementatie van de afgesproken AI-agent(s) binnen package en add-ons",
                  "Configuratie van geselecteerde integraties en basis foutafhandeling",
                  "Testen met realistische cases en oplevering met handover",
                  "Break-fix support volgens het gekozen package",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-emerald-200/70 bg-white px-4 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Niet inbegrepen</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                {[
                  "24/7 SLA of incident response buiten standaard support (wel mogelijk op aanvraag)",
                  "Custom app development buiten de afgesproken agent-workflows",
                  "Hardwarekosten, devices of interne IT-aankopen",
                  "Licentie- en usagekosten van externe tools, providers of AI-modellen",
                  "Doorlopende optimalisatie zonder aparte vervolgafspraak of retainer",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600"
                    >
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PricingPage
