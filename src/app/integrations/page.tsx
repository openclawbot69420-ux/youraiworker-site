import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"
import {
  Building2,
  CalendarDays,
  ClipboardList,
  Cloud,
  Folder,
  GitBranch,
  LifeBuoy,
  Mail,
  MessageCircle,
  MessageSquare,
  Send,
  Sparkles,
  Table,
  Workflow,
} from "lucide-react"

export const metadata: Metadata = {
  title: "AI Agent Integrations",
  description: "Je OpenClaw AI agent koppelt met de tools die je al gebruikt.",
}

const integrations = [
  { name: "Gmail", badge: "GM", icon: Mail },
  { name: "Google Calendar", badge: "GC", icon: CalendarDays },
  { name: "Google Drive", badge: "GD", icon: Folder },
  { name: "WhatsApp", badge: "WA", icon: MessageCircle },
  { name: "Telegram", badge: "TG", icon: Send },
  { name: "Slack", badge: "SL", icon: MessageSquare },
  { name: "HubSpot", badge: "HS", icon: Building2 },
  { name: "Salesforce", badge: "SF", icon: Cloud },
  { name: "Jira", badge: "JR", icon: ClipboardList },
  { name: "Zendesk", badge: "ZD", icon: LifeBuoy },
  { name: "Zapier", badge: "ZP", icon: Workflow },
  { name: "Make", badge: "MK", icon: Sparkles },
  { name: "n8n", badge: "N8", icon: GitBranch },
  { name: "Google Sheets", badge: "GS", icon: Table },
] satisfies Array<{
  name: string
  badge: string
  icon: LucideIcon
}>

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
            className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-100 text-slate-700 shadow-sm">
                <integration.icon className="h-5 w-5" aria-hidden="true" />
                <span className="absolute -bottom-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-md border border-slate-200 bg-slate-900 px-1 text-[10px] font-semibold leading-4 text-white">
                  {integration.badge}
                </span>
              </div>
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
