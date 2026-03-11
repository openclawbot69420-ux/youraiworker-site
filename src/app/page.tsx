import type { Metadata } from "next"
import {
  ClipboardCheck,
  Database,
  LifeBuoy,
  Lock,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react"

import { ChatDemo } from "../components/ChatDemo"
import { HomeProcessRollout } from "../components/HomeProcessRollout"
import { Testimonials } from "../components/Testimonials"
import { HomeFaq } from "../components/HomeFaq"
import { HOMEPAGE_SCENARIOS } from "../components/demoScenarios"

const INTEGRATION_ITEMS = [
  {
    label: "Gmail",
    src: "/brands/gmail.svg",
    tileBg: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    glyphHex: "#EA4335",
    maskSize: "74%",
    maskPosition: "center 53%",
  },
  {
    label: "Google Calendar",
    src: "/brands/google-calendar.svg",
    tileBg: "linear-gradient(180deg, #ffffff 0%, #eff6ff 100%)",
    glyphHex: "#4285F4",
    maskSize: "76%",
    maskPosition: "center 51%",
  },
  {
    label: "WhatsApp",
    src: "/brands/whatsapp.svg",
    tileBg: "linear-gradient(145deg, #2be07a 0%, #1fbf5c 100%)",
    glyphHex: "#ffffff",
    maskSize: "73%",
  },
  {
    label: "Telegram",
    src: "/brands/telegram.svg",
    tileBg: "linear-gradient(145deg, #37b4f3 0%, #1d8fd8 100%)",
    glyphHex: "#ffffff",
    maskSize: "72%",
  },
  {
    label: "Slack",
    src: "/brands/slack.svg",
    tileBg: "linear-gradient(145deg, #5f1f67 0%, #42124c 100%)",
    glyphHex: "#ffffff",
    maskSize: "64%",
  },
  {
    label: "HubSpot",
    src: "/brands/hubspot.svg",
    tileBg: "linear-gradient(145deg, #ff8a65 0%, #f96945 100%)",
    glyphHex: "#ffffff",
    maskSize: "63%",
  },
  {
    label: "Salesforce",
    src: "/brands/salesforce.svg",
    tileBg: "linear-gradient(145deg, #20b6ec 0%, #008fe4 100%)",
    glyphHex: "#ffffff",
    maskSize: "75%",
    maskPosition: "center 52%",
  },
  {
    label: "Zapier",
    src: "/brands/zapier.svg",
    tileBg: "linear-gradient(145deg, #ff7a1a 0%, #ff4a00 100%)",
    glyphHex: "#ffffff",
    maskSize: "68%",
  },
  { label: "en meer", src: null },
] as const

const WORKFLOW_MARQUEE_ITEMS = [
  "Inbox triage voor supportteams",
  "Leadopvolging voor B2B sales",
  "Afsprakenplanning voor agencies",
  "CRM-updates na calls en chats",
  "Rapportages voor operations",
  "Escalaties naar Slack-kanalen",
  "Klantvragen via WhatsApp",
  "Intake + routing via Telegram",
  "Backoffice workflows met approvals",
  "OpenClaw managed in productie",
] as const

const PROBLEM_CARDS = [
  {
    title: "Inbox + opvolging",
    description:
      "Sales en operations verliezen tijd aan triage, statuschecks en opvolging die tussen mailboxen blijft hangen.",
    snippet: "Nieuwe lead -> antwoordconcept -> reminder +2 dagen -> owner toegewezen",
  },
  {
    title: "Chat leads en support",
    description:
      "WhatsApp en webchat vragen snelle reacties, maar context en prioriteit worden handmatig bepaald.",
    snippet: "Vraag binnen -> intentie herkend -> ticket of leadroute -> antwoord klaarzetten",
  },
  {
    title: "CRM-updates + rapportage",
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

const STARTER_AGENT_ITEMS = [
  {
    title: "Inbox- en triage-agent",
    description: "Categoriseert requests, maakt conceptantwoorden en zet taken klaar.",
    href: "/use-cases/email-management",
  },
  {
    title: "Leadkwalificatie",
    description: "Prekwalificeert leads en logt naar Google Sheets of CRM.",
    href: "/use-cases/lead-qualification",
  },
  {
    title: "Afspraken plannen",
    description: "Intake, voorstel en bevestiging met integratie op maat.",
    href: "/use-cases/meeting-scheduling",
  },
  {
    title: "Geautomatiseerde rapportage",
    description: "Sales, marketing en management updates op vaste momenten.",
    href: "/use-cases/report-generation",
  },
  {
    title: "Kennisbank Q&A",
    description: "Kleine scope inbegrepen. Groter kan als add-on worden ingericht.",
    href: "/use-cases/knowledge-base-qa",
  },
] as const

const COMPARISON_ROWS = [
  {
    label: "Maandelijkse kosten",
    ours: "✕ Niet vereist",
    va: "✓ Salaris of retainer",
    diy: "✕ Geen leverancier, wel interne capaciteit",
  },
  {
    label: "Setup tijd",
    ours: "✓ Dagen",
    va: "△ 1 tot 2 weken onboarding",
    diy: "✕ Weken tot maanden",
  },
  {
    label: "Beschikbaar",
    ours: "✓ Consistent",
    va: "✕ Beperkt tot capaciteit en werktijden",
    diy: "△ Afhankelijk van teambezetting",
  },
  {
    label: "Schaalbaarheid",
    ours: "✓ Extra workflow per scope",
    va: "✕ Lineair met extra mensen",
    diy: "△ Mogelijk, maar ontwikkeltijd nodig",
  },
  {
    label: "Leert je context",
    ours: "✓ Via regels, voorbeelden en iteraties",
    va: "✓ Via overdracht en ervaring",
    diy: "△ Alleen als je het expliciet bouwt",
  },
  {
    label: "Foutafhandeling",
    ours: "✓ Routes, logging en escalaties",
    va: "△ Handmatig en persoonsafhankelijk",
    diy: "△ Volledig zelf ontwerpen en beheren",
  },
  {
    label: "Governance en audit",
    ours: "✓ Logging, approvals en audit trail per workflow",
    va: "△ Procesafspraken mogelijk, beperkt technisch auditspoor",
    diy: "△ Mogelijk, maar ontwerp en beheer liggen volledig intern",
  },
  {
    label: "Security baseline",
    ours: "✓ Least privilege, secrets management en traceability",
    va: "△ Afhankelijk van werkwijze en tooling van de VA",
    diy: "△ Sterk afhankelijk van interne security-ervaring",
  },
] as const

const STRANDT_WITHOUT_POINTS = [
  "Werkt lokaal, maar geen duidelijke eigenaar voor productie",
  "Secrets, ENV en permissies worden ad-hoc geregeld",
  "Geen retries en monitoring, failures blijven liggen",
  "Geen logging en audit, onduidelijk wat de agent deed",
  "Geen approval gates, risico op fouten in klantcontact",
  "Na livegang niemand die onderhoud en fixes oppakt",
  "Geen privacy- en compliance check (AVG), dus risico op datalekken",
] as const

const STRANDT_WITH_MANAGED = [
  "Scope en acceptatiecriteria per workflow",
  "Dedicated omgeving met zakelijke security-baseline",
  "Integraties, permissies en secrets correct ingericht",
  "Logging, audit trail en approval gates waar nodig",
  "Go-live met testcases, fallback en eigenaarschap",
  "Updates en onderhoud na livegang",
] as const

const DELIVERABLE_CARDS = [
  {
    Icon: Database,
    title: "Dedicated omgeving",
    description:
      "Een gescheiden omgeving voor je workflow, met duidelijke eigenaarschap en configuratie die niet door elkaar loopt met experimenten.",
  },
  {
    Icon: Workflow,
    title: "Integraties op maat",
    description:
      "Koppelingen met de tools die je al gebruikt, inclusief scopes, mappings en foutafhandeling die passen bij je proces.",
  },
  {
    Icon: ClipboardCheck,
    title: "Logging + audit",
    description:
      "Acties, statussen en uitzonderingen worden gelogd zodat je kunt controleren wat de agent heeft gedaan en waarom.",
  },
  {
    Icon: ShieldCheck,
    title: "Approval gates",
    description:
      "Menselijke goedkeuring op kritieke stappen zoals verzending, updates naar CRM of escalaties naar klanten en leveranciers.",
  },
  {
    Icon: Sparkles,
    title: "Updates + onderhoud",
    description:
      "Doorlopende aanpassingen op prompts, regels en integraties binnen afgesproken scope zodat de workflow blijft werken.",
  },
  {
    Icon: LifeBuoy,
    title: "Backup setup",
    description:
      "Fallbacks en herstelafspraken zodat je team door kan werken als een integratie wijzigt of tijdelijk niet beschikbaar is.",
  },
] as const

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

type StarterAgentCardProps = {
  title: string
  description: string
  href: string
  compact?: boolean
}

const StarterAgentCard: React.FC<StarterAgentCardProps> = ({
  title,
  description,
  href,
  compact = false,
}) => (
  <a
    href={href}
    className={[
      "group block rounded-xl border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm",
      compact ? "w-[85vw] min-w-[15.5rem] max-w-[18rem] snap-start p-4" : "p-4 sm:p-5",
    ].join(" ")}
  >
    <h3 className="text-sm font-semibold leading-snug text-slate-900 group-hover:underline">
      {title}
    </h3>
    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">{description}</p>
    <p
      className="mt-3 text-xs font-medium text-slate-900 underline"
      aria-label={`Bekijk details over ${title}`}
    >
      Bekijk details
    </p>
  </a>
)

type IntegrationBadgeProps = {
  label: string
  src: string | null
  tileBg?: string
  glyphHex?: string
  maskSize?: string
  maskPosition?: string
}

const IntegrationBadge: React.FC<IntegrationBadgeProps> = ({
  label,
  src,
  tileBg,
  glyphHex = "#fff",
  maskSize = "68%",
  maskPosition = "center",
}) => {
  const showTooltip = Boolean(src)

  const maskStyle = src
    ? ({
        backgroundColor: glyphHex,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: maskPosition,
        maskPosition,
        WebkitMaskSize: maskSize,
        maskSize,
      } as React.CSSProperties)
    : undefined

  return (
    <span
      className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition-all hover:-translate-y-0.5 hover:border-slate-300 sm:h-14 sm:w-14"
      aria-label={label}
      tabIndex={0}
      style={tileBg ? ({ background: tileBg } as React.CSSProperties) : undefined}
    >
      {src ? (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-[2px] rounded-[0.85rem] border border-white/60 bg-white/10"
          />
          <span
            aria-hidden="true"
            className="relative h-6 w-6 sm:h-7 sm:w-7"
            style={maskStyle}
          />
        </>
      ) : (
        <span className="flex h-full w-full items-center justify-center text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 sm:text-[11px]">
          en meer
        </span>
      )}

      {showTooltip ? (
        <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white shadow-lg opacity-0 transition-opacity group-hover:block group-hover:opacity-100 group-focus:block group-focus:opacity-100 sm:block sm:group-hover:opacity-100">
          {label}
        </span>
      ) : null}

      <span className="sr-only">{label}</span>
    </span>
  )
}

export const metadata: Metadata = {
  title: "AI-agents voor je organisatie",
  description:
    "Productierijpe AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en snel live. Vanaf €1.000 eenmalig, geen maandelijkse kosten.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Your AI Worker - Productierijpe AI-agents voor je organisatie",
    description:
      "Productierijpe AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en snel live. Vanaf €1.000 eenmalig, geen maandelijkse kosten.",
    url: "/",
    images: ["/og-home.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your AI Worker - Productierijpe AI-agents voor je organisatie",
    description:
      "Productierijpe AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en snel live. Vanaf €1.000 eenmalig, geen maandelijkse kosten.",
    images: ["/og-home.png"],
  },
  other: {
    // Light credibility / contact hints for previews and some crawlers.
    "contact:email": "info@youraiworker.nl",
    // Amsterdam timezone is the business default.
    "contact:hours": "Ma-vr 09:00-17:00 (Amsterdam)",
    "contact:response_time": "Reactie binnen 1 werkdag",
    "business:kvk": "95290475",
    "business:vat": "NL8677.15.849.B01",
  },
}

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Productierijpe AI-agents voor e-mail, chat, planning en CRM.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Wij ontwerpen en implementeren AI-agents voor e-mail, chat, planning en CRM-processen.
              <strong className="text-slate-900"> Vanaf €1.000 eenmalig</strong> (excl. btw).
              <span className="text-slate-900"> Geen maandelijkse kosten.</span>
              <span className="text-slate-600"> Prijs hangt af van scope en integraties.</span>
            </p>
            <p className="mt-3 max-w-xl text-sm text-slate-500">
              Meestal live binnen 3-10 werkdagen. Je krijgt een heldere scope, oplevering en handover.
              <span className="text-slate-600"> Reactie binnen 1 werkdag.</span>
            </p>
            <dl
              className="mt-3 flex max-w-xl flex-wrap gap-2 text-[11px] font-medium text-slate-700"
              aria-label="Bedrijfsgegevens"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5">
                <dt className="text-slate-500">KvK</dt>
                <dd className="text-slate-900">95290475</dd>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5">
                <dt className="text-slate-500">BTW</dt>
                <dd className="text-slate-900">NL8677.15.849.B01</dd>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5">
                <dt className="text-slate-500">Locatie</dt>
                <dd className="text-slate-900">Amsterdam</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="rounded-lg bg-slate-900 px-6 py-3 text-center text-sm font-medium text-white hover:bg-slate-800 transition-colors"
                aria-label="Plan een intakegesprek van 20 minuten"
              >
                Plan een intake (20 min)
              </a>
              <a
                href="/pricing"
                className="rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                aria-label="Bekijk tarieven en wat er inbegrepen is"
              >
                Bekijk tarieven
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
                  {
                    title: "1. Kies één workflow",
                    desc: "Inbox triage, leadkwalificatie of rapportages",
                    meta: "Intake 20 min",
                  },
                  {
                    title: "2. Wij bouwen en testen",
                    desc: "Production-ready binnen dagen, niet maanden",
                    meta: "Duidelijke scope",
                  },
                  {
                    title: "3. Live en support",
                    desc: "48 uur warranty plus 2 weken break-fix (business hours)",
                    meta: "Reactie binnen 1 werkdag",
                  },
                ].map(({ title, desc, meta }) => (
                  <div
                    key={title}
                    className="flex gap-3 rounded-xl border border-slate-100 bg-white p-3.5"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-cyan-500"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <p className="text-xs font-medium text-slate-700">{title}</p>
                        <p className="text-[11px] font-medium text-slate-500">{meta}</p>
                      </div>
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
      <section id="integraties" className="border-y border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Werkt met
            </p>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
              {INTEGRATION_ITEMS.map((item) => (
                <IntegrationBadge key={item.label} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflows marquee */}
      <section
        aria-labelledby="workflow-marquee-title"
        className="border-b border-slate-200/70 bg-slate-50/70"
      >
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-8 sm:pt-16 sm:pb-10">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p
                id="workflow-marquee-title"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
              >
                Waar teams OpenClaw voor inzetten
              </p>
              <p className="text-xs text-slate-500">Voorbeelden van workflows die we automatiseren</p>
            </div>

            <div className="marquee-shell mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-2">
              <div className="marquee-track motion-reduce:flex motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:gap-2 motion-reduce:whitespace-normal">
                {[...WORKFLOW_MARQUEE_ITEMS, ...WORKFLOW_MARQUEE_ITEMS].map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className={[
                      "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700",
                      index >= WORKFLOW_MARQUEE_ITEMS.length ? "motion-reduce:hidden" : "",
                    ].join(" ")}
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="probleem" className="border-b border-slate-200/70 bg-slate-50/50">
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
                tabIndex={0}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-slate-300"
              >
                <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>

                <div className="mt-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 motion-safe:animate-[fadeIn_240ms_ease-out]">
                    <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
                      Voorbeeld
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-700 sm:text-sm">
                      {snippet}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 shadow-2xl shadow-slate-900/10 sm:p-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Zie de chat-agent in actie
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
              Korte chatdemo’s van inbox triage, lead kwalificatie en support, inclusief
              doorgestuurde e-mail, kwalificatievragen en support-escalatie.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl">
            <ChatDemo scenarios={HOMEPAGE_SCENARIOS} />
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
              Bekijk toepassingen
            </a>
          </div>
        </div>
      </section>

      {/* Strandt */}
      <section id="strandt" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Waarom AI agents in de praktijk vastlopen
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              De meeste teams komen verder dan een demo. Daarna lopen AI-agents vast op implementatie,
              eigenaarschap en operationele inrichting. Daarom leveren wij een managed implementatie die
              echt draait in jullie proces, met controls, logging, support en een duidelijke overdracht.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-slate-100 shadow-sm">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                  Zonder implementatie + onderhoud
                </p>
                <span className="rounded-full border border-rose-300/25 bg-rose-400/10 px-2.5 py-1 text-[11px] font-medium text-rose-200">
                  Blijft vaak hangen
                </span>
              </div>
              <div className="mt-4 space-y-2.5">
                {STRANDT_WITHOUT_POINTS.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3.5 py-3 text-sm text-slate-200"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-rose-300/25 bg-rose-400/10 text-[11px] font-semibold text-rose-200">
                      ✕
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-semibold text-slate-900">OpenClaw draait</h3>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                  Managed implementatie
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Wij nemen de vertaalslag naar productie op ons, inclusief inrichting, controles en
                overdracht. Je team krijgt een werkende workflow in plaats van een los experiment.
              </p>
              <div className="mt-4 space-y-2.5">
                {STRANDT_WITH_MANAGED.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-[11px] font-semibold text-emerald-700">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="vergelijking" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Hoe we vergelijken
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Praktische vergelijking voor teams die snelheid, voorspelbaarheid en schaalbaarheid
              willen afwegen tegen handmatig werk of interne bouwcapaciteit.
            </p>
          </div>

          <div className="-mx-6 mt-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
            <table className="min-w-[52rem] border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th className="rounded-tl-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Onderdeel
                  </th>
                  <th className="border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                    AI-agent setup (wij)
                  </th>
                  <th className="border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                    Virtuele assistent (VA)
                  </th>
                  <th className="rounded-tr-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                    Zelf bouwen (DIY)
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, index) => (
                  <tr key={row.label} className="align-top">
                    <th
                      scope="row"
                      className={[
                        "border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900",
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                      ].join(" ")}
                    >
                      {row.label}
                    </th>
                    {[row.ours, row.va, row.diy].map((value) => (
                      <td
                        key={`${row.label}-${value}`}
                        className={[
                          "border border-slate-200 px-4 py-3 text-sm leading-relaxed text-slate-700",
                          index % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs font-semibold",
                            value.startsWith("✓")
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : value.startsWith("✕")
                                ? "border-rose-200 bg-rose-50 text-rose-700"
                                : "border-amber-200 bg-amber-50 text-amber-700",
                          ].join(" ")}
                          aria-hidden="true"
                        >
                          {value.slice(0, 1)}
                        </span>
                        <span>{value.slice(2)}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Eenmalige setup fee. Geen maandelijkse kosten vereist.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <HomeFaq />

      {/* What We Deliver */}
      <section id="wat-je-krijgt" className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Wat je krijgt (end-to-end implementatie)
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Geen losse setup, maar een managed implementatie voor één afgebakende workflow. Je krijgt
              een werkende basis die gecontroleerd live kan en uitbreidbaar blijft.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {DELIVERABLE_CARDS.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 transition-all hover:border-slate-300 hover:bg-white hover:shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-3 font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Starter Agents */}
      <section id="starter-agents" className="border-y border-slate-200/70 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Starter-agents (kies er één om te beginnen)
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Bewezen workflows die vaak in dagen live staan.
              </p>
            </div>
            <a
              href="/use-cases"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Alle toepassingen →
            </a>
          </div>

          <div className="mt-6 md:hidden">
            <div className="-mx-4 overflow-x-auto px-4 pb-2">
              <div className="flex gap-3 snap-x snap-mandatory">
                {STARTER_AGENT_ITEMS.slice(0, 3).map((item) => (
                  <StarterAgentCard key={item.title} {...item} compact />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 hidden gap-3 md:grid md:grid-cols-3">
            {STARTER_AGENT_ITEMS.slice(0, 3).map((item) => (
              <StarterAgentCard key={item.title} {...item} />
            ))}
          </div>

          <details className="mt-4 group">
            <summary className="inline-flex cursor-pointer list-none items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50">
              Toon alle workflows
            </summary>

            <div className="mt-4 md:hidden">
              <div className="-mx-4 overflow-x-auto px-4 pb-2">
                <div className="flex gap-3 snap-x snap-mandatory">
                  {STARTER_AGENT_ITEMS.slice(3).map((item) => (
                    <StarterAgentCard key={item.title} {...item} compact />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 hidden gap-3 md:grid md:grid-cols-2">
              {STARTER_AGENT_ITEMS.slice(3).map((item) => (
                <StarterAgentCard key={item.title} {...item} />
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* Process */}
      <section id="proces" className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Hoe we opleveren</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Je start met 1 afgebakende workflow. Binnen 3-7 werkdagen live, met controlepunten en meetbare outputs.
        </p>
        <HomeProcessRollout />
      </section>

      {/* Security */}
      <section id="security" className="border-y border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Security en support</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Veilige defaults, duidelijke support en heldere requirements zodat je snel live kunt
              zonder controle te verliezen.
            </p>
            <div className="mt-5 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
              <Lock className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
              <span>
                Remote access via <span className="text-slate-900">Tailscale</span> - versleuteld,
                identity-based en geen open poorten.
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
                  "Alleen toegang tot wat echt nodig is",
                  "Beveiligde API-keys",
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
                <span className="font-medium text-slate-900">SLA op aanvraag</span> - uitgebreide support en
                incident response mogelijk.
                <span className="sr-only">
                  We kunnen hiervoor ook een contactkanaal en escalatieproces inrichten.
                </span>
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
                  "Accounts met toegang tot alleen wat nodig is",
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
      <section id="intake" className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-14 text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Klaar om één proces te automatiseren?
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Plan een korte intake. Je krijgt binnen 24-48 uur een concreet voorstel met scope,
            planning en vaste uitgangspunten.
          </p>
          <p className="mt-3 max-w-2xl text-xs text-white/60">
            Antwoord binnen 1 werkdag. KvK 95290475.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="rounded-lg bg-white px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Plan een intake
            </a>
            <a
              href="/pricing"
              className="rounded-lg border border-white/30 px-6 py-3 text-center text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Prijzen
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Intake: 20 min
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              Geen maandelijkse kosten
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-violet-300" />
              Start vanaf €1.000 (excl. btw)
            </span>
          </div>

          <p className="mt-4 text-xs text-white/60">
            Liever mailen?{" "}
            <a
              className="underline underline-offset-2 hover:text-white"
              href="mailto:info@youraiworker.nl"
            >
              info@youraiworker.nl
            </a>
          </p>
        </div>
      </section>
    </>
  )
}

export default HomePage
