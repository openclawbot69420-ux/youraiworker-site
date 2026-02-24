"use client"

import { useState } from "react"
import { CheckCircle2, ChevronDown, Rocket, Send, Sparkles } from "lucide-react"

type MockLine = {
  label: string
  value: string
  tone?: "default" | "success" | "muted"
}

type MockAction = {
  label: string
  status: string
}

type RolloutStep = {
  id: string
  label: string
  title: string
  duration: string
  summary: string
  bullets: string[]
  panelTitle: string
  panelSubtitle: string
  panelTag: string
  lines: MockLine[]
  actions: MockAction[]
  metricLabel: string
  metricValue: string
}

const ROLLOUT_STEPS: RolloutStep[] = [
  {
    id: "choose",
    label: "Kies",
    title: "Kies de eerste workflow",
    duration: "30 min intake",
    summary:
      "We bakenen een concrete use case af met scope, risico's en succescriteria zodat de eerste livegang klein en meetbaar blijft.",
    bullets: [
      "1 workflow met duidelijke eigenaar",
      "Succesmeting en uitzonderingen vastleggen",
      "Scope afgestemd op snelle oplevering",
    ],
    panelTitle: "Selectie en scope",
    panelSubtitle: "Workflowbriefing voor implementatie",
    panelTag: "Stap 1",
    lines: [
      { label: "Toepassing", value: "Inbox triage + opvolging" },
      { label: "Bronnen", value: "Gmail, HubSpot" },
      { label: "KPI", value: "Reactietijd < 15 min", tone: "success" },
    ],
    actions: [
      { label: "Scope goedgekeurd", status: "Klaar" },
      { label: "Testcases verzameld", status: "Bezig" },
      { label: "Go / no-go criteria", status: "Klaar" },
    ],
    metricLabel: "Doorlooptijd intake",
    metricValue: "Zelfde dag",
  },
  {
    id: "share",
    label: "Deel",
    title: "Deel toegang en voorbeelden",
    duration: "1-2 werkdagen",
    summary:
      "Je team deelt alleen de benodigde accounts, rechten en voorbeeldcases. Wij richten de flow, logging en testset gecontroleerd in.",
    bullets: [
      "Least-privilege toegang per integratie",
      "Voorbeeldcases inclusief edge cases",
      "Reviewmoment op outputs en beslisregels",
    ],
    panelTitle: "Validatie en configuratie",
    panelSubtitle: "Koppelingen en testcases in review",
    panelTag: "Stap 2",
    lines: [
      { label: "Toegang", value: "Gmail readonly + send, HubSpot contacts" },
      { label: "Testset", value: "24 cases, 5 uitzonderingen" },
      { label: "Logging", value: "Audit events actief", tone: "success" },
    ],
    actions: [
      { label: "Integraties gekoppeld", status: "Klaar" },
      { label: "Outputreview team", status: "In review" },
      { label: "Fallback regels", status: "Klaar" },
    ],
    metricLabel: "Reviewmoment",
    metricValue: "Binnen 24 uur",
  },
  {
    id: "go-live",
    label: "Live",
    title: "Testen, livezetten, meten",
    duration: "2-5 werkdagen",
    summary:
      "We bouwen, testen met echte cases en rollen gecontroleerd uit. Resultaat en uitzonderingen blijven zichtbaar in dashboards en logs.",
    bullets: [
      "UAT met echte scenario's",
      "Gecontroleerde livegang met monitoring",
      "Korte training en stabilisatieafspraken",
    ],
    panelTitle: "Live dashboard",
    panelSubtitle: "Uitrolstatus en eerste resultaten",
    panelTag: "Stap 3",
    lines: [
      { label: "Status", value: "Live in productie", tone: "success" },
      { label: "Automatiseringen", value: "118 verwerkt vandaag" },
      { label: "Escalaties", value: "4 handmatig beoordeeld", tone: "muted" },
    ],
    actions: [
      { label: "UAT akkoord", status: "Klaar" },
      { label: "Monitoring actief", status: "Klaar" },
      { label: "Training team", status: "Gepland" },
    ],
    metricLabel: "Eerste rollout",
    metricValue: "3-7 werkdagen",
  },
]

const DETAILED_STEPS = [
  ["1", "Intake", "~30 min", "Scope, risico's, data-bronnen, succescriteria."],
  ["2", "Design", "1-2 dagen", "Agent-flow, permissions, outputs, testcases."],
  ["3", "Build & integrate", "3-5 dagen", "Implementatie + koppelingen + logging."],
  ["4", "Review & UAT", "1-2 dagen", "Testen met echte cases, edge cases."],
  ["5", "Go-live", "1 dag", "Gecontroleerde uitrol + korte training."],
  ["6", "Stabilisatie", "2 weken", "48 uur warranty + 2 weken break-fix."],
] as const

const toneClassMap: Record<NonNullable<MockLine["tone"]>, string> = {
  default: "text-slate-700",
  success: "text-emerald-700",
  muted: "text-slate-500",
}

export function HomeProcessRollout() {
  const [activeStepId, setActiveStepId] = useState<string>(ROLLOUT_STEPS[0].id)

  const activeStep = ROLLOUT_STEPS.find((step) => step.id === activeStepId) ?? ROLLOUT_STEPS[0]

  return (
    <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-700">Compacte rollout in 3 stappen</p>
          <p className="mt-1 text-sm text-slate-600">
            Kies, deel context en ga live met meetbare output.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Eerste rollout meestal in 3-7 werkdagen
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <div role="tablist" aria-label="Processtappen" className="space-y-2">
            {ROLLOUT_STEPS.map((step, index) => {
              const isActive = step.id === activeStep.id
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`process-panel-${step.id}`}
                  id={`process-tab-${step.id}`}
                  onClick={() => setActiveStepId(step.id)}
                  className={[
                    "group w-full rounded-2xl border p-3 text-left transition-all sm:p-4",
                    isActive
                      ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                      : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={[
                        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold",
                        isActive
                          ? "border-white/20 bg-white/10 text-white"
                          : "border-slate-200 bg-white text-slate-700",
                      ].join(" ")}
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className={["text-sm font-semibold", isActive ? "text-white" : "text-slate-900"].join(" ")}>
                          {step.label}
                        </p>
                        <span
                          className={[
                            "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                            isActive ? "bg-white/10 text-white" : "border border-slate-200 bg-white text-slate-600",
                          ].join(" ")}
                        >
                          {step.duration}
                        </span>
                      </div>
                      <p className={["mt-1 text-sm", isActive ? "text-slate-200" : "text-slate-600"].join(" ")}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-sm leading-relaxed text-slate-700">{activeStep.summary}</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {activeStep.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          role="tabpanel"
          id={`process-panel-${activeStep.id}`}
          aria-labelledby={`process-tab-${activeStep.id}`}
          className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3 sm:p-4"
        >
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {activeStep.panelTag}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{activeStep.panelTitle}</p>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                {activeStep.metricLabel}: {activeStep.metricValue}
              </span>
            </div>

            <div
              key={activeStep.id}
              className="grid gap-3 p-4 motion-safe:animate-[fadeIn_240ms_ease-out]"
            >
              <p className="text-xs text-slate-600">{activeStep.panelSubtitle}</p>

              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                <div className="space-y-2">
                  {activeStep.lines.map((line) => {
                    const toneKey = line.tone ?? "default"
                    return (
                      <div
                        key={line.label}
                        className="grid grid-cols-[90px_minmax(0,1fr)] items-center gap-2 text-xs"
                      >
                        <span className="text-slate-500">{line.label}</span>
                        <span className={["font-medium", toneClassMap[toneKey]].join(" ")}>
                          {line.value}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {activeStep.actions.map((action) => (
                  <div key={action.label} className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-medium text-slate-900">{action.label}</p>
                    <p className="mt-1 text-xs text-slate-600">{action.status}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-slate-200 bg-slate-900 px-3 py-2 text-white">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                    <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
                    Uitrolstatus
                  </div>
                  <p className="mt-1 text-sm font-semibold">Gecontroleerd</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    Rapportage
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-900">Meetbaar vanaf dag 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <details className="group mt-4 rounded-2xl border border-slate-200 bg-slate-50/60 open:bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
          <span>Bekijk details van de 6 stappen</span>
          <span className="inline-flex items-center gap-2 text-xs text-slate-600">
            Oorspronkelijke planning
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </span>
        </summary>
        <div className="border-t border-slate-200 px-4 py-4">
          <div className="grid gap-3 md:grid-cols-2">
            {DETAILED_STEPS.map(([num, title, duration, desc]) => (
              <div key={num} className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">
                    {num}
                  </span>
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                  <span className="ml-auto rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    {duration}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  )
}
