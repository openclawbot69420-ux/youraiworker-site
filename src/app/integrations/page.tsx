import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Agent Integrations",
  description: "Je OpenClaw AI agent koppelt met de tools die je al gebruikt.",
}

const integrations = [
  { name: "Gmail", badge: "GM" },
  { name: "Google Calendar", badge: "GC" },
  { name: "Google Drive", badge: "GD" },
  { name: "WhatsApp", badge: "WA" },
  { name: "Telegram", badge: "TG" },
  { name: "Slack", badge: "SL" },
  { name: "HubSpot", badge: "HS" },
  { name: "Salesforce", badge: "SF" },
  { name: "Jira", badge: "JR" },
  { name: "Zendesk", badge: "ZD" },
  { name: "Zapier", badge: "ZP" },
  { name: "Make", badge: "MK" },
  { name: "n8n", badge: "N8" },
  { name: "Google Sheets", badge: "GS" },
]

const IntegrationsPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">AI Agent Integrations</h1>
        <p className="mt-4 text-slate-600">
          Je OpenClaw AI agent koppelt met de tools die je al gebruikt.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-xs font-semibold text-white">
                {integration.badge}
              </span>
              <h2 className="font-semibold">{integration.name}</h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Koppeling beschikbaar of in te richten afhankelijk van jouw workflow.
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-slate-600">
        Mis je een tool? OpenClaw koppelt met 10.000+ apps. Neem contact op en we bespreken de
        mogelijkheden.
      </p>

      <div className="mt-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-12 text-white sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight">Klaar om te automatiseren?</h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Kies een package en vertel ons wat je wil automatiseren. Wij regelen de rest.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/pricing"
            className="rounded-lg bg-white px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Bekijk packages
          </a>
          <a
            href="/contact"
            className="rounded-lg border border-white/30 px-6 py-3 text-center text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            Plan intake
          </a>
        </div>
      </div>
    </section>
  )
}

export default IntegrationsPage
