import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCheck,
  FileText,
  Handshake,
  Inbox,
  MessageSquare,
  Receipt,
  RefreshCw,
  UserCheck,
  Wrench,
} from "lucide-react"

export const metadata: Metadata = {
  title: "AI Agent Use Cases",
  description:
    "Zie wat een OpenClaw AI agent kan automatiseren in je dagelijkse workflow.",
}

const useCases = [
  {
    icon: Inbox,
    title: "Email management",
    description:
      "Triage van je inbox, concept-antwoorden, opvolging en prioritering - zodat je team alleen nog hoeft te reviewen.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp support",
    description:
      "24/7 eerste lijn support: vragen beantwoorden, status updates geven en complexe cases doorzetten naar een medewerker.",
  },
  {
    icon: UserCheck,
    title: "Lead qualification",
    description:
      "Kwalificeer leads automatisch via chat of e-mail, verzamel context en zet alleen de juiste prospects door naar sales.",
  },
  {
    icon: CalendarDays,
    title: "Meeting scheduling",
    description:
      "Stop met heen-en-weer mailen. Plan afspraken op basis van beschikbaarheid, agenda regels en bevestigingen.",
  },
  {
    icon: Receipt,
    title: "Invoice tracking en payment reminders",
    description:
      "Track facturen, detecteer achterstanden en verstuur professionele herinneringen met oplopende toon - volledig automatisch.",
  },
  {
    icon: Wrench,
    title: "Internal helpdesk (IT/HR)",
    description:
      "Routeer interne requests, verzamel ontbrekende info en zet tickets klaar met de juiste prioriteit en categorie.",
  },
  {
    icon: Handshake,
    title: "Customer onboarding",
    description:
      "Nieuwe klanten sneller live: intake, documentatie, checklists en activatie-stappen geautomatiseerd en traceerbaar.",
  },
  {
    icon: BookOpen,
    title: "Knowledge base Q&A",
    description:
      "Een agent die vragen beantwoordt door je interne documenten te doorzoeken - met bronverwijzingen en rollen/rechten.",
  },
  {
    icon: BarChart3,
    title: "Automated report generation",
    description:
      "Genereer wekelijkse management updates, dashboards en stakeholder reports op basis van data uit je tools.",
  },
  {
    icon: RefreshCw,
    title: "CRM data sync",
    description:
      "Log e-mails, meetings en deal updates automatisch in je CRM - zonder handmatige data entry.",
  },
  {
    icon: FileText,
    title: "Document drafting",
    description:
      "Concepten voor voorstellen, rapporten en e-mails op basis van templates en input uit je systemen - altijd met review.",
  },
  {
    icon: CheckCheck,
    title: "Approval workflow automation",
    description:
      "Laat aanvragen automatisch langs de juiste beslissers gaan, met context, deadlines en audit trail.",
  },
] satisfies Array<{
  icon: LucideIcon
  title: string
  description: string
}>

const UseCasesPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">AI Agent Use Cases</h1>
        <p className="mt-4 text-slate-600">
          Zie wat een OpenClaw AI agent kan automatiseren in je dagelijkse workflow.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {useCases.map((useCase) => (
          <div
            key={useCase.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <useCase.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-semibold">{useCase.title}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{useCase.description}</p>
          </div>
        ))}
      </div>

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

export default UseCasesPage
