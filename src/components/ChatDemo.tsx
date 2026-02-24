"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import {
  HOMEPAGE_SCENARIOS,
  type BubbleTone,
  type DashboardDemoScenario,
} from "./demoScenarios"

type AnimationState = {
  scenarioIndex: number
  revealedCount: number
  phase: "reveal" | "hold" | "fade"
  ticksLeft: number
}

type ChatLine = {
  id: string
  tone: BubbleTone
  label?: string
  text?: string
  kind?: "message" | "forwarded-email"
  emailSubject?: string
  emailPreview?: string
}

const TICK_MS = 100
const REVEAL_GAP_TICKS = 10
const HOLD_TICKS = 70
const FADE_TICKS = 10

interface ChatDemoProps {
  scenarios?: DashboardDemoScenario[]
  demoTitle?: string
}

type AppSkin = {
  appName: "WhatsApp" | "Telegram"
  appIcon: string
  accent: string
  accentSoft: string
  userBubble: string
}

const CHANNEL_BRANDS: Record<string, string> = {
  whatsapp: "/brands/whatsapp.svg",
  telegram: "/brands/telegram.svg",
  gmail: "/brands/gmail.svg",
  "google calendar": "/brands/google-calendar.svg",
  slack: "/brands/slack.svg",
  hubspot: "/brands/hubspot.svg",
  salesforce: "/brands/salesforce.svg",
  zapier: "/brands/zapier.svg",
}

const pickAppSkin = (scenario: DashboardDemoScenario): AppSkin => {
  const key = scenario.channel.toLowerCase()

  if (key.includes("whatsapp")) {
    return {
      appName: "WhatsApp",
      appIcon: "/brands/whatsapp.svg",
      accent: "text-emerald-700",
      accentSoft: "bg-emerald-50 border-emerald-200",
      userBubble: "bg-emerald-500 border-emerald-400/70 text-white",
    }
  }

  if (key.includes("telegram")) {
    return {
      appName: "Telegram",
      appIcon: "/brands/telegram.svg",
      accent: "text-sky-700",
      accentSoft: "bg-sky-50 border-sky-200",
      userBubble: "bg-sky-500 border-sky-400/70 text-white",
    }
  }

  const preferWhatsApp =
    scenario.title.toLowerCase().includes("support") || scenario.channel.toLowerCase().includes("slack")

  return preferWhatsApp
    ? {
        appName: "WhatsApp",
        appIcon: "/brands/whatsapp.svg",
        accent: "text-emerald-700",
        accentSoft: "bg-emerald-50 border-emerald-200",
        userBubble: "bg-emerald-500 border-emerald-400/70 text-white",
      }
    : {
        appName: "Telegram",
        appIcon: "/brands/telegram.svg",
        accent: "text-sky-700",
        accentSoft: "bg-sky-50 border-sky-200",
        userBubble: "bg-sky-500 border-sky-400/70 text-white",
      }
}

const getChannelIcon = (channel: string) => {
  const key = channel.toLowerCase()
  return Object.entries(CHANNEL_BRANDS).find(([brand]) => key.includes(brand))?.[1] ?? null
}

const createChatLines = (scenario: DashboardDemoScenario): ChatLine[] => {
  const lines: ChatLine[] = []
  const isInboxTriage =
    scenario.title.toLowerCase().includes("inbox") || scenario.channel.toLowerCase().includes("gmail")

  if (isInboxTriage) {
    lines.push({
      id: `${scenario.title}-forwarded`,
      tone: "user",
      kind: "forwarded-email",
      label: "Doorgestuurd uit inbox",
      emailSubject: "Offerteaanvraag: 40 seats + onboarding in maart",
      emailPreview:
        "Hoi team, we zoeken AI-automatisering voor support en sales. Kunnen jullie een voorstel delen?",
    })
  }

  scenario.bubbles.forEach((bubble, index) => {
    lines.push({
      id: `${scenario.title}-${index}`,
      tone: bubble.tone,
      label: bubble.label,
      text: bubble.text,
      kind: "message",
    })
  })

  return lines
}

const bubbleClassForTone = (tone: BubbleTone, skin: AppSkin) => {
  if (tone === "user") {
    return `ml-auto ${skin.userBubble}`
  }

  if (tone === "meta") {
    return "mr-auto bg-amber-50 border-amber-200 text-amber-950"
  }

  return "mr-auto bg-white border-slate-200 text-slate-900"
}

export const ChatDemo: React.FC<ChatDemoProps> = ({
  scenarios = HOMEPAGE_SCENARIOS,
  demoTitle = "OpenClaw Assist",
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const [animation, setAnimation] = useState<AnimationState>({
    scenarioIndex: 0,
    revealedCount: 0,
    phase: "reveal",
    ticksLeft: 0,
  })

  const activeScenarios = scenarios.length > 0 ? scenarios : HOMEPAGE_SCENARIOS

  useEffect(() => {
    setAnimation({
      scenarioIndex: 0,
      revealedCount: 0,
      phase: "reveal",
      ticksLeft: 0,
    })
  }, [activeScenarios])

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
      { threshold: 0.15 },
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
        const scenario = activeScenarios[current.scenarioIndex] ?? activeScenarios[0]
        const lines = createChatLines(scenario)
        const totalSteps = lines.length + 1

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
            scenarioIndex: (current.scenarioIndex + 1) % activeScenarios.length,
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
  }, [activeScenarios, isInView, prefersReducedMotion])

  const scenario =
    (prefersReducedMotion ? activeScenarios[0] : activeScenarios[animation.scenarioIndex]) ?? activeScenarios[0]
  const chatLines = useMemo(() => createChatLines(scenario), [scenario])
  const revealCount = prefersReducedMotion ? chatLines.length + 1 : animation.revealedCount
  const visibleLines = chatLines.slice(0, Math.min(revealCount, chatLines.length))
  const showResult = revealCount > chatLines.length
  const skin = pickAppSkin(scenario)
  const fadeOpacity =
    !prefersReducedMotion && animation.phase === "fade"
      ? Math.max(0, animation.ticksLeft / FADE_TICKS)
      : 1

  const channelIcon = getChannelIcon(scenario.channel)

  return (
    <div
      ref={rootRef}
      className="h-full min-h-[24rem] rounded-2xl border border-slate-200/20 bg-slate-950/70 p-2 shadow-2xl shadow-black/30 ring-1 ring-white/10 sm:min-h-[26rem] sm:p-3"
    >
      <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%),linear-gradient(180deg,#17212b,#0f172a)] p-2 sm:p-3">
        <div
          className="flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-slate-200/80 bg-[#e5ddd5] shadow-xl transition-opacity duration-200"
          style={{ opacity: fadeOpacity }}
        >
          <div className="relative overflow-hidden border-b border-black/5 bg-gradient-to-r from-slate-900 to-slate-800 px-3 py-2.5 text-white sm:px-4">
            <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:14px_14px]" />
            <div className="relative flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                <img src={skin.appIcon} alt="" aria-hidden="true" className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{demoTitle}</p>
                <p className="truncate text-[11px] text-white/70">{skin.appName} flow demo</p>
              </div>
              <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/90 ring-1 ring-white/10">
                online
              </span>
            </div>
          </div>

          <div className="flex min-h-[2.5rem] items-center gap-1.5 border-b border-black/5 bg-white/80 px-3 py-2 backdrop-blur sm:px-4">
            {activeScenarios.map((item, index) => {
              const active = item.title === scenario.title
              return (
                <span
                  key={item.title}
                  className={`max-w-[9rem] truncate rounded-full px-2 py-0.5 text-[10px] font-medium sm:max-w-[10.5rem] ${
                    active
                      ? `${skin.accentSoft} ${skin.accent}`
                      : "border border-slate-200 bg-white text-slate-500"
                  }`}
                  aria-label={`Scenario ${index + 1}: ${item.title}`}
                  title={item.title}
                >
                  {item.title}
                </span>
              )
            })}
          </div>

          <div className="flex min-h-0 flex-1 flex-col bg-[#e5ddd5]">
            <div className="flex items-center gap-2 border-b border-black/5 bg-white/75 px-3 py-2 text-[11px] text-slate-600 backdrop-blur sm:px-4">
              {channelIcon ? <img src={channelIcon} alt="" aria-hidden="true" className="h-3.5 w-3.5" /> : null}
              <span className="truncate font-medium text-slate-700">{scenario.channel}</span>
              <span className="text-slate-400">•</span>
              <span className="truncate">{scenario.status}</span>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden px-3 py-3 sm:px-4">
              <div className="flex h-full flex-col">
                <div className="min-h-0 flex-1 space-y-2 overflow-hidden">
                  {visibleLines.map((line, index) => {
                    const timeLabel = `09:${String(41 + index).padStart(2, "0")}`

                    if (line.kind === "forwarded-email") {
                      return (
                        <div
                          key={line.id}
                          className={`ml-auto max-w-[92%] rounded-2xl border p-2 shadow-sm ${skin.userBubble}`}
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/80">
                            {line.label}
                          </p>
                          <div className="mt-1.5 rounded-xl border border-white/20 bg-white/15 p-2">
                            <div className="flex items-center gap-2 text-[10px] text-white/90">
                              <img
                                src="/brands/gmail.svg"
                                alt=""
                                aria-hidden="true"
                                className="h-3.5 w-3.5 shrink-0"
                              />
                              <span className="truncate font-medium">{line.emailSubject}</span>
                            </div>
                            <p className="mt-1 text-[11px] leading-relaxed text-white/95">
                              {line.emailPreview}
                            </p>
                          </div>
                          <p className="mt-1 text-right text-[10px] text-white/70">{timeLabel}</p>
                        </div>
                      )
                    }

                    return (
                      <div
                        key={line.id}
                        className={`max-w-[92%] rounded-2xl border px-3 py-2 shadow-sm ${bubbleClassForTone(
                          line.tone,
                          skin,
                        )}`}
                      >
                        {line.label ? (
                          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide opacity-70">
                            {line.label}
                          </p>
                        ) : null}
                        <p className="text-xs leading-relaxed sm:text-sm">{line.text}</p>
                        <p
                          className={`mt-1 text-right text-[10px] ${
                            line.tone === "user" ? "text-white/75" : "text-slate-400"
                          }`}
                        >
                          {timeLabel}
                        </p>
                      </div>
                    )
                  })}

                  {!prefersReducedMotion && animation.phase === "reveal" && revealCount <= chatLines.length ? (
                    <div className="inline-flex w-fit items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-500 shadow-sm">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 motion-reduce:hidden" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-300 [animation-delay:120ms] motion-reduce:hidden" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-200 [animation-delay:240ms] motion-reduce:hidden" />
                      Agent typt...
                    </div>
                  ) : null}
                </div>

                <div className="mt-3 shrink-0 rounded-2xl border border-slate-200 bg-white/90 p-2.5 shadow-sm backdrop-blur">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Resultaat
                  </p>
                  <p
                    className={`mt-1 min-h-[2.75rem] text-xs leading-relaxed text-slate-900 transition-opacity duration-200 sm:text-sm ${
                      showResult ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {scenario.resultaat}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex min-h-[3rem] items-center gap-2 border-t border-black/5 bg-white/85 px-3 py-2 text-xs text-slate-500 backdrop-blur sm:px-4">
              <div className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-400">
                Bericht sturen...
              </div>
              <button
                type="button"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border ${skin.accentSoft}`}
                aria-label="Send disabled demo button"
                disabled
              >
                <span className={`text-sm font-semibold ${skin.accent}`}>+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

