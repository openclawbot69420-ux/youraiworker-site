"use client"

import { useEffect, useState } from "react"

type TerminalLine = {
  text: string
  tone: "command" | "success" | "event" | "result"
}

const TERMINAL_LINES: TerminalLine[] = [
  { text: "$ openclaw agent create --name inbox-triage", tone: "command" },
  { text: '✓ Agent "inbox-triage" aangemaakt', tone: "success" },
  { text: "", tone: "event" },
  { text: "$ openclaw integrate gmail --scope readonly", tone: "command" },
  { text: "✓ Gmail verbonden (read-only)", tone: "success" },
  { text: "", tone: "event" },
  { text: "$ openclaw integrate google-sheets --scope readwrite", tone: "command" },
  { text: "✓ Google Sheets verbonden", tone: "success" },
  { text: "", tone: "event" },
  { text: "$ openclaw agent deploy --live", tone: "command" },
  { text: "✓ Agent live! Monitoring ingeschakeld.", tone: "success" },
  { text: "", tone: "event" },
  { text: 'Nieuwe mail: "Offerte aanvraag — Bedrijf X"', tone: "event" },
  { text: "→ Gecategoriseerd: Sales lead (hoge prioriteit)", tone: "result" },
  { text: "→ Concept-antwoord opgesteld", tone: "result" },
  { text: "→ Toegevoegd aan CRM pipeline", tone: "result" },
]

const LINE_PAUSE_TICKS = 16

type AnimationState = {
  lineIndex: number
  charIndex: number
  pauseTicks: number
}

export const OpenClawTerminalDemo: React.FC = () => {
  const [animation, setAnimation] = useState<AnimationState>({
    lineIndex: 0,
    charIndex: 0,
    pauseTicks: 0,
  })

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setAnimation((current) => {
        if (current.lineIndex >= TERMINAL_LINES.length) {
          return current
        }

        if (current.pauseTicks > 0) {
          return { ...current, pauseTicks: current.pauseTicks - 1 }
        }

        const line = TERMINAL_LINES[current.lineIndex]

        if (current.charIndex < line.text.length) {
          return { ...current, charIndex: current.charIndex + 1 }
        }

        return {
          lineIndex: current.lineIndex + 1,
          charIndex: 0,
          pauseTicks: line.text.length === 0 ? 6 : LINE_PAUSE_TICKS,
        }
      })
    }, 35)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const visibleLines = TERMINAL_LINES.slice(0, animation.lineIndex)
  const currentLine = TERMINAL_LINES[animation.lineIndex]
  const currentText = currentLine ? currentLine.text.slice(0, animation.charIndex) : ""

  const lineClassName = (tone: TerminalLine["tone"]) => {
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
      </div>

      <div className="space-y-1 font-mono text-xs leading-6 sm:text-sm">
        {visibleLines.map((line, index) => (
          <p key={`${line.text}-${index}`} className={`whitespace-pre-wrap ${lineClassName(line.tone)}`}>
            {line.text || "\u00A0"}
          </p>
        ))}

        {currentLine ? (
          <p className={`whitespace-pre-wrap ${lineClassName(currentLine.tone)}`}>
            {currentText}
            <span aria-hidden="true" className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-cyan-300 align-middle" />
          </p>
        ) : (
          <p className="text-slate-400">
            <span aria-hidden="true" className="inline-block h-4 w-2 animate-pulse bg-cyan-300 align-middle" />
          </p>
        )}
      </div>
    </div>
  )
}
