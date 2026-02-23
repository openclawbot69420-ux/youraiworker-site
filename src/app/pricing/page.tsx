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
        Transparant en voorspelbaar. Kies een package en voeg add-ons toe als je wil dat wij accounts,
        kanalen en integraties voor je regelen.
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

      {/* Add-ons */}
      <div className="mt-16">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Add-ons (vanaf prijzen)</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            Sommige onderdelen vereisen accounts, billing, verificaties of extra security. Je kunt dit
            zelf aanleveren (credentials/toegang), of wij regelen het als add-on.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[
              [
                "AI model + billing setup",
                "vanaf €250",
                "We zetten OpenAI/Anthropic keys, budget limits en basis guardrails netjes op.",
              ],
              [
                "Telegram setup (bot + routing)",
                "vanaf €250",
                "Bot, kanalen, notificaties en basis flows voor intake/support.",
              ],
              [
                "WhatsApp Business setup",
                "vanaf €750",
                "Provider setup, nummer/verificatie, templates en koppeling met je workflow.",
              ],
              [
                "CRM integratie (HubSpot/Salesforce)",
                "vanaf €750",
                "Field mapping, logging, dedup en workflow triggers.",
              ],
              [
                "Ticketing integratie (Jira/Zendesk)",
                "vanaf €500",
                "Triage, routing, tags, SLA/priority regels en status updates.",
              ],
              [
                "Security hardening (Tailscale + secrets)",
                "vanaf €500",
                "Toegang zonder open poorten, secrets management en basis audit logging.",
              ],
            ].map(([title, price, desc]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{price}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Vanaf prijzen zijn indicaties. Definitieve prijs hangt af van scope, toegang en complexiteit.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Veelgestelde vragen</h2>
        <div className="mt-8 space-y-6">
          {[
            [
              "Wat zit er precies in Starter?",
              "Eén AI-agent die één specifieke workflow automatiseert. Inclusief intake, implementatie, basis integraties, documentatie, handover en 2 weken support.",
            ],
            [
              "Hoe lang duurt de oplevering?",
              "Vaak binnen dagen live. Exacte doorlooptijd hangt af van integraties, toegang en hoe snel we testcases kunnen valideren.",
            ],
            [
              "Moet ik zelf accounts of API keys hebben?",
              "Je kunt credentials en toegang zelf aanleveren. Als je wil dat wij AI billing, WhatsApp/Telegram of CRM setup regelen, kies dan een add-on.",
            ],
            [
              "Wat als er iets misgaat na livegang?",
              "Je hebt 48 uur volledige warranty en daarna break-fix support tijdens kantooruren (Starter: 2 weken, Groei: 4 weken).",
            ],
            [
              "Kan ik later meer agents toevoegen?",
              "Ja. Je kunt opschalen via Groei, of we scopen per extra workflow een add-on.",
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
