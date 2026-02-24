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
  subtitle: string
  leadTime: string
  support: string
  bullets: string[]
}

type AddOnDefinition = {
  key: AddOnKey
  title: string
  fromEuro: number
  summary: string
  detail: string
}

const CONFIG_STORAGE_KEY = "yaiw_config_v1"

const PACKAGES: PackageDefinition[] = [
  {
    key: "starter",
    title: "Starter",
    priceEuro: 1000,
    includedAgents: 1,
    subtitle: "Voor 1 duidelijke workflow met snelle livegang.",
    leadTime: "Vaak 3 tot 7 werkdagen",
    support: "2 weken break-fix support",
    bullets: [
      "1 production-ready AI-agent (1 workflow)",
      "Intake en scopebepaling",
      "Implementatie met 1 tot 2 integraties",
      "Documentatie en handover",
      "48 uur warranty na livegang",
    ],
  },
  {
    key: "groei",
    title: "Groei",
    priceEuro: 2500,
    includedAgents: 3,
    subtitle: "Voor teams die meerdere workflows tegelijk willen uitrollen.",
    leadTime: "Gefaseerde oplevering op scope",
    support: "4 weken break-fix support",
    bullets: [
      "3 production-ready AI-agents (3 workflows)",
      "Scope en acceptatiecriteria per workflow",
      "UAT met echte cases en edge cases",
      "Integraties waar het telt (2 tot 5 totaal)",
      "Handover en korte beheertraining",
    ],
  },
]

const ADDONS: AddOnDefinition[] = [
  {
    key: "managed-provisioning",
    title: "Managed provisioning (mailbox/nummer)",
    fromEuro: 500,
    summary: "Wij regelen een dedicated mailbox en of telefoonnummer.",
    detail: "Praktisch als je geen interne credentials wil delen tijdens implementatie.",
  },
  {
    key: "ai-billing",
    title: "AI model + billing setup",
    fromEuro: 250,
    summary: "Keys, budget limits en basis guardrails.",
    detail: "Voor een nette start met duidelijke billing en basisafspraken.",
  },
  {
    key: "telegram",
    title: "Telegram setup",
    fromEuro: 250,
    summary: "Bot, routing en notificaties.",
    detail: "Geschikt voor intake of support flows via Telegram.",
  },
  {
    key: "whatsapp",
    title: "WhatsApp Business setup",
    fromEuro: 750,
    summary: "Provider setup, verificatie en templates.",
    detail: "Prijs hangt af van provider, nummerstatus en template flow.",
  },
  {
    key: "crm",
    title: "CRM integratie (HubSpot/Salesforce)",
    fromEuro: 750,
    summary: "Field mapping, logging en workflow triggers.",
    detail: "Definitieve scope hangt af van objecten, regels en foutafhandeling.",
  },
  {
    key: "ticketing",
    title: "Ticketing (Jira/Zendesk)",
    fromEuro: 500,
    summary: "Triage, routing, tags en status updates.",
    detail: "Voor supportteams die intake en afhandeling willen versnellen.",
  },
  {
    key: "security",
    title: "Security hardening (Tailscale + secrets)",
    fromEuro: 500,
    summary: "Toegang, secrets management en basis audit logging.",
    detail: "Inzetbaar wanneer extra governance of netwerkbeperking nodig is.",
  },
]

const currency = (value: number) =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value)

export const Builder = () => {
  const router = useRouter()

  const [selectedPackage, setSelectedPackage] = useState<PackageKey>("starter")
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnKey[]>([])
  const [intakeOpen, setIntakeOpen] = useState(false)
  const [workEmail, setWorkEmail] = useState("")
  const [note, setNote] = useState("")

  useEffect(() => {
    if (!intakeOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIntakeOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [intakeOpen])

  const activePackage = useMemo(() => {
    return PACKAGES.find((pkg) => pkg.key === selectedPackage) ?? PACKAGES[0]
  }, [selectedPackage])

  const activeAddOns = useMemo(() => {
    return ADDONS.filter((addOn) => selectedAddOns.includes(addOn.key))
  }, [selectedAddOns])

  const totalFrom = useMemo(() => {
    return activePackage.priceEuro + activeAddOns.reduce((sum, item) => sum + item.fromEuro, 0)
  }, [activeAddOns, activePackage.priceEuro])

  const toggleAddOn = (key: AddOnKey) => {
    setSelectedAddOns((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    )
  }

  const openIntake = () => {
    setIntakeOpen(true)
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
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Pricing Builder
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Stel je package samen en start intake met een duidelijke uitgangspositie
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
              Kies een basispakket en selecteer alleen de add-ons die nodig zijn voor jouw implementatie.
              Prijzen zijn vanaf prijzen. Definitieve scope en planning bepalen we tijdens intake.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openIntake}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Start intake
            </button>
            <a
              href="/configure"
              className="rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-medium text-slate-900 transition-colors hover:bg-white"
            >
              Open configurator
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_360px]">
        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  1) Kies package
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Twee duidelijke opties voor snelle start of bredere uitrol. Maatwerk scopen we apart in
                  intake.
                </p>
              </div>
            </div>

            <div
              className="mt-6 grid gap-4 rounded-2xl bg-slate-100 p-2 sm:grid-cols-2"
              role="tablist"
              aria-label="Packages"
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
                    className={`rounded-2xl border p-5 text-left transition-all ${
                      isActive
                        ? "border-slate-900 bg-white shadow-sm"
                        : "border-transparent bg-transparent hover:border-slate-200 hover:bg-white/70"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{pkg.title}</p>
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
                  <p className="text-sm font-semibold text-slate-900">{activePackage.title} details</p>
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
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  2) Voeg add-ons toe
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Selecteer alleen wat nodig is. Je kunt toegang en accounts ook zelf aanleveren.
                </p>
              </div>
              <p className="text-xs text-slate-500">Prijzen zijn vanaf en afhankelijk van scope</p>
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
                    className={`group rounded-2xl border p-5 text-left transition-all ${
                      selected
                        ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold">{addOn.title}</p>
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

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Waarom geen ROI calculator hier?</p>
              <p className="mt-2 text-sm text-slate-600">
                Deze pagina is bedoeld voor snelle pakketkeuze en intake. Voor volume-indicaties en ruwe impact
                kun je de volledige configurator gebruiken.
              </p>
              <a href="/configure" className="mt-3 inline-block text-sm font-medium text-slate-900 underline">
                Ga naar /configure
              </a>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-slate-900 bg-slate-900 p-6 text-white shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Samenvatting</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold">{activePackage.title}</p>
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
                  <p className="text-sm font-semibold">Totaal</p>
                  <p className="text-xs text-white/70">vanaf, exclusief eventuele third-party kosten</p>
                </div>
                <p className="text-2xl font-bold tracking-tight">vanaf {currency(totalFrom)}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={openIntake}
              className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              Start intake
            </button>
            <p className="mt-3 text-xs leading-5 text-white/70">
              We gebruiken je selectie als intake-startpunt. Definitieve prijs volgt na scope, toegang en
              validatie van use cases.
            </p>
          </div>
        </aside>
      </div>

      {intakeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8"
          onClick={() => setIntakeOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-intake-title"
            className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Start intake</p>
                <h2 id="pricing-intake-title" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  Stuur je selectie door naar contact
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  We nemen je package en add-ons mee als startpunt. Vul je zakelijke e-mail in en voeg
                  eventueel context toe.
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
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Naar contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
