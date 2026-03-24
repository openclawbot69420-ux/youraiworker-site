import type { Metadata } from "next"

import { Builder } from "./Builder"
import { buildBreadcrumbJsonLd } from "../jsonld"

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Prijzen", url: "https://youraiworker.nl/pricing" },
])

const PRICING_FAQ_ITEMS = [
  {
    question: "Wat zit er precies in het Starter pakket?",
    answer:
      "Starter is bedoeld voor één afgebakende workflow en bevat intake, scope en acceptatiecriteria, implementatie van één productierijpe AI-agent, 1 tot 2 integraties, testen met cases, documentatie en handover.",
  },
  {
    question: "Zijn de prijzen op deze pagina definitief?",
    answer:
      "Nee. Dit zijn vanafprijzen. De definitieve prijs hangt af van scope, integraties, toegangen, uitzonderingen, testcases en gewenste foutafhandeling.",
  },
  {
    question: "Kan ik klein starten en later uitbreiden?",
    answer:
      "Ja. Dat is de standaardaanpak. We starten met een afgebakende workflow, meten resultaat en schalen daarna gecontroleerd op.",
  },
  {
    question: "Zijn third-party kosten inbegrepen?",
    answer:
      "Nee. Kosten van providers, nummers, licenties, tools of model-usage van derden vallen buiten onze implementatieprijs en worden apart afgestemd.",
  },
  {
    question: "Is €1.000 inclusief of exclusief btw?",
    answer: "Exclusief btw. Op de pagina staat steeds (excl. btw).",
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

const PRICING_JSON_LD_ID = "pricing-jsonld"

export const metadata: Metadata = {
  title: "Prijzen",
  description: "Duidelijke pakketten en vanafprijzen voor done-for-you AI-agent implementatie met intake als volgende stap.",
  alternates: {
    canonical: "https://youraiworker.nl/pricing",
  },
  openGraph: {
    title: "Prijzen voor AI-agents | Your AI Worker",
    description: "Heldere pakketten, scopegrenzen en intakeflow voor done-for-you AI-agent implementatie.",
    url: "https://youraiworker.nl/pricing",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Your AI Worker prijzen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prijzen AI-agents | Your AI Worker",
    description: "Kies pakket en add-ons, zie wat wel/niet inbegrepen is en start intake.",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Your AI Worker prijzen",
      },
    ],
  },
}

const PricingPage = () => {
  return (
    <>
      <script
        id={PRICING_JSON_LD_ID}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd([serviceSchema, faqSchema, breadcrumbJsonLd]) }}
      />

      <Builder />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Zo houden we pricing voorspelbaar
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                De pagina geeft je een realistisch startpunt. Tijdens intake zetten we dit om naar een
                concrete scope met duidelijke grenzen zodat uitvoering en oplevering beheersbaar blijven.
              </p>
            </div>

            <ol className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Intake & scope",
                  text: "We bepalen workflow, uitzonderingen, integraties en acceptatiecriteria.",
                },
                {
                  title: "Offerte & planning",
                  text: "Je krijgt een definitieve prijs en planning op basis van bevestigde scope.",
                },
                {
                  title: "Implementatie & handover",
                  text: "We bouwen, testen en leveren op met documentatie en afgesproken support.",
                },
              ].map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-shadow duration-200 hover:shadow-sm motion-reduce:transition-none"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-900">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Vertrouwen zonder grote claims</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700">
              {[
                "We verkopen implementatiepakketten, geen onbegrensde maatwerkbelofte.",
                "We benoemen expliciet wat buiten scope valt voordat we starten.",
                "Third-party licenties en usagekosten staan los van onze implementatieprijs.",
                "Je kunt klein beginnen met één workflow en later uitbreiden.",
              ].map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700"
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Wat is inbegrepen en wat niet
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Dit overzicht voorkomt misverstanden tijdens intake en houdt planning, scope en verwachtingen
              voorspelbaar.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Inbegrepen</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                {[
                  "Scope en acceptatiecriteria voor de afgesproken workflow(s)",
                  "Implementatie van de afgesproken AI-agent(s) binnen pakket + gekozen add-ons",
                  "Configuratie van geselecteerde integraties en basis foutafhandeling",
                  "Testen met realistische cases en oplevering met handover",
                  "Break-fix support volgens het gekozen pakket",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-emerald-200/70 bg-white px-4 py-3 transition-shadow duration-200 hover:shadow-sm motion-reduce:transition-none"
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
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-shadow duration-200 hover:shadow-sm motion-reduce:transition-none"
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

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Veelgestelde vragen over prijzen
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Praktische antwoorden over scope, vanafprijzen en hoe de intake leidt tot een definitieve
              offerte.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            {PRICING_FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition-colors duration-200 open:bg-white motion-reduce:transition-none"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none motion-reduce:transform-none"
                  >
                    ˅
                  </span>
                </summary>

                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr] motion-reduce:transition-none">
                  <div className="overflow-hidden">
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Volgende stap</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Selecteer bovenaan je pakket en eventuele add-ons en start daarna de intake. We gebruiken je
              selectie als startpunt, niet als definitieve bestelling.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 motion-reduce:transition-none"
              >
                Plan een intake
              </a>
              <a
                href="/implementatie"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors duration-200 hover:bg-slate-50 motion-reduce:transition-none"
              >
                Bekijk implementatie-aanpak
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PricingPage
