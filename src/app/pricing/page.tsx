import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prijzen",
  description: "Transparante pricing voor AI-agent setup. Start vanaf €1.000.",
}

const PricingPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Prijzen</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        Transparant en voorspelbaar. Eén vast startpakket, modulair uitbreidbaar.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Starter */}
        <div className="rounded-2xl border-2 border-slate-900 p-8">
          <p className="text-sm font-medium text-slate-500">Starter</p>
          <p className="mt-2 text-4xl font-bold">€1.000</p>
          <p className="mt-1 text-sm text-slate-500">eenmalig - 1 agent</p>
          <ul className="mt-8 space-y-3 text-sm text-slate-700">
            {[
              "1 production-ready AI-agent (1 workflow)",
              "Intake + scopebepaling",
              "Implementatie + 1-2 integraties",
              "Documentatie + beheerinstructies",
              "30 minuten handover/training",
              "48 uur warranty na livegang",
              "2 weken break-fix support (business hours)",
              "Dagelijkse backups",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="/contact"
            className="mt-8 block rounded-lg bg-slate-900 px-6 py-3 text-center text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Plan intake
          </a>
        </div>

        {/* Groei */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Groei</p>
          <p className="mt-2 text-4xl font-bold">€2.500</p>
          <p className="mt-1 text-sm text-slate-500">eenmalig - 3 agents</p>
          <ul className="mt-8 space-y-3 text-sm text-slate-700">
            {[
              "3 production-ready AI-agents (3 workflows)",
              "Scope + acceptatiecriteria per workflow",
              "Integraties waar het telt (2-5 total)",
              "UAT met echte cases + edge cases",
              "Handover + korte beheertraining",
              "48 uur warranty na livegang",
              "4 weken break-fix support (business hours)",
              "Dagelijkse backups",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="/contact"
            className="mt-8 block rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Vraag voorstel aan
          </a>
        </div>

        {/* Enterprise / Maatwerk */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <p className="text-sm font-medium text-slate-500">Maatwerk</p>
          <p className="mt-2 text-2xl font-bold">Op maat</p>
          <p className="mt-1 text-sm text-slate-500">complexe integraties of grotere uitrol</p>
          <ul className="mt-8 space-y-3 text-sm text-slate-700">
            {[
              "Extra agents (workflows)",
              "Complexe integraties (CRM/ERP/custom API)",
              "Knowledge base Q&A op grotere schaal",
              "SLA of 24/7 support",
              "Security hardening en governance",
              "Doorlopend onderhoud en optimalisatie",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="/contact"
            className="mt-8 block rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-white transition-colors"
          >
            Vraag offerte aan
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Veelgestelde vragen</h2>
        <div className="mt-8 space-y-6">
          {[
            [
              "Wat zit er precies in het basispakket?",
              "Eén AI-agent die één specifieke workflow automatiseert. Inclusief intake, implementatie, integraties, documentatie, handover en 2 weken support.",
            ],
            [
              "Hoe lang duurt de oplevering?",
              "Typisch enkele dagen tot 2 weken, afhankelijk van integraties en de beschikbaarheid van systemen.",
            ],
            [
              "Wat als er iets misgaat na livegang?",
              "Je hebt 48 uur volledige warranty en daarna 2 weken break-fix support tijdens kantooruren.",
            ],
            [
              "Kan ik later meer agents toevoegen?",
              "Ja, het systeem is modulair. Elke extra agent wordt apart gescoped en geprijsd.",
            ],
          ].map(([q, a]) => (
            <div key={q} className="border-b border-slate-200 pb-6">
              <h3 className="font-semibold">{q}</h3>
              <p className="mt-2 text-sm text-slate-600">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingPage
