import type { Metadata } from "next"
import {
  Calendar,
  ClipboardCheck,
  Database,
  LifeBuoy,
  Lock,
  Mail,
  MessageCircle,
  MessagesSquare,
  Plus,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react"

import { OpenClawDashboardDemo } from "../components/OpenClawDashboardDemo"
import { HOMEPAGE_SCENARIOS } from "../components/demoScenarios"

const INTEGRATION_ITEMS = [
  { label: "Gmail", src: "/brands/gmail.svg" },
  { label: "Google Calendar", src: "/brands/google-calendar.svg" },
  { label: "WhatsApp", src: "/brands/whatsapp.svg" },
  { label: "Telegram", src: "/brands/telegram.svg" },
  { label: "Slack", src: "/brands/slack.svg" },
  { label: "HubSpot", src: "/brands/hubspot.svg" },
  { label: "Salesforce", src: "/brands/salesforce.svg" },
  { label: "Zapier", src: "/brands/zapier.svg" },
  { label: "en meer", src: null },
] as const

const PROBLEM_CARDS = [
  {
    title: "Inbox + follow-ups",
    description:
      "Sales en operations verliezen tijd aan triage, statuschecks en opvolging die tussen mailboxen blijft hangen.",
    snippet: "Nieuwe lead -> antwoordconcept -> reminder +2 dagen -> owner toegewezen",
  },
  {
    title: "Chat leads/support",
    description:
      "WhatsApp en webchat vragen snelle reacties, maar context en prioriteit worden handmatig bepaald.",
    snippet: "Vraag binnen -> intentie herkend -> ticket of leadroute -> antwoord klaarzetten",
  },
  {
    title: "CRM updates + reporting",
    description:
      "Activiteiten worden laat of onvolledig bijgewerkt, waardoor forecast en rapportages achterlopen.",
    snippet: "Call samenvatting -> CRM veldupdate -> weekrapport automatisch bijgewerkt",
  },
  {
    title: "Planning chaos",
    description:
      "Afstemming via e-mail en chat zorgt voor dubbele afspraken, losse notities en onduidelijke opvolging.",
    snippet: "Beschikbaarheid ophalen -> voorstel sturen -> bevestiging -> agenda + CRM sync",
  },
] as const

const SOLUTION_BLOCKS = [
  {
    title: "Verzoek intake en classificatie",
    request: "Een e-mail, chatbericht of formulier komt binnen.",
    action: "De agent herkent type verzoek, prioriteit en volgende stap op basis van jouw regels.",
    result: "Snellere eerste reactie en minder handmatige triage in het team.",
  },
  {
    title: "Uitvoering in je bestaande tools",
    request: "Het team wil niet in nog een nieuw systeem werken.",
    action: "De agent leest en schrijft in mail, agenda, chat en CRM via bestaande koppelingen.",
    result: "Procesverbetering zonder extra operationele overhead.",
  },
  {
    title: "Controleerbare output",
    request: "Management wil inzicht in wat is verwerkt en wat nog wacht.",
    action: "Acties, statussen en uitzonderingen worden zichtbaar in een dashboard en logs.",
    result: "Meetbare doorlooptijd, betere opvolging en duidelijk eigenaarschap.",
  },
] as const

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Your AI Worker",
  url: "https://youraiworker.nl",
  description:
    "Production-ready AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en snel live.",
  logo: "https://youraiworker.nl/icon-512.png",
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Your AI Worker",
  url: "https://youraiworker.nl",
  description:
    "Production-ready AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en snel live.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://youraiworker.nl/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export const metadata: Metadata = {
  title: "AI-agents voor je organisatie",
  description:
    "Productierijpe AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en snel live.",
  openGraph: {
    title: "Your AI Worker - AI-agents voor je organisatie",
    description:
      "Productierijpe AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en snel live.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your AI Worker - AI-agents voor je organisatie",
    description:
      "Productierijpe AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en snel live.",
    images: ["/og.png"],
  },
}

const HomePage: React.FC = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(websiteSchema) }}
      />
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              AI-agents die operationeel werk verlagen en opvolging versnellen.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Wij ontwerpen en implementeren AI-agents voor e-mail, chat, planning en CRM-processen.
              Je start met één afgebakende workflow, meet resultaat in de praktijk en schaalt daarna
              gecontroleerd door.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="rounded-lg bg-slate-900 px-6 py-3 text-center text-sm font-medium text-white hover:bg-slate-800 transition-colors"
              >
                Plan een intake (20 min)
              </a>
              <a
                href="/contact"
                className="rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
              >
                Vraag een voorstel aan
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
              <h2 className="text-lg font-semibold">Hoe het werkt</h2>
              <p className="mt-2 text-sm text-slate-600">
                We starten klein, leveren snel, en zorgen dat je team direct met een bruikbare
                agent werkt.
              </p>
              <div className="mt-5 space-y-2.5">
                {[
                  [
                    "1. Kies één workflow",
                    "Inbox triage, lead kwalificatie of rapportages",
                  ],
                  ["2. Wij bouwen & testen", "Production-ready binnen dagen, niet maanden"],
                  ["3. Live + support", "48 uur warranty + 2 weken break‑fix"],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="flex gap-3 rounded-xl border border-slate-100 bg-white p-3.5"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-cyan-500"
                    />
                    <div>
                      <p className="text-xs font-medium text-slate-700">{title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Integrations strip */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Werkt met
            </p>
            <div className="flex flex-wrap gap-2.5">
              {INTEGRATION_ITEMS.map(({ label, src }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 sm:text-sm"
                >
                  {src ? (
                    <img
                      src={src}
                      alt=""
                      className="h-4 w-4"
                      aria-hidden="true"
                      loading="lazy"
                    />
                  ) : (
                    <Plus className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  )}
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-slate-200/70 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              De realiteit
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              De meeste teams hebben de juiste tools al in huis. De vertraging zit in handmatige
              triage, opvolging en overdracht tussen inbox, chat, agenda en CRM.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {PROBLEM_CARDS.map(({ title, description, snippet }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5"
              >
                <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
                    Voorbeeld
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-700 sm:text-sm">
                    {snippet}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            De oplossing
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            We bouwen per workflow een agent die verzoeken verwerkt, acties uitvoert in je systemen
            en resultaten terugschrijft. De dashboarddemo hieronder laat dit patroon zien met echte
            input en agent-output.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {SOLUTION_BLOCKS.map(({ title, request, action, result }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5"
            >
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Verzoek
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">{request}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Actie
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">{action}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Resultaat
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-900">{result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 shadow-2xl shadow-slate-900/10 sm:p-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Zie OpenClaw in actie
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
              Korte demo’s van inbox triage, lead kwalificatie en support - inclusief user input en
              agent output.
            </p>
          </div>

          <div className="mt-8 h-[24rem] overflow-hidden rounded-2xl sm:h-[26rem] lg:h-[28rem]">
            <OpenClawDashboardDemo scenarios={HOMEPAGE_SCENARIOS} />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
            >
              Plan een intake
            </a>
            <a
              href="/use-cases"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Bekijk use cases
            </a>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Wat je krijgt (end-to-end implementatie)
            </h2>
            <p className="mt-4 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">Pakket vanaf €1.000 (incl. 1 agent):</span>{" "}
              één workflow die echt draait: gebouwd, getest met echte cases, gedocumenteerd en gecontroleerd uitgerold.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="/pricing"
                className="inline-block rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Bekijk pricing →
              </a>
              <a
                href="/package/configure"
                className="inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
              >
                Configureer package →
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["1 AI‑agent met duidelijke scope", "Eén proces / één teamflow, met acceptatiecriteria."],
                ["Integraties waar het telt", "API's/webhooks waar mogelijk; altijd expliciet gescoped."],
                ["Rollen, rechten & logging", "Zakelijke baseline: least privilege en traceability."],
                ["Handover + training", "Korte docs + beheerinstructies + 30-min handover."],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all"
                >
                  <p className="font-semibold">{title}</p>
                  <p className="mt-2 text-sm text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Starter Agents */}
      <section className="border-y border-slate-200/70 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Starter agents (kies er één om te beginnen)
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-600">
                Dit zijn bewezen workflows die we vaak in dagen live hebben. Klik door voor details,
                benodigde toegang en typische integraties.
              </p>
            </div>
            <a
              href="/use-cases"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Alle use cases →
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              [
                "Inbox & triage agent",
                "Categoriseert requests, maakt concept‑antwoorden, zet taken klaar.",
                "/use-cases/email-management",
              ],
              [
                "Lead qualification",
                "Pre‑kwalificeert leads en logt naar Google Sheets of CRM.",
                "/use-cases/lead-qualification",
              ],
              [
                "Meeting scheduling",
                "Intake → voorstel → bevestiging. Integratie op maat.",
                "/use-cases/meeting-scheduling",
              ],
              [
                "Automated report generation",
                "Updates voor sales/marketing en management op vaste momenten.",
                "/use-cases/report-generation",
              ],
            ].map(([title, desc, href]) => (
              <a
                key={title}
                href={href}
                className="group block rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-slate-900 group-hover:underline">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
                <p className="mt-4 text-sm font-medium text-slate-900 underline">Bekijk details</p>
              </a>
            ))}

            <a
              href="/use-cases/knowledge-base-qa"
              className="group block rounded-xl border border-slate-200 bg-white p-6 md:col-span-2 transition-all hover:border-slate-300 hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-900 group-hover:underline">Knowledge base Q&A</h3>
              <p className="mt-2 text-sm text-slate-600">
                Kleine scope inbegrepen (max 25 files / 200 pagina&apos;s). Groter = add‑on.
              </p>
              <p className="mt-4 text-sm font-medium text-slate-900 underline">Bekijk details</p>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Waarom bedrijven ons kiezen
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Snel live, duidelijke scope en lokale support. Geen losse experimenten, maar een
              production-ready agent met een voorspelbaar traject.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["< 2 weken", "Gemiddelde time-to-live"],
              ["100%", "Nederlandse setup & support"],
              ["€1.000", "Vaste startprijs, geen verrassingen"],
              ["48 uur", "Warranty response time"],
            ].map(([value, label]) => (
              <div key={value} className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
                <p className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  {value}
                </p>
                <p className="mt-2 text-sm text-slate-600">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold tracking-wide text-slate-900">Onze aanpak</h3>
              <p className="text-sm text-slate-600">
                Praktisch ingericht voor teams die snelheid en controle tegelijk willen.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {(
                [
                  {
                    Icon: ShieldCheck,
                    title: "Security-first",
                    desc: "Tailscale, least-privilege, audit logging standaard",
                  },
                  {
                    Icon: Sparkles,
                    title: "Nederlands team",
                    desc: "Lokale support, geen offshore, korte lijnen",
                  },
                  {
                    Icon: ClipboardCheck,
                    title: "Vaste prijs, duidelijke scope",
                    desc: "Geen verrassingen achteraf",
                  },
                ] as const
              ).map(({ Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-3 font-semibold text-slate-900">{title}</p>
                  <p className="mt-2 text-sm text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Proces: snel, gecontroleerd, meetbaar
        </h2>
        <div className="relative mt-7">
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-4 top-2 w-px bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200"
          />
          {[
            ["1", "Intake", "~30 min", "Scope, risico's, data‑bronnen, succescriteria."],
            ["2", "Design", "1–2 dagen", "Agent‑flow, permissions, outputs, testcases."],
            ["3", "Build & integrate", "3–5 dagen", "Implementatie + koppelingen + logging."],
            ["4", "Review & UAT", "1–2 dagen", "Testen met echte cases, edge cases."],
            ["5", "Go‑live", "1 dag", "Gecontroleerde uitrol + korte training."],
            ["6", "Stabilisatie", "2 weken", "48 uur warranty + 2 weken break‑fix."],
          ].map(([num, title, duration, desc]) => (
            <div key={num} className="relative pl-12">
              <span className="absolute left-0 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-900 bg-slate-900 text-sm font-semibold text-white shadow-sm">
                {num}
              </span>
              <div className="mb-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-sm sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900">{title}</p>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {duration}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore */}
      <section className="border-y border-slate-200/70 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Wat we precies voor je kunnen configureren
            </h2>
            <p className="mt-4 text-slate-600">
              Van één concrete workflow tot complete multi-tool automatisering. Bekijk use cases,
              integraties en implementatie-guides om te zien wat haalbaar is voor jouw bedrijf.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              [
                "Use cases",
                "Concrete automatiseringen voor sales, support, operations en finance.",
                "/use-cases",
                "Bekijk use cases",
              ],
              [
                "Integraties",
                "Koppelingen met de tools die je al gebruikt: CRM, mail, chat, planning en meer.",
                "/integrations",
                "Bekijk integraties",
              ],
              [
                "Guides",
                "Praktische handleidingen voor setup, governance, security en schaalbare uitrol.",
                "/guides",
                "Bekijk guides",
              ],
            ].map(([title, description, href, cta]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
                <a
                  href={href}
                  className="mt-6 inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
                >
                  {cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Security en support</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Veilige defaults, duidelijke support en heldere requirements zodat je snel live kunt
              zonder controle te verliezen.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
              <Lock className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
              <span>
                Remote access via <span className="text-slate-900">Tailscale</span> - versleuteld,
                identity-based, geen open poorten.
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                  <ShieldCheck className="h-5 w-5 text-slate-700" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Security baseline</h3>
              </div>
              <div className="mt-5 space-y-2.5">
                {[
                  "Least privilege per integratie",
                  "Secrets management",
                  "Logging en traceability",
                  "Omgevingsscheiding waar nodig",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-3 text-sm text-slate-700"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-900/5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-2.5">
                  <LifeBuoy className="h-5 w-5 text-slate-700" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Support</h3>
              </div>
              <div className="mt-5 space-y-2.5">
                {[
                  ["48 uur warranty", "bugs en regressies binnen scope"],
                  ["2 weken break-fix", "tijdens business hours"],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">{title}</p>
                    <p className="mt-0.5 text-xs text-slate-600">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white/70 px-4 py-3 text-sm text-slate-600">
                <span className="font-medium text-slate-900">SLA op aanvraag</span> - 24/7 en
                incident response mogelijk.
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                  <ClipboardCheck className="h-5 w-5 text-slate-700" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Wat we nodig hebben</h3>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
                {[
                  "Accounts en toegang met least-privilege rechten en scopes",
                  "Realistische testcases voor gedrag en uitzonderingen",
                  "Een owner voor approvals tijdens build, review en go-live",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-3"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Optioneel: managed provisioning add-on als je geen credentials wilt delen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-14 text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Klaar om één proces te automatiseren?
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Plan een korte intake. Je krijgt binnen 24-48 uur een concreet voorstel met scope,
            planning en vaste uitgangspunten.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="rounded-lg bg-white px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Plan intake
            </a>
            <a
              href="/pricing"
              className="rounded-lg border border-white/30 px-6 py-3 text-center text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Bekijk pricing
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
