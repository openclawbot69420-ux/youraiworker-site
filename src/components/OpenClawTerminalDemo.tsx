"use client"

import { useEffect, useRef, useState } from "react"

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
    label: "Inbox triage (Gmail)",
    lines: [
      {
        text: 'User> "Kun je dit mailtje triagen + een concept antwoord maken?"',
        tone: "user",
      },
      {
        text: 'event:gmail -> Nieuwe mail: "Offerte aanvraag — 40 seats volgende maand"',
        tone: "event",
      },
      { text: "$ openclaw agent run inbox-triage --source gmail", tone: "command" },
      { text: "✓ Geclassificeerd: Sales lead (prio P1)", tone: "success" },
      { text: "→ Velden: seats=40, timing=volgende maand, vraag=pricing+beschikbaarheid", tone: "result" },
      { text: "✓ Concept antwoord opgesteld (klaar voor review)", tone: "success" },
      { text: "✓ CRM bijgewerkt + reminder voor follow-up (24u)", tone: "success" },
      { text: "Resultaat: minder inbox-ruis, sneller opvolgen, niks valt tussen wal en schip.", tone: "result" },
    ],
  },
  {
    label: "Lead kwalificatie (Telegram)",
    lines: [
      { text: 'User> "Nieuwe lead via Telegram — kun je kwalificeren?"', tone: "user" },
      { text: "event:telegram -> Inbound lead: @jasonfounder", tone: "event" },
      { text: "$ openclaw agent run lead-qualifier --channel telegram", tone: "command" },
      { text: "Agent> 1/2: Wat is je teamgrootte?", tone: "result" },
      { text: "User> 12", tone: "user" },
      { text: "Agent> 2/2: Wat is je gewenste go-live datum?", tone: "result" },
      { text: "User> Maart", tone: "user" },
      { text: "✓ Antwoorden verwerkt: team=12, go-live=maart", tone: "success" },
      { text: "✓ Gelogd naar Google Sheets/CRM: status=Qualified", tone: "success" },
      { text: "Resultaat: sales krijgt alleen gekwalificeerde leads + context in één overzicht.", tone: "result" },
    ],
  },
  {
    label: "Support (WhatsApp)",
    lines: [
      { text: 'User> "Help: wachtwoord reset + factuur #1049 ontbreekt"', tone: "user" },
      { text: "event:whatsapp -> Supportbericht ontvangen (tier: Pro)", tone: "event" },
      { text: "$ openclaw agent run whatsapp-support --kb faq", tone: "command" },
      { text: "✓ FAQ gevonden: wachtwoord reset (confidence 0.97)", tone: "success" },
      { text: "✓ Antwoord verstuurd met reset-stappen", tone: "success" },
      { text: "→ Billing issue gedetecteerd → ticket aanmaken", tone: "result" },
      { text: "✓ Ticket aangemaakt: Zendesk #5821 (Billing)", tone: "success" },
      { text: "Resultaat: 1e lijn opgelost, rest automatisch geëscaleerd met audit trail.", tone: "result" },
    ],
  },
  {
    label: "CRM logging (Slack)",
    lines: [
      { text: 'User> "Log klantupdates uit Slack direct in CRM"', tone: "user" },
      { text: "event:slack -> #sales: 'Call gehad met ACME — volgende stap: voorstel'", tone: "event" },
      { text: "$ openclaw workflow run crm-log --source slack --target crm", tone: "command" },
      { text: "✓ Samenvatting gemaakt + next-step vastgelegd", tone: "success" },
      { text: "✓ CRM bijgewerkt (deal stage + activity log)", tone: "success" },
      { text: "Resultaat: pipeline blijft schoon zonder handmatig copy/paste.", tone: "result" },
    ],
  },
]

const TICK_MS = 18
const LINE_PAUSE_TICKS = 9
const SHORT_PAUSE_TICKS = 4
// Hold long enough to actually read the outcome before switching scenarios.
const SCENARIO_HOLD_TICKS = 140
const FADE_TICKS = 18

type AnimationState = {
  scenarioIndex: number
  lineIndex: number
  charIndex: number
  pauseTicks: number
  phase: "typing" | "holding" | "fading"
  phaseTicks: number
}

export const OpenClawTerminalDemo: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isInView, setIsInView] = useState(true)
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
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return
    }

    const node = rootRef.current
    if (!node) {
      return
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsInView(entry?.isIntersecting ?? true)
      },
      { threshold: 0.15 }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !isInView) {
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
  }, [isInView, prefersReducedMotion])

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
    <div
      ref={rootRef}
      className="flex h-full flex-col rounded-2xl border border-slate-700/80 bg-slate-900 p-4 shadow-2xl shadow-cyan-950/20 ring-1 ring-white/5 sm:p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-xs text-slate-400">OpenClaw CLI</span>
        <span className="ml-auto text-[11px] text-slate-500">Demo: {activeLabel}</span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
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
    </div>
  )
}
