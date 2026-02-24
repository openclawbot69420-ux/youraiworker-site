"use client"

import { useEffect, useMemo, useState } from "react"

type TerminalLine = {
  text: string
  tone: "user" | "command" | "success" | "event" | "result"
}

type DemoScenario = {
  label: string
  lines: TerminalLine[]
}

const SCENARIOS_BY_SLUG: Record<string, DemoScenario[]> = {
  gmail: [
    {
      label: "Inbox triage",
      lines: [
        { text: 'User> "Nieuwe offerte-mails eerst, de rest later"', tone: "user" },
        { text: 'event:gmail -> Nieuwe mail: "Prijsindicatie voor 25 accounts"', tone: "event" },
        { text: "$ openclaw agent run inbox-triage --source gmail", tone: "command" },
        { text: "✓ Geclassificeerd: Sales lead (prio hoog)", tone: "success" },
        { text: "→ Labels gezet: Sales / Vandaag behandelen", tone: "result" },
        { text: "✓ Concept antwoord klaar voor review", tone: "success" },
      ],
    },
    {
      label: "Follow-up reminder",
      lines: [
        { text: 'User> "Herinner me als er 2 dagen geen reactie is"', tone: "user" },
        { text: "event:gmail -> Thread stil sinds 48u", tone: "event" },
        { text: "$ openclaw workflow trigger follow-up --channel gmail", tone: "command" },
        { text: "→ Vorige context geladen (deal: onboarding Q2)", tone: "result" },
        { text: "✓ Follow-up draft gemaakt in dezelfde thread", tone: "success" },
      ],
    },
    {
      label: "Email naar taak",
      lines: [
        { text: 'User> "Maak van bugmeldingen direct taken"', tone: "user" },
        { text: 'event:gmail -> Mail: "Login faalt op mobiel (urgent)"', tone: "event" },
        { text: "$ openclaw agent run email-to-task --source gmail", tone: "command" },
        { text: "✓ Samenvatting gemaakt + severity=high", tone: "success" },
        { text: "✓ Taak aangemaakt in backlog met link naar thread", tone: "success" },
      ],
    },
  ],
  "google-calendar": [
    {
      label: "Meeting plannen",
      lines: [
        { text: 'User> "Plan een kennismaking van 30 min volgende week"', tone: "user" },
        { text: "event:gcal -> Beschikbaarheid ophalen (ma-vr, 09:00-17:00)", tone: "event" },
        { text: "$ openclaw agent run schedule-meeting --calendar google", tone: "command" },
        { text: "→ 4 opties gevonden met 15 min buffer", tone: "result" },
        { text: "✓ Voorstelmail voorbereid met 4 tijdsloten", tone: "success" },
      ],
    },
    {
      label: "Verzetten en bevestigen",
      lines: [
        { text: 'User> "Klant wil verzetten naar donderdagmiddag"', tone: "user" },
        { text: "event:gcal -> Event gevonden: Demo call / woensdag 10:00", tone: "event" },
        { text: "$ openclaw workflow run reschedule --provider google-calendar", tone: "command" },
        { text: "✓ Nieuw slot gereserveerd: do 14:30", tone: "success" },
        { text: "✓ Uitnodiging + bevestiging verstuurd", tone: "success" },
      ],
    },
  ],
  whatsapp: [
    {
      label: "Support intake",
      lines: [
        { text: 'User> "Beantwoord FAQ, escaleren bij factuurvragen"', tone: "user" },
        { text: "event:whatsapp -> Inbound: 'Ik zie factuur 1049 niet'", tone: "event" },
        { text: "$ openclaw agent run whatsapp-support --kb faq", tone: "command" },
        { text: "✓ Intent herkend: billing / factuurvraag", tone: "success" },
        { text: "→ Ontbrekende info gevraagd: klantnummer", tone: "result" },
        { text: "✓ Escalatie voorbereid voor finance team", tone: "success" },
      ],
    },
    {
      label: "Lead intake",
      lines: [
        { text: 'User> "Kwalificeer leads met 3 korte vragen"', tone: "user" },
        { text: "event:whatsapp -> Nieuwe lead: 'Interesse in automatisering'", tone: "event" },
        { text: "$ openclaw agent run lead-qualifier --channel whatsapp", tone: "command" },
        { text: "→ Vragen gestuurd: teamgrootte, use case, timing", tone: "result" },
        { text: "✓ Leadscore berekend: 82/100", tone: "success" },
        { text: "✓ Doorgezet naar sales met samenvatting", tone: "success" },
      ],
    },
  ],
  slack: [
    {
      label: "Approval flow",
      lines: [
        { text: 'User> "Laat purchase requests in #finance-approvals landen"', tone: "user" },
        { text: "event:slack -> Nieuwe aanvraag in #ops: software budget", tone: "event" },
        { text: "$ openclaw workflow run approval-router --channel slack", tone: "command" },
        { text: "→ Context toegevoegd: bedrag, owner, deadline", tone: "result" },
        { text: "✓ Approval thread gestart in #finance-approvals", tone: "success" },
      ],
    },
    {
      label: "Helpdesk triage",
      lines: [
        { text: 'User> "IT-vragen eerst labelen en prioriteren"', tone: "user" },
        { text: "event:slack -> #help-it: 'VPN werkt niet sinds update'", tone: "event" },
        { text: "$ openclaw agent run helpdesk-triage --source slack", tone: "command" },
        { text: "✓ Categorie: IT / Toegang", tone: "success" },
        { text: "✓ Prioriteit: P2 + intakevraag gestuurd", tone: "success" },
      ],
    },
  ],
  zapier: [
    {
      label: "Lead naar sheet",
      lines: [
        { text: 'User> "Nieuwe form leads naar Google Sheet + Slack alert"', tone: "user" },
        { text: "event:zapier -> Trigger ontvangen: Typeform submission", tone: "event" },
        { text: "$ openclaw workflow run zapier-bridge --trigger zapier", tone: "command" },
        { text: "→ Payload gevalideerd (naam, email, use-case)", tone: "result" },
        { text: "✓ Row toegevoegd in Google Sheet", tone: "success" },
        { text: "✓ Alert gepost in #sales-intake", tone: "success" },
      ],
    },
    {
      label: "MVP notificaties",
      lines: [
        { text: 'User> "Gebruik Zapier voor snelle MVP-koppeling"', tone: "user" },
        { text: "event:zapier -> Action chain gestart (3 stappen)", tone: "event" },
        { text: "$ openclaw agent run mvp-ops --via zapier", tone: "command" },
        { text: "✓ Stap 1-3 uitgevoerd zonder errors", tone: "success" },
        { text: "→ Run gelogd met latency 2.4s", tone: "result" },
      ],
    },
  ],
  salesforce: [
    {
      label: "Lead routing",
      lines: [
        { text: 'User> "Routeer enterprise leads direct naar AE team"', tone: "user" },
        { text: "event:salesforce -> Nieuwe lead: company_size=350", tone: "event" },
        { text: "$ openclaw agent run lead-routing --crm salesforce", tone: "command" },
        { text: "✓ Segment bepaald: Enterprise", tone: "success" },
        { text: "✓ Owner toegewezen: AE Benelux", tone: "success" },
        { text: "→ Task aangemaakt: opvolgen binnen 24u", tone: "result" },
      ],
    },
    {
      label: "Activity logging",
      lines: [
        { text: 'User> "Log meetings en mails automatisch in CRM"', tone: "user" },
        { text: "event:salesforce -> Opportunity update binnen pipeline", tone: "event" },
        { text: "$ openclaw workflow sync activity-log --target salesforce", tone: "command" },
        { text: "✓ Email thread gekoppeld aan opportunity", tone: "success" },
        { text: "✓ Laatste meeting-samenvatting opgeslagen", tone: "success" },
      ],
    },
  ],
}

const FALLBACK_SCENARIOS = (integrationName: string): DemoScenario[] => [
  {
    label: "Koppeling testen",
    lines: [
      { text: `User> "Test de ${integrationName} koppeling met een veilige proefrun"`, tone: "user" },
      { text: `event:${integrationName.toLowerCase()} -> Testevent ontvangen`, tone: "event" },
      { text: `$ openclaw workflow run smoke-test --integration "${integrationName}"`, tone: "command" },
      { text: "✓ Authenticatie ok", tone: "success" },
      { text: "✓ Testactie uitgevoerd en gelogd", tone: "success" },
    ],
  },
  {
    label: "Automatisering uitvoeren",
    lines: [
      { text: 'User> "Voer de workflow uit op een echte case"', tone: "user" },
      { text: "event:workflow -> Nieuwe input beschikbaar", tone: "event" },
      { text: `$ openclaw agent run automation --integration "${integrationName}"`, tone: "command" },
      { text: "→ Validatie en mapping uitgevoerd", tone: "result" },
      { text: "✓ Output verwerkt + status gelogd", tone: "success" },
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

interface IntegrationTerminalDemoProps {
  integrationSlug: string
  integrationName: string
}

export const IntegrationTerminalDemo: React.FC<IntegrationTerminalDemoProps> = ({
  integrationSlug,
  integrationName,
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [animation, setAnimation] = useState<AnimationState>({
    scenarioIndex: 0,
    lineIndex: 0,
    charIndex: 0,
    pauseTicks: 0,
    phase: "typing",
    phaseTicks: 0,
  })

  const scenarios = useMemo(
    () => SCENARIOS_BY_SLUG[integrationSlug] ?? FALLBACK_SCENARIOS(integrationName),
    [integrationName, integrationSlug],
  )

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
    setAnimation({
      scenarioIndex: 0,
      lineIndex: 0,
      charIndex: 0,
      pauseTicks: 0,
      phase: "typing",
      phaseTicks: 0,
    })
  }, [scenarios])

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
            scenarioIndex: (current.scenarioIndex + 1) % scenarios.length,
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

        const scenarioLines = scenarios[current.scenarioIndex]?.lines ?? []

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
  }, [prefersReducedMotion, scenarios])

  const scenario = scenarios[animation.scenarioIndex] ?? scenarios[0]
  const scenarioLines = scenario.lines
  const visibleLines = prefersReducedMotion ? scenarios[0].lines : scenarioLines.slice(0, animation.lineIndex)
  const currentLine = prefersReducedMotion ? null : scenarioLines[animation.lineIndex]
  const currentText = currentLine ? currentLine.text.slice(0, animation.charIndex) : ""
  const activeLabel = prefersReducedMotion ? scenarios[0].label : scenario.label
  const fadeOpacity = animation.phase === "fading" ? Math.max(0, animation.phaseTicks / FADE_TICKS) : 1

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
        <span className="ml-auto text-[11px] text-slate-500">
          Demo: {integrationName} · {activeLabel}
        </span>
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

