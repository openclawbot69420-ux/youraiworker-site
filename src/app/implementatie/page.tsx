import type { Metadata } from "next"
import { CheckCircle2, Lock, Server, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "OpenClaw implementatie voor bedrijven",
  description:
    "Managed OpenClaw setup voor businesses: hosting, integraties, security baseline, monitoring en overdracht. Production-ready workflows in 3-7 werkdagen.",
  alternates: {
    canonical: "https://youraiworker.nl/implementatie",
  },
  openGraph: {
    title: "OpenClaw implementatie voor bedrijven | Your AI Worker",
    description:
      "Wij hosten en implementeren OpenClaw voor je bedrijf. Kies client-owned hosting of managed hosting. Inclusief integraties, security baseline en overdracht.",
    url: "https://youraiworker.nl/implementatie",
    images: [
      {
        url: "/og.png",
        alt: "Your AI Worker - OpenClaw implementatie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw implementatie | Your AI Worker",
    description:
      "Managed OpenClaw implementatie voor bedrijven met duidelijke deliverables en security aanpak.",
    images: ["/og.png"],
  },
}

const hostingOptions = [
  {
    title: "Client-owned hosting",
    icon: Server,
    description:
      "Wij implementeren OpenClaw in jullie eigen omgeving. Jullie behouden ownership over infrastructuur, data en runtime.",
    bullets: [
      "Deployment in jullie tenant of VPS",
      "Least-privilege toegang voor setup en support",
      "Past bij teams met eigen IT of strengere compliance eisen",
    ],
  },
  {
    title: "Managed hosting",
    icon: ShieldCheck,
    description:
      "Wij hosten en beheren de OpenClaw omgeving voor jullie. Snel live, met een helder beheer- en supportmodel.",
    bullets: [
      "Wij beheren hosting, updates en monitoring",
      "Per klant geisoleerde omgeving",
      "Duidelijke exit: overdraagbaar naar client-owned als je later wil migreren",
    ],
  },
] as const

const requirements = [
  "Toegang tot relevante tools via least-privilege (scopes en rollen afgesproken)",
  "Realistische testcases zodat we gedrag en uitzonderingen kunnen valideren",
  "Een owner die approvals kan geven tijdens build, review en go-live",
  "Optioneel: managed provisioning add-on als je geen interne credentials wilt delen",
] as const

const deliverables = [
  "Werkende OpenClaw omgeving (hostingmodel volgens afspraak)",
  "1 workflow live (Starter) of meerdere workflows (Groei), inclusief integraties",
  "Security baseline: secrets, logging, audit trail en afgesproken approvals",
  "Acceptatiechecklist met testresultaten op afgesproken scenario's",
  "Documentatie voor beheer, overdracht en wijzigingen",
  "Go-live begeleiding en nazorg volgens package",
] as const

const ImplementatiePage: React.FC = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">
            Managed OpenClaw
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            OpenClaw implementatie voor bedrijven
          </h1>
          <p className="mt-4 text-slate-600">
            Wij hosten en implementeren OpenClaw als workflowlaag voor je team. Je start met 1 workflow,
            meet het effect en schaalt gecontroleerd op. Typische doorlooptijd: 3-7 werkdagen,
            afhankelijk van toegang en integraties.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Bekijk packages
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
            >
              Plan een intake
            </a>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Hostingmodellen</h2>
          <p className="mt-2 text-sm text-slate-600">
            Kies het model dat past bij jullie IT-team, compliance eisen en gewenste snelheid.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {hostingOptions.map((option) => (
            <article key={option.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                  <option.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{option.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{option.description}</p>
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
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Wat we nodig hebben</h2>
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
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Security baseline</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
              We werken met least-privilege toegang, afgesproken logging en duidelijke verantwoordelijkheden.
              Meer details vind je op onze{" "}
              <a className="font-medium text-slate-900 underline" href="/security">
                beveiligingspagina
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">Ga verder</h2>
        <p className="mt-2 text-sm text-slate-600">
          Verdiep je in beveiliging, integraties en prijzen voor je implementatie.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <a
            href="/security"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-slate-300"
          >
            Beveiliging
          </a>
          <a
            href="/integrations"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-slate-300"
          >
            Integraties
          </a>
          <a
            href="/pricing"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-slate-300"
          >
            Prijzen
          </a>
        </div>
      </section>
    </main>
  )
}

export default ImplementatiePage
