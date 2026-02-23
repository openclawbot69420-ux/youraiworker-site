import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"
import { Clipboard, Key, Ruler, ShieldCheck, Target, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Agent Guides",
  description: "Praktische guides om AI agents goed op te zetten en op te schalen.",
}

const guides = [
  {
    icon: Target,
    title: "Setting up your first AI agent",
    description: "Stap-voor-stap van use case kiezen tot go-live.",
  },
  {
    icon: Clipboard,
    title: "Choosing the right package",
    description: "Match je workflow en integraties aan het juiste package.",
  },
  {
    icon: Key,
    title: "Preparing for AI agent setup",
    description: "Checklist zodat de implementatie soepel verloopt.",
  },
  {
    icon: Ruler,
    title: "Measuring AI agent ROI",
    description: "Meet wat je bespaart en waar je winst pakt.",
  },
  {
    icon: ShieldCheck,
    title: "AI agent security checklist",
    description: "Best practices voor permissions, logging en data.",
  },
  {
    icon: Zap,
    title: "Automating lead follow-up",
    description: "Nooit meer leads verliezen door trage opvolging.",
  },
] satisfies Array<{
  icon: LucideIcon
  title: string
  description: string
}>

const GuidesPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">AI Agent Guides</h1>
        <p className="mt-4 text-slate-600">
          Praktische guides om AI agents goed op te zetten, te optimaliseren en op te schalen.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <div
            key={guide.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <guide.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-semibold">{guide.title}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{guide.description}</p>
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

export default GuidesPage
