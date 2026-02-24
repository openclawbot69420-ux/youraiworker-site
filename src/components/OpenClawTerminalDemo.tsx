"use client"

import { useEffect, useState } from "react"

type TerminalLine = {
  text: string
  tone: "user" | "command" | "success" | "event" | "result"
}

type DemoScenario = {
  label: string
  lines: TerminalLine[]
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    label: "Inbox triage",
    lines: [
      {
        text: 'User> Gmail: "Need pricing + availability for 40 seats next month. Can we talk Friday?"',
        tone: "user",
      },
      { text: 'event:gmail message received from ops@northpeak.eu (thread #4418)', tone: "event" },
      { text: "classify -> Sales lead / high intent / priority=P1", tone: "result" },
      { text: "extract -> seats=40, timeline=next month, asks=[pricing, availability, call]", tone: "result" },
      { text: 'draft_reply -> "Thanks, Friday works. Here are indicative pricing bands..."', tone: "success" },
      { text: "assign -> owner=sales@company.nl | label=Needs quote", tone: "success" },
    ],
  },
  {
    label: "Lead qualification",
    lines: [
      { text: "User> Telegram: New inbound lead from @jasonfounder", tone: "user" },
      { text: "telegram.listen -> lead conversation opened", tone: "event" },
      { text: "ask #1 -> What team size will use this workflow?", tone: "command" },
      { text: "ask #2 -> What's your target go-live date?", tone: "command" },
      { text: "reply parsed -> team_size=12, go_live=March, use_case=customer onboarding", tone: "result" },
      { text: "score -> ICP match: 82/100 (qualified)", tone: "result" },
      { text: "sheets.append -> Leads!A:G row=128 status=Qualified", tone: "success" },
    ],
  },
  {
    label: "WhatsApp support",
    lines: [
      { text: 'User> WhatsApp: "How do I reset my password? Also invoice #1049 is missing."', tone: "user" },
      { text: "whatsapp.webhook -> incoming support message (customer tier: Pro)", tone: "event" },
      { text: "kb.search -> password reset FAQ matched (confidence 0.97)", tone: "result" },
      { text: "send_reply -> reset steps + secure reset link guidance", tone: "success" },
      { text: "detect -> billing issue requires human review", tone: "event" },
      { text: "ticket.create -> Zendesk #5821 | queue=Billing | priority=normal", tone: "result" },
      { text: "notify -> customer updated: 'I've escalated this to billing support.'", tone: "success" },
    ],
  },
]

const TICK_MS = 18
const LINE_PAUSE_TICKS = 7
const SHORT_PAUSE_TICKS = 3
const SCENARIO_HOLD_TICKS = 40
const FADE_TICKS = 14

type AnimationState = {
  scenarioIndex: number
  lineIndex: number
  charIndex: number
  pauseTicks: number
  phase: "typing" | "holding" | "fading"
  phaseTicks: number
}

export const OpenClawTerminalDemo: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [animation, setAnimation] = useState<AnimationState>({
    scenarioIndex: 0,
    lineIndex: 0,
    charIndex: 0,
    pauseTicks: 0,
    phase: "typing",
    phaseTicks: 0,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)

    return () => {
      mediaQuery.removeEventListener("change", updatePreference)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const intervalId = window.setInterval(() => {
      setAnimation((current) => {
        if (current.phase === "holding") {
          if (current.phaseTicks > 0) {
            return { ...current, phaseTicks: current.phaseTicks - 1 }
          }

          return { ...current, phase: "fading", phaseTicks: FADE_TICKS }
        }

        if (current.phase === "fading") {
          if (current.phaseTicks > 0) {
            return { ...current, phaseTicks: current.phaseTicks - 1 }
          }

          return {
            scenarioIndex: (current.scenarioIndex + 1) % DEMO_SCENARIOS.length,
            lineIndex: 0,
            charIndex: 0,
            pauseTicks: 0,
            phase: "typing",
            phaseTicks: 0,
          }
        }

        if (current.pauseTicks > 0) {
          return { ...current, pauseTicks: current.pauseTicks - 1 }
        }

        const scenarioLines = DEMO_SCENARIOS[current.scenarioIndex]?.lines ?? []

        if (current.lineIndex >= scenarioLines.length) {
          return { ...current, phase: "holding", phaseTicks: SCENARIO_HOLD_TICKS }
        }

        const line = scenarioLines[current.lineIndex]

        if (current.charIndex < line.text.length) {
          const charsPerTick = line.text.length > 72 ? 2 : 1
          return { ...current, charIndex: Math.min(line.text.length, current.charIndex + charsPerTick) }
        }

        return {
          ...current,
          lineIndex: current.lineIndex + 1,
          charIndex: 0,
          pauseTicks: line.text.length === 0 ? SHORT_PAUSE_TICKS : LINE_PAUSE_TICKS,
        }
      })
    }, TICK_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [prefersReducedMotion])

  const scenario = DEMO_SCENARIOS[animation.scenarioIndex] ?? DEMO_SCENARIOS[0]
  const scenarioLines = scenario.lines
  const visibleLines = prefersReducedMotion
    ? DEMO_SCENARIOS[0].lines
    : scenarioLines.slice(0, animation.lineIndex)
  const currentLine = prefersReducedMotion ? null : scenarioLines[animation.lineIndex]
  const currentText = currentLine ? currentLine.text.slice(0, animation.charIndex) : ""
  const activeLabel = prefersReducedMotion ? DEMO_SCENARIOS[0].label : scenario.label
  const fadeOpacity =
    animation.phase === "fading" ? Math.max(0, animation.phaseTicks / FADE_TICKS) : 1

  const lineClassName = (tone: TerminalLine["tone"]) => {
    if (tone === "user") return "text-amber-200"
    if (tone === "success") return "text-emerald-400"
    if (tone === "result") return "text-cyan-300"
    if (tone === "command") return "text-slate-100"
    return "text-slate-300"
  }

  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-900 p-4 shadow-2xl shadow-cyan-950/20 ring-1 ring-white/5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-xs text-slate-400">OpenClaw CLI</span>
        <span className="ml-auto text-[11px] text-slate-500">Demo: {activeLabel}</span>
      </div>

      <div
        className="space-y-1 font-mono text-xs leading-6 transition-opacity duration-200 sm:text-sm"
        style={{ opacity: prefersReducedMotion ? 1 : fadeOpacity }}
      >
        {visibleLines.map((line, index) => (
          <p key={`${line.text}-${index}`} className={`whitespace-pre-wrap ${lineClassName(line.tone)}`}>
            {line.text || "\u00A0"}
          </p>
        ))}

        {currentLine ? (
          <p className={`whitespace-pre-wrap ${lineClassName(currentLine.tone)}`}>
            {currentText}
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-cyan-300 align-middle motion-reduce:hidden"
            />
          </p>
        ) : !prefersReducedMotion ? (
          <p className="text-slate-400">
            <span
              aria-hidden="true"
              className="inline-block h-4 w-2 animate-pulse bg-cyan-300 align-middle motion-reduce:hidden"
            />
          </p>
        ) : null}
      </div>
    </div>
  )
}
