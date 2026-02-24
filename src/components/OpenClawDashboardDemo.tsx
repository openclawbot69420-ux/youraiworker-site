"use client"

import { useEffect, useRef, useState } from "react"

type BubbleTone = "user" | "agent" | "meta"

type ScenarioBubble = {
  tone: BubbleTone
  label?: string
  text: string
}

type DemoScenario = {
  title: string
  channel: string
  status: string
  bubbles: ScenarioBubble[]
  resultaat: string
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    title: "Inbox triage",
    channel: "Gmail",
    status: "Workflow actief",
    bubbles: [
      {
        tone: "user",
        label: "User",
        text: "Kun je deze e-mail triagen en een conceptantwoord klaarzetten?",
      },
      {
        tone: "agent",
        label: "Agent",
        text: "Classificatie: Sales lead (P1) • intentie = offerteaanvraag • seats = 40",
      },
      {
        tone: "meta",
        label: "Acties",
        text: "CRM bijgewerkt, draft reply opgesteld, follow-up reminder ingepland (24u).",
      },
    ],
    resultaat: "Inbox opgeschoond en lead staat direct klaar voor opvolging.",
  },
  {
    title: "Lead qualification",
    channel: "Telegram",
    status: "Conversatie flow",
    bubbles: [
      {
        tone: "user",
        label: "Lead",
        text: "We zoeken AI-automatisering voor support en sales. Kunnen jullie helpen?",
      },
      {
        tone: "agent",
        label: "Agent",
        text: "Classificatie: MQL • teamgrootte = 12 • gewenste livegang = maart",
      },
      {
        tone: "meta",
        label: "Acties",
        text: "Kwalificatievragen afgerond, CRM-status = Qualified, intake-slot voorgesteld.",
      },
    ],
    resultaat: "Sales ziet alleen gekwalificeerde leads met context en volgende stap.",
  },
  {
    title: "WhatsApp support",
    channel: "WhatsApp",
    status: "Support + escalatie",
    bubbles: [
      {
        tone: "user",
        label: "Klant",
        text: "Ik kan niet inloggen en mis factuur #1049. Kunnen jullie helpen?",
      },
      {
        tone: "agent",
        label: "Agent",
        text: "Classificatie: auth + billing • reset-instructies verstuurd • confidence FAQ 0.97",
      },
      {
        tone: "meta",
        label: "Acties",
        text: "Billing issue geëscaleerd: Zendesk-ticket #5821 aangemaakt met samenvatting.",
      },
    ],
    resultaat: "1e lijn direct opgelost, billing automatisch doorgestuurd met audit trail.",
  },
]

type AnimationState = {
  scenarioIndex: number
  revealedCount: number
  phase: "reveal" | "hold" | "fade"
  ticksLeft: number
}

const TICK_MS = 60
const REVEAL_GAP_TICKS = 8
const HOLD_TICKS = 52
const FADE_TICKS = 10

export const OpenClawDashboardDemo: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const [animation, setAnimation] = useState<AnimationState>({
    scenarioIndex: 0,
    revealedCount: 0,
    phase: "reveal",
    ticksLeft: 0,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return
    }

    const node = rootRef.current
    if (!node) {
      return
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => setIsInView(entry?.isIntersecting ?? true),
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !isInView) {
      return
    }

    const intervalId = window.setInterval(() => {
      setAnimation((current) => {
        const scenario = DEMO_SCENARIOS[current.scenarioIndex] ?? DEMO_SCENARIOS[0]
        const totalSteps = scenario.bubbles.length + 1

        if (current.phase === "hold") {
          if (current.ticksLeft > 0) {
            return { ...current, ticksLeft: current.ticksLeft - 1 }
          }
          return { ...current, phase: "fade", ticksLeft: FADE_TICKS }
        }

        if (current.phase === "fade") {
          if (current.ticksLeft > 0) {
            return { ...current, ticksLeft: current.ticksLeft - 1 }
          }

          return {
            scenarioIndex: (current.scenarioIndex + 1) % DEMO_SCENARIOS.length,
            revealedCount: 0,
            phase: "reveal",
            ticksLeft: 0,
          }
        }

        if (current.ticksLeft > 0) {
          return { ...current, ticksLeft: current.ticksLeft - 1 }
        }

        if (current.revealedCount < totalSteps) {
          return {
            ...current,
            revealedCount: current.revealedCount + 1,
            ticksLeft: REVEAL_GAP_TICKS,
          }
        }

        return { ...current, phase: "hold", ticksLeft: HOLD_TICKS }
      })
    }, TICK_MS)

    return () => window.clearInterval(intervalId)
  }, [isInView, prefersReducedMotion])

  const scenario =
    (prefersReducedMotion ? DEMO_SCENARIOS[0] : DEMO_SCENARIOS[animation.scenarioIndex]) ??
    DEMO_SCENARIOS[0]
  const revealCount = prefersReducedMotion ? scenario.bubbles.length + 1 : animation.revealedCount
  const visibleBubbles = scenario.bubbles.slice(0, Math.min(revealCount, scenario.bubbles.length))
  const showResult = revealCount > scenario.bubbles.length
  const fadeOpacity =
    !prefersReducedMotion && animation.phase === "fade"
      ? Math.max(0, animation.ticksLeft / FADE_TICKS)
      : 1

  const bubbleClasses = (tone: BubbleTone) => {
    if (tone === "user") {
      return "ml-auto max-w-[88%] bg-cyan-500 text-white border-cyan-400/70"
    }
    if (tone === "meta") {
      return "mr-auto max-w-[92%] bg-amber-50 text-amber-950 border-amber-200"
    }
    return "mr-auto max-w-[92%] bg-white text-slate-900 border-slate-200"
  }

  return (
    <div
      ref={rootRef}
      className="h-full rounded-2xl border border-slate-200/20 bg-slate-950/60 p-2 shadow-2xl shadow-black/30 ring-1 ring-white/10 sm:p-3"
    >
      <div className="grid h-full grid-cols-1 gap-3 overflow-hidden rounded-xl bg-slate-100/95 p-2 sm:grid-cols-[14rem_minmax(0,1fr)]">
        <aside className="hidden h-full flex-col rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:flex">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-xs font-semibold text-white">
              OC
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-900">OpenClaw</p>
              <p className="text-[11px] text-slate-500">Dashboard</p>
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            {[
              ["Chat", "Inbox & support"],
              ["Control", "Flows & actions"],
              ["Sessions", "Live runs"],
              ["Cron", "Scheduled jobs"],
            ].map(([title, desc], index) => {
              const active = index === 0
              return (
                <div
                  key={title}
                  className={`rounded-lg border px-3 py-2 ${
                    active
                      ? "border-cyan-200 bg-cyan-50"
                      : "border-slate-200 bg-slate-50/70 text-slate-700"
                  }`}
                >
                  <p className={`text-xs font-semibold ${active ? "text-cyan-900" : "text-slate-900"}`}>
                    {title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{desc}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-auto rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Agent status
            </p>
            <p className="mt-1 text-xs font-medium text-slate-900">3 workflows zichtbaar</p>
            <p className="mt-1 text-[11px] text-slate-500">Visual demo (geen live data)</p>
          </div>
        </aside>

        <main className="flex min-h-0 flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2.5 sm:px-4">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              <p className="truncate text-xs font-semibold text-slate-900 sm:text-sm">
                {scenario.title}
              </p>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
              {scenario.channel}
            </span>
            <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
              {scenario.status}
            </span>
          </div>

          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 sm:px-4">
            {DEMO_SCENARIOS.map((item, index) => {
              const isActive = item.title === scenario.title
              return (
                <span
                  key={item.title}
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:text-[11px] ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                  aria-label={`Scenario ${index + 1}: ${item.title}`}
                >
                  {item.title}
                </span>
              )
            })}
          </div>

          <div className="min-h-0 flex-1 overflow-hidden p-3 sm:p-4">
            <div
              className="flex h-full flex-col rounded-lg bg-slate-50 p-3 transition-opacity duration-200"
              style={{ opacity: fadeOpacity }}
            >
              <div className="min-h-0 flex-1 space-y-2 overflow-hidden">
                {visibleBubbles.map((bubble, index) => (
                  <div
                    key={`${scenario.title}-${bubble.label}-${index}`}
                    className={`rounded-2xl border px-3 py-2 text-xs leading-relaxed shadow-sm sm:text-sm ${bubbleClasses(
                      bubble.tone
                    )}`}
                  >
                    {bubble.label ? (
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide opacity-70 sm:text-[11px]">
                        {bubble.label}
                      </p>
                    ) : null}
                    <p>{bubble.text}</p>
                  </div>
                ))}

                {!prefersReducedMotion && animation.phase === "reveal" && revealCount <= scenario.bubbles.length ? (
                  <div className="flex items-center gap-1.5 px-2 py-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 motion-reduce:hidden" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-300 [animation-delay:120ms] motion-reduce:hidden" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-200 [animation-delay:240ms] motion-reduce:hidden" />
                  </div>
                ) : null}
              </div>

              <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700 sm:text-[11px]">
                  Resultaat
                </p>
                <p
                  className={`text-xs leading-relaxed text-emerald-900 transition-opacity duration-200 sm:text-sm ${
                    showResult ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {scenario.resultaat}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
