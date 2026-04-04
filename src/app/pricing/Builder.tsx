"use client"

import type { FormEvent } from "react"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import type { AddOnKey, ConfigPayload } from "../contact/configSummary"

type PackageKey = Extract<ConfigPayload["selectedPackage"], "starter" | "groei">

type PackageDefinition = {
  key: PackageKey
  title: string
  priceEuro: number
  includedAgents: number
  fit: string
  subtitle: string
  leadTime: string
  support: string
  popular?: boolean
  bullets: string[]
}

type AddOnDefinition = {
  key: AddOnKey
  title: string
  fromEuro: number
  summary: string
  detail: string
  brandIcons?: Array<{
    label: string
    src: string
    hex: string
  }>
}

const CONFIG_STORAGE_KEY = "yaiw_config_v1"

const PACKAGES: PackageDefinition[] = [
  {
    key: "starter",
    title: "Starter",
    priceEuro: 1000,
    includedAgents: 1,
    fit: "Voor 1 afgebakende workflow",
    subtitle: "Start met één proces dat snel live moet en meetbaar resultaat kan geven.",
    leadTime: "Indicatie: 3-7 werkdagen na scope-akkoord en toegang",
    support: "2 weken break-fix na livegang",
    popular: true,
    bullets: [
      "1 productierijpe AI-agent voor 1 workflow",
      "Intake, scope en acceptatiecriteria",
      "Implementatie met 1-2 integraties",
      "Documentatie en handover",
      "Basis testen met realistische cases",
    ],
  },
  {
    key: "groei",
    title: "Groei",
    priceEuro: 2500,
    includedAgents: 3,
    fit: "Voor meerdere workflows tegelijk",
    subtitle: "Voor teams die in één traject meerdere processen willen implementeren.",
    leadTime: "Gefaseerde oplevering op basis van scope en afhankelijkheden",
    support: "4 weken break-fix na livegang",
    bullets: [
      "Tot 3 productierijpe AI-agents (3 workflows)",
      "Scope en acceptatiecriteria per workflow",
      "UAT met echte cases en edge cases",
      "2-5 integraties totaal (afhankelijk van workflows)",
      "Handover en korte beheertraining",
    ],
  },
]

const ADDONS: AddOnDefinition[] = [
  {
    key: "managed-provisioning",
    title: "Managed provisioning (mailbox/nummer)",
    fromEuro: 500,
    summary: "Wij regelen een dedicated mailbox en/of telefoonnummer.",
    detail: "Praktisch als je geen interne accounts of credentials wilt delen tijdens implementatie.",
    brandIcons: [
      { label: "Gmail", src: "/brands/gmail.svg", hex: "#EA4335" },
      { label: "WhatsApp", src: "/brands/whatsapp.svg", hex: "#25D366" },
    ],
  },
  {
    key: "ai-billing",
    title: "AI model + billing setup",
    fromEuro: 250,
    summary: "Sleutels, budgetlimieten en basis guardrails.",
    detail: "Voor een gecontroleerde start met duidelijke kostenafspraken.",
  },
  {
    key: "telegram",
    title: "Telegram setup",
    fromEuro: 250,
    summary: "Bot, routing en notificaties.",
    detail: "Geschikt voor intake- of supportflows via Telegram.",
    brandIcons: [{ label: "Telegram", src: "/brands/telegram.svg", hex: "#26A5E4" }],
  },
  {
    key: "whatsapp",
    title: "WhatsApp Business setup",
    fromEuro: 750,
    summary: "Provider setup, verificatie en templates.",
    detail: "Prijs hangt af van provider, nummerstatus en templaterouting.",
    brandIcons: [{ label: "WhatsApp", src: "/brands/whatsapp.svg", hex: "#25D366" }],
  },
  {
    key: "crm",
    title: "CRM integratie (HubSpot/Salesforce)",
    fromEuro: 750,
    summary: "Field mapping, logging en workflow triggers.",
    detail: "Definitieve scope hangt af van objecten, regels, rechten en foutafhandeling.",
    brandIcons: [
      { label: "HubSpot", src: "/brands/hubspot.svg", hex: "#FF7A59" },
      { label: "Salesforce", src: "/brands/salesforce.svg", hex: "#00A1E0" },
    ],
  },
  {
    key: "ticketing",
    title: "Ticketing (Jira/Zendesk)",
    fromEuro: 500,
    summary: "Triage, routing, tags en status updates.",
    detail: "Voor supportteams die intake en afhandeling willen versnellen zonder maatwerkportaal.",
  },
  {
    key: "security",
    title: "Security hardening (Tailscale + secrets)",
    fromEuro: 500,
    summary: "Toegang, secrets management en basis audit logging.",
    detail: "Inzetbaar wanneer extra governance of netwerkbeperking nodig is.",
  },
]

const TRUST_ITEMS = [
  "Vanafprijzen, geen vage pakketnamen",
  "Duidelijke scope in intake voordat we bouwen",
  "Third-party kosten altijd apart benoemd",
] as const

const NEXT_STEP_ITEMS = [
  "Kies pakket en optionele add-ons",
  "Start intake met je selectie als uitgangspunt",
  "Ontvang definitieve scope, planning en offerte",
] as const

const INTAKE_SCOPE_ITEMS = [
  "Workflow en gewenste uitkomst",
  "Beschikbare tools, toegangen en integraties",
  "Testcases en acceptatiecriteria",
  "Wat buiten scope blijft voor fase 1",
] as const

const currency = (value: number) =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value)

// Prefetch helper for intake flow (improves perceived performance)
const usePrefetchContact = (router: ReturnType<typeof useRouter>) => {
  useEffect(() => {
    router.prefetch("/contact")
  }, [router])
}

export const Builder = () => {
  const router = useRouter()
  usePrefetchContact(router)

  const [selectedPackage, setSelectedPackage] = useState<PackageKey>("starter")
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnKey[]>([])
  const [intakeOpen, setIntakeOpen] = useState(false)
  const [roiOpen, setRoiOpen] = useState(false)
  const [workEmail, setWorkEmail] = useState("")
  const [note, setNote] = useState("")
  const [emailsPerDay, setEmailsPerDay] = useState(40)
  const [leadsPerWeek, setLeadsPerWeek] = useState(15)
  const [ticketsPerWeek, setTicketsPerWeek] = useState(25)
  const [hourlyRateEuro, setHourlyRateEuro] = useState(65)

  useEffect(() => {
    if (!intakeOpen && !roiOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (roiOpen) {
          setRoiOpen(false)
          return
        }
        setIntakeOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [intakeOpen, roiOpen])

  const activePackage = useMemo(() => {
    return PACKAGES.find((pkg) => pkg.key === selectedPackage) ?? PACKAGES[0]
  }, [selectedPackage])

  const activeAddOns = useMemo(() => {
    return ADDONS.filter((addOn) => selectedAddOns.includes(addOn.key))
  }, [selectedAddOns])

  const totalFrom = useMemo(() => {
    return activePackage.priceEuro + activeAddOns.reduce((sum, item) => sum + item.fromEuro, 0)
  }, [activeAddOns, activePackage.priceEuro])

  const roiEstimate = useMemo(() => {
    const workDaysPerMonth = 22
    const weeksPerMonth = 4.33

    const emailMinutesSaved = emailsPerDay * workDaysPerMonth * 2
    const leadMinutesSaved = leadsPerWeek * weeksPerMonth * 10
    const ticketMinutesSaved = ticketsPerWeek * weeksPerMonth * 8

    const rawHoursSaved = (emailMinutesSaved + leadMinutesSaved + ticketMinutesSaved) / 60
    const realizedHoursSaved = rawHoursSaved * 0.35
    const grossSavingsPerMonth = realizedHoursSaved * hourlyRateEuro
    const netSavingsPerMonth = grossSavingsPerMonth * 0.9
    const paybackMonths = netSavingsPerMonth > 0 ? totalFrom / netSavingsPerMonth : null

    return {
      hoursSavedMonth: realizedHoursSaved,
      netSavingsMonth: netSavingsPerMonth,
      paybackMonths,
    }
  }, [emailsPerDay, hourlyRateEuro, leadsPerWeek, ticketsPerWeek, totalFrom])

  const toggleAddOn = (key: AddOnKey) => {
    setSelectedAddOns((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    )
  }

  const openIntake = () => {
    setIntakeOpen(true)
  }

  const openRoi = () => {
    setRoiOpen(true)
  }

  const handleIntakeSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const configPayload: ConfigPayload = {
      selectedPackage,
      selectedAddOns,
      volumes: {
        emailsPerDay: 0,
        leadsPerWeek: 0,
        ticketsPerWeek: 0,
      },
      hourlyRateEuro: 0,
      savedAtIso: new Date().toISOString(),
    }

    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configPayload))
    } catch {
      // ignore local storage failures
    }

    const params = new URLSearchParams()
    params.set("config", encodeURIComponent(JSON.stringify(configPayload)))
    params.set("intakeEmail", workEmail.trim())
    if (note.trim()) {
      params.set("intakeNote", note.trim())
    }

    router.push(`/contact?${params.toString()}`)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-start">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Prijzen & pakketten
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Kies een pakket, zie wat erbij hoort en start intake zonder verrassingen
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
              Deze pagina is bedoeld als duidelijk startpunt voor een done-for-you OpenClaw implementatie. Je
              kiest een pakket en optionele add-ons; daarna stemmen we in intake de exacte scope, planning en
              prijs af.
            </p>

            <ul className="mt-5 grid gap-2 sm:grid-cols-3">
              {TRUST_ITEMS.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-xs font-medium text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openIntake}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 motion-reduce:transition-none"
              >
                Plan intakegesprek
              </button>
              <button
                type="button"
                onClick={openRoi}
                className="rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-medium text-slate-900 transition-colors duration-200 hover:bg-white motion-reduce:transition-none"
              >
                Bekijk ROI-indicatie
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Volgende stap</p>
            <ol className="mt-4 space-y-3">
              {NEXT_STEP_ITEMS.map((item, index) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              Intake is voor scope-validatie. Definitieve offerte volgt pas na check van use case, toegangen en
              afhankelijkheden.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_360px]">
        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  1. Kies een pakket
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Kies op basis van aantal workflows. We houden de pakketten bewust simpel; uitzonderingen en
                  maatwerk bespreken we in de intake.
                </p>
              </div>
            </div>

            <div
              className="mt-6 grid gap-4 rounded-2xl bg-slate-100 p-2 sm:grid-cols-2"
              role="tablist"
              aria-label="Pakketten"
            >
              {PACKAGES.map((pkg) => {
                const isActive = pkg.key === selectedPackage
                return (
                  <button
                    key={pkg.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedPackage(pkg.key)}
                    className={`relative rounded-2xl border p-5 text-left transition-all duration-200 motion-reduce:transition-none ${
                      isActive
                        ? "border-slate-900 bg-white shadow-sm"
                        : "border-transparent bg-transparent hover:border-slate-200 hover:bg-white/70 motion-safe:hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-slate-900">{pkg.title}</p>
                          {pkg.popular ? (
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                              Populair
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-xs font-medium text-slate-500">{pkg.fit}</p>
                        <p className="mt-1 text-sm text-slate-600">{pkg.subtitle}</p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          isActive ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {pkg.includedAgents} agent{pkg.includedAgents > 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                      {currency(pkg.priceEuro)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">eenmalig, exclusief optionele add-ons</p>
                  </button>
                )
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Details van {activePackage.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{activePackage.leadTime}</p>
                </div>
                <p className="text-sm font-medium text-slate-700">{activePackage.support}</p>
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                {activePackage.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs leading-5 text-slate-600">
                Niet inbegrepen in pakketprijs: licentie- en usagekosten van tools/modellen van derden, extra
                maatwerk buiten de afgesproken workflow(s) en doorlopende optimalisatie buiten het pakket.
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  2. Voeg alleen toe wat nodig is
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Add-ons zijn optioneel. Je kunt accounts, sleutels en infrastructuur ook zelf aanleveren als
                  je dat intern wilt beheren.
                </p>
              </div>
              <p className="text-xs text-slate-500">Vanafprijzen per add-on, definitieve scope in intake</p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {ADDONS.map((addOn) => {
                const selected = selectedAddOns.includes(addOn.key)
                return (
                  <button
                    key={addOn.key}
                    type="button"
                    onClick={() => toggleAddOn(addOn.key)}
                    aria-pressed={selected}
                    className={`group rounded-2xl border p-5 text-left transition-all duration-200 motion-reduce:transition-none ${
                      selected
                        ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm motion-safe:hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex items-start gap-2">
                          {addOn.brandIcons && addOn.brandIcons.length > 0 ? (
                            <span className="flex items-center -space-x-1" aria-hidden="true">
                              {addOn.brandIcons.map((brandIcon) => (
                                <span
                                  key={`${addOn.key}-${brandIcon.label}`}
                                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm"
                                  style={{ backgroundColor: `${brandIcon.hex}14` }}
                                  title={brandIcon.label}
                                >
                                  <img src={brandIcon.src} alt="" className="h-4 w-4" loading="lazy" />
                                </span>
                              ))}
                            </span>
                          ) : null}
                          <p className="min-w-0 text-sm font-semibold leading-snug">{addOn.title}</p>
                        </div>
                        <p className={`mt-2 text-sm leading-5 ${selected ? "text-white/80" : "text-slate-600"}`}>
                          {addOn.summary}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          selected ? "bg-white text-slate-900" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        vanaf {currency(addOn.fromEuro)}
                      </span>
                    </div>
                    <p className={`mt-4 text-xs leading-5 ${selected ? "text-white/70" : "text-slate-500"}`}>
                      {addOn.detail}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium">
                      <span
                        className={`inline-flex h-4 w-4 items-center justify-center rounded border ${
                          selected
                            ? "border-white bg-white text-slate-900"
                            : "border-slate-300 bg-white text-transparent"
                        }`}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className={selected ? "text-white" : "text-slate-700"}>
                        {selected ? "Geselecteerd" : "Toevoegen"}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Waarom vanafprijzen?</p>
                <p className="mt-2 text-sm text-slate-600">
                  De werkelijke inzet hangt af van toegangen, datakwaliteit, uitzonderingen en gewenste
                  foutafhandeling. Daarom geven we hier een bruikbaar startpunt en maken we de scope in intake
                  concreet.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Snel ROI richting bepalen</p>
                <p className="mt-2 text-sm text-slate-600">
                  Gebruik de ROI-indicatie voor een eerste zakelijke inschatting op basis van volumes en
                  uurtarief. We rekenen bewust conservatief.
                </p>
                <button
                  type="button"
                  onClick={openRoi}
                  className="mt-3 text-sm font-medium text-slate-900 underline underline-offset-4"
                >
                  Open ROI-indicatie
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-slate-900 bg-slate-900 p-6 text-white shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Jouw startpunt</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{activePackage.title}</p>
                {activePackage.popular ? (
                  <span className="inline-flex items-center rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                    Populair
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-xs text-white/70">
                {activePackage.includedAgents} agent{activePackage.includedAgents > 1 ? "s" : ""} inbegrepen
              </p>
              <p className="mt-3 text-lg font-semibold">{currency(activePackage.priceEuro)}</p>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold">Geselecteerde add-ons</p>
              {activeAddOns.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {activeAddOns.map((addOn) => (
                    <li key={addOn.key} className="flex items-start justify-between gap-3 text-sm">
                      <span className="text-white/85">{addOn.title}</span>
                      <span className="whitespace-nowrap text-white">vanaf {currency(addOn.fromEuro)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-white/70">Geen add-ons geselecteerd.</p>
              )}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Totaal vanaf</p>
                  <p className="text-xs text-white/70">excl. third-party licenties/usage en extra maatwerk</p>
                </div>
                <p className="text-2xl font-bold tracking-tight">vanaf {currency(totalFrom)}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold">Wat gebeurt hierna?</p>
              <ol className="mt-3 space-y-2 text-sm text-white/80">
                {NEXT_STEP_ITEMS.map((item, index) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 text-[11px] font-semibold">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <button
              type="button"
              onClick={openIntake}
              className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:bg-slate-100 motion-reduce:transition-none"
            >
              Start intake met deze selectie
            </button>
            <p className="mt-3 text-xs leading-5 text-white/70">
              Je selectie wordt meegestuurd naar contact als intake-startpunt. Definitieve prijs volgt na scope,
              toegang en validatie van use cases.
            </p>
          </div>
        </aside>
      </div>

      {intakeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 px-4 py-4 sm:items-center sm:py-8"
          onClick={() => setIntakeOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-intake-title"
            className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:max-h-[calc(100vh-4rem)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Start intake</p>
                <h2 id="pricing-intake-title" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  Stuur je selectie door
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  We nemen je pakket en add-ons mee als uitgangspunt voor het gesprek. Vul je zakelijke e-mail
                  in en voeg eventueel context toe over de workflow.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIntakeOpen(false)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                aria-label="Sluiten"
              >
                Sluit
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                {activePackage.title} + {activeAddOns.length} add-on{activeAddOns.length === 1 ? "" : "s"}
              </p>
              <p className="mt-1 text-sm text-slate-600">Totaal vanaf {currency(totalFrom)}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">We stemmen in intake af:</p>
              <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                {INTAKE_SCOPE_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleIntakeSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="work-email" className="block text-sm font-medium text-slate-700">
                  Werk e-mail *
                </label>
                <input
                  id="work-email"
                  type="email"
                  required
                  value={workEmail}
                  onChange={(event) => setWorkEmail(event.target.value)}
                  placeholder="naam@bedrijf.nl"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label htmlFor="intake-note" className="block text-sm font-medium text-slate-700">
                  Opmerking (optioneel)
                </label>
                <textarea
                  id="intake-note"
                  rows={4}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Bijvoorbeeld: we willen starten met support-intake en koppeling met HubSpot."
                  className="mt-1 w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIntakeOpen(false)}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 motion-reduce:transition-none"
                >
                  Ga naar contactformulier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {roiOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 px-4 py-4 sm:items-center sm:py-8"
          onClick={() => setRoiOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-roi-title"
            className="max-h-[calc(100vh-2rem)] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:max-h-[calc(100vh-4rem)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">ROI indicatie</p>
                <h2 id="pricing-roi-title" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  Richting voor impact en terugverdientijd
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  Pas volumes en uurtarief aan voor een snelle indicatie. We gebruiken conservatieve aannames om
                  overschatting te voorkomen; dit is geen garantie of formele businesscase.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRoiOpen(false)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                aria-label="Sluiten"
              >
                Sluit
              </button>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-900">Emails per dag</span>
                    <span className="text-sm font-semibold text-slate-900">{emailsPerDay}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={500}
                    step={5}
                    value={emailsPerDay}
                    onChange={(event) => setEmailsPerDay(Number(event.target.value))}
                    className="mt-3 w-full accent-slate-900"
                  />
                </label>

                <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-900">Leads per week</span>
                    <span className="text-sm font-semibold text-slate-900">{leadsPerWeek}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={300}
                    step={5}
                    value={leadsPerWeek}
                    onChange={(event) => setLeadsPerWeek(Number(event.target.value))}
                    className="mt-3 w-full accent-slate-900"
                  />
                </label>

                <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-900">Tickets per week</span>
                    <span className="text-sm font-semibold text-slate-900">{ticketsPerWeek}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={500}
                    step={5}
                    value={ticketsPerWeek}
                    onChange={(event) => setTicketsPerWeek(Number(event.target.value))}
                    className="mt-3 w-full accent-slate-900"
                  />
                </label>

                <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-900">Uurtarief</span>
                    <span className="text-sm font-semibold text-slate-900">{currency(hourlyRateEuro)}</span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={250}
                    step={5}
                    value={hourlyRateEuro}
                    onChange={(event) => setHourlyRateEuro(Number(event.target.value))}
                    className="mt-3 w-full accent-slate-900"
                  />
                </label>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Directionele uitkomst</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Conservatieve aannames: beperkte adoptie en alleen direct meetbare tijdswinst.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                      Uren bespaard / maand
                    </p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                      {roiEstimate.hoursSavedMonth.toFixed(1)} uur
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                      Netto besparing / maand
                    </p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                      {currency(Math.round(roiEstimate.netSavingsMonth))}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                      Terugverdientijd
                    </p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                      {roiEstimate.paybackMonths ? `${roiEstimate.paybackMonths.toFixed(1)} maanden` : "n.v.t."}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Gebaseerd op totaal vanaf {currency(totalFrom)}</p>
                  </div>
                </div>

                <p className="mt-5 text-xs leading-5 text-slate-500">
                  Indicatie: resultaten hangen af van workflowontwerp, adoptie en kwaliteit van inputdata.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setRoiOpen(false)}
                    className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Sluit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRoiOpen(false)
                      openIntake()
                    }}
                    className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 motion-reduce:transition-none"
                  >
                    Gebruik als intake-startpunt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
