import type { Metadata } from "next"
import { CheckCircle2, Lock, Server, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Implementatie",
  description:
    "OpenClaw implementatie voor bedrijven met client-owned hosting of managed hosting. Veilig ingericht, getest en overdraagbaar.",
  alternates: {
    canonical: "https://youraiworker.nl/implementatie",
  },
  openGraph: {
    title: "OpenClaw implementatie voor bedrijven | Your AI Worker",
    description:
      "Kies tussen client-owned hosting en managed hosting voor OpenClaw implementaties met duidelijke deliverables en security-aanpak.",
    url: "https://youraiworker.nl/implementatie",
    images: [
      {
        url: "/og.png",
        alt: "Your AI Worker implementatie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw implementatie | Your AI Worker",
    description:
      "Managed OpenClaw implementatie en hostingmodellen voor bedrijven, inclusief security, overdracht en support.",
    images: ["/og.png"],
  },
}

const hostingOptions = [
  {
    title: "Client-owned hosting",
    icon: Server,
    description:
      "Wij implementeren OpenClaw in jullie omgeving. Jullie behouden ownership over cloudaccount, data en runtime.",
    bullets: [
      "Deployment in jullie tenant of infrastructuur",
      "Least-privilege toegang voor setup en support",
      "Geschikt voor teams met eigen IT of security-eisen",
    ],
  },
  {
    title: "Managed hosting",
    icon: ShieldCheck,
    description:
      "Wij hosten en beheren de OpenClaw omgeving voor jullie. Snel live met minder interne belasting op infra en operations.",
    bullets: [
      "Wij beheren hosting, updates en monitoring",
      "Snellere implementatie voor teams zonder eigen platformcapaciteit",
      "Opschaalbaar met afgesproken beheer- en supportmodel",
    ],
  },
] as const

const requirements = [
  "Least privilege toegang tot relevante systemen of sandboxomgevingen",
  "Testcases of representatieve voorbeelden van de workflow die geautomatiseerd moet worden",
  "Een inhoudelijke owner die beslissingen neemt en feedback geeft",
  "Optioneel: akkoord op managed provisioning als je kiest voor managed hosting",
] as const

const deliverables = [
  "Werkende OpenClaw implementatie in test en productie-afspraak",
  "Geconfigureerde integraties met jullie tools en processen",
  "Security basisinrichting met secrets, logging en toegangsafspraken",
  "Testresultaten en acceptatiechecklist op afgesproken scenario's",
  "Documentatie voor beheer, overdracht en wijzigingen",
  "Go-live ondersteuning en nazorg volgens gekozen model",
] as const

const ImplementatiePage: React.FC = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">
            OpenClaw implementatie
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            OpenClaw implementatie voor bedrijven
          </h1>
          <p className="mt-4 text-slate-600">
            We implementeren OpenClaw als productieklare workflowlaag voor je team, inclusief
            hostingmodel, security-afspraken en overdracht. Bekijk eerst onze{" "}
            <a className="font-medium text-slate-900 underline" href="/pricing">
              packages op de pricing pagina
            </a>{" "}
            of controleer welke tools we ondersteunen op de{" "}
            <a className="font-medium text-slate-900 underline" href="/integrations">
              integraties pagina
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Hostingmodellen
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Kies het model dat past bij jullie IT-team, compliance-eisen en gewenste snelheid.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {hostingOptions.map((option) => (
            <article
              key={option.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                  <option.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{option.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {option.description}
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-3">
                {option.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-900" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Wat we nodig hebben van jou
          </h2>
          <ul className="mt-5 space-y-4">
            {requirements.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-900" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Wat je ontvangt</h2>
          <ul className="mt-5 space-y-4">
            {deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-900" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Security note</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
              We werken met least privilege toegang, afgesproken logging en duidelijke
              verantwoordelijkheden per hostingmodel. Lees meer op onze{" "}
              <a className="font-medium text-slate-900 underline" href="/security">
                beveiligingspagina
              </a>
              .
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Bespreek implementatie
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
              >
                Bekijk pricing
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ImplementatiePage
