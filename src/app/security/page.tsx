import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"
import { Eye, KeyRound, Lock, Server, Shield, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Beveiliging",
  description: "Hoe wij omgaan met security, toegangsbeheer en data-bescherming.",
}

const securityItems = [
  {
    title: "Toegangsbeheer",
    description:
      "Least-privilege per integratie. Elke agent krijgt alleen toegang tot wat nodig is voor de specifieke workflow.",
    icon: Shield,
  },
  {
    title: "Versleutelde verbindingen",
    description:
      "Remote access via Tailscale: een identity-based mesh netwerk zonder open poorten op je systemen.",
    icon: Lock,
  },
  {
    title: "Secrets management",
    description:
      "Geen API-keys of wachtwoorden in code. Alles via encrypted secret stores met rotatie-ondersteuning.",
    icon: KeyRound,
  },
  {
    title: "Logging & traceability",
    description:
      "Elke actie van een agent wordt gelogd. Volledige audit trail voor compliance en troubleshooting.",
    icon: Eye,
  },
  {
    title: "Omgevingsscheiding",
    description:
      "Waar nodig scheiden we test- en productieomgevingen om risico's te minimaliseren.",
    icon: Server,
  },
  {
    title: "Backup setup inbegrepen",
    description:
      "Wij configureren automatische backups van configuratie en data als onderdeel van de setup.",
    icon: ShieldCheck,
  },
] satisfies Array<{
  title: string
  description: string
  icon: LucideIcon
}>

const SecurityPage: React.FC = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm">
            <Shield className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Beveiliging</h1>
          <p className="mt-4 text-slate-600">
            Security is geen add-on. We ontwerpen AI-workflows met controle op toegang, logging en
            data-bescherming vanaf dag één.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <div className="grid gap-4 md:grid-cols-2">
          {securityItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Vragen over security of toegangsbeheer?
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          We lichten graag toe hoe we permissions, logging en deployment voor jouw use case
          inrichten voordat er iets live gaat.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Neem contact op
        </a>
      </section>
    </main>
  )
}

export default SecurityPage
