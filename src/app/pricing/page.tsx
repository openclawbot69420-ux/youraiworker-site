import type { Metadata } from "next"

import { Builder } from "./Builder"

const PRICING_FAQ_ITEMS = [
  {
    question: "Wat is inbegrepen in het Starter package?",
    answer:
      "Starter is bedoeld voor één duidelijke workflow en bevat één production-ready AI-agent, intake en scopebepaling, implementatie met 1 tot 2 integraties, documentatie en handover.",
  },
  {
    question: "Zijn de prijzen op deze pagina definitief?",
    answer:
      "Nee. De prijzen zijn vanafprijzen. De definitieve prijs hangt af van scope, integraties, toegangen, testcases en gewenste foutafhandeling.",
  },
  {
    question: "Kan ik met één workflow starten en later uitbreiden?",
    answer:
      "Ja. Dat is de standaardaanpak. We starten met een afgebakende workflow, meten resultaat en schalen daarna gecontroleerd op.",
  },
  {
    question: "Zijn third-party kosten inbegrepen?",
    answer:
      "Nee. Eventuele kosten van providers, nummers, tools of platformgebruik van derden vallen buiten onze implementatieprijs en worden apart afgestemd.",
  },
] as const

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI-agent implementatie en automatisering",
  serviceType: "AI-agent implementatie",
  description:
    "Implementatie van production-ready AI-agents voor Nederlandse bedrijven, inclusief scope, integraties, beveiligingsbaseline en livegang.",
  provider: {
    "@type": "Organization",
    name: "Your AI Worker",
    url: "https://youraiworker.nl",
  },
  areaServed: {
    "@type": "Country",
    name: "Nederland",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "1000",
    url: "https://youraiworker.nl/pricing",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export const metadata: Metadata = {
  title: "Prijzen",
  description: "Kies een pakket en add-ons voor AI-agents. Duidelijk overzicht met intakeflow.",
  alternates: {
    canonical: "https://youraiworker.nl/pricing",
  },
  openGraph: {
    title: "Prijzen voor AI-agents | Your AI Worker",
    description: "Prijsoverzicht met Starter, Groei en add-ons voor implementatie en provisioning.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }} />

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

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Veelgestelde vragen over prijzen
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Praktische antwoorden over scope, vanafprijzen en de manier waarop we een intake
              gebruiken om tot een definitieve offerte te komen.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            {PRICING_FAQ_ITEMS.map((item) => (
              <details key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Plan een intake
            </a>
            <a
              href="/implementatie"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
            >
              Bekijk implementatie
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default PricingPage
