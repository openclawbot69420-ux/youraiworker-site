"use client"

import { useMemo, useState } from "react"

type PackageKey = "starter" | "groei" | "maatwerk"

type AddOnKey =
  | "ai-billing"
  | "telegram"
  | "whatsapp"
  | "crm"
  | "ticketing"
  | "security"

interface PackageDefinition {
  key: PackageKey
  title: string
  priceEuro: number | null
  description: string
  includedAgents: number
}

interface AddOnDefinition {
  key: AddOnKey
  title: string
  fromEuro: number
  description: string
  efficiencyMinHoursPerWeek: number
  efficiencyMaxHoursPerWeek: number
}

const PACKAGES: PackageDefinition[] = [
  {
    key: "starter",
    title: "Starter",
    priceEuro: 1000,
    includedAgents: 1,
    description: "1 workflow - binnen dagen live.",
  },
  {
    key: "groei",
    title: "Groei",
    priceEuro: 2500,
    includedAgents: 3,
    description: "3 workflows - meer UAT en langere support.",
  },
  {
    key: "maatwerk",
    title: "Maatwerk",
    priceEuro: null,
    includedAgents: 0,
    description: "Complexe integraties of grotere uitrol.",
  },
]

const ADDONS: AddOnDefinition[] = [
  {
    key: "ai-billing",
    title: "AI model + billing setup",
    fromEuro: 250,
    description: "OpenAI/Anthropic keys, budget limits en basis guardrails.",
    efficiencyMinHoursPerWeek: 0,
    efficiencyMaxHoursPerWeek: 0,
  },
  {
    key: "telegram",
    title: "Telegram setup",
    fromEuro: 250,
    description: "Bot, routing, notificaties en intake/support flows.",
    efficiencyMinHoursPerWeek: 1,
    efficiencyMaxHoursPerWeek: 3,
  },
  {
    key: "whatsapp",
    title: "WhatsApp Business setup",
    fromEuro: 750,
    description: "Provider setup, verificatie, templates en workflow koppeling.",
    efficiencyMinHoursPerWeek: 2,
    efficiencyMaxHoursPerWeek: 8,
  },
  {
    key: "crm",
    title: "CRM integratie (HubSpot/Salesforce)",
    fromEuro: 750,
    description: "Field mapping, logging, dedup en triggers.",
    efficiencyMinHoursPerWeek: 1,
    efficiencyMaxHoursPerWeek: 6,
  },
  {
    key: "ticketing",
    title: "Ticketing (Jira/Zendesk)",
    fromEuro: 500,
    description: "Triage, routing, tags en status updates.",
    efficiencyMinHoursPerWeek: 2,
    efficiencyMaxHoursPerWeek: 10,
  },
  {
    key: "security",
    title: "Security hardening",
    fromEuro: 500,
    description: "Tailscale + secrets management + basis audit logging.",
    efficiencyMinHoursPerWeek: 0,
    efficiencyMaxHoursPerWeek: 0,
  },
]

const currency = (value: number) => {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value)
}

const CONFIG_STORAGE_KEY = "yaiw_config_v1"

type ConfigPayload = {
  selectedPackage: PackageKey
  selectedAddOns: AddOnKey[]
  volumes: {
    emailsPerDay: number
    leadsPerWeek: number
    ticketsPerWeek: number
  }
  hourlyRateEuro: number
  savedAtIso: string
}

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value))
}

export const ConfigureUI: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>("starter")
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnKey[]>([])
  const [emailsPerDay, setEmailsPerDay] = useState<number>(40)
  const [leadsPerWeek, setLeadsPerWeek] = useState<number>(20)
  const [ticketsPerWeek, setTicketsPerWeek] = useState<number>(30)
  const [hourlyRateEuro, setHourlyRateEuro] = useState<number>(50)

  const activePackage = useMemo(() => {
    return PACKAGES.find((p) => p.key === selectedPackage)!
  }, [selectedPackage])

  const activeAddOns = useMemo(() => {
    return ADDONS.filter((a) => selectedAddOns.includes(a.key))
  }, [selectedAddOns])

  const estimate = useMemo(() => {
    const addOnsCost = activeAddOns.reduce((sum, a) => sum + a.fromEuro, 0)
    const baseCost = activePackage.priceEuro ?? 0

    const totalFrom = selectedPackage === "maatwerk" ? null : baseCost + addOnsCost

    // Conservative baseline assumptions (transparent):
    // - Email triage: 30-60 sec saved per email (for the portion that is triage/draft)
    // - Lead qual: 3-8 min saved per lead
    // - Ticket triage: 2-5 min saved per ticket
    const emailMinHours = (emailsPerDay * 5 * 0.5) / 60
    const emailMaxHours = (emailsPerDay * 5 * 1.0) / 60

    const leadMinHours = (leadsPerWeek * 3) / 60
    const leadMaxHours = (leadsPerWeek * 8) / 60

    const ticketMinHours = (ticketsPerWeek * 2) / 60
    const ticketMaxHours = (ticketsPerWeek * 5) / 60

    // Add-ons can unlock more automation; we use them as multipliers only when relevant.
    const hasTelegramOrWhatsApp = activeAddOns.some((a) => a.key === "telegram" || a.key === "whatsapp")
    const hasCrmOrTicketing = activeAddOns.some((a) => a.key === "crm" || a.key === "ticketing")

    const multiplier = 1 + (hasTelegramOrWhatsApp ? 0.15 : 0) + (hasCrmOrTicketing ? 0.15 : 0)

    const baseMin = (emailMinHours + leadMinHours + ticketMinHours) * multiplier
    const baseMax = (emailMaxHours + leadMaxHours + ticketMaxHours) * multiplier

    // Keep the previously used "add-ons impact" as a smaller, additive indicator
    const addOnsMinHours = activeAddOns.reduce((sum, a) => sum + a.efficiencyMinHoursPerWeek, 0)
    const addOnsMaxHours = activeAddOns.reduce((sum, a) => sum + a.efficiencyMaxHoursPerWeek, 0)

    const efficiencyMin = Math.max(0, baseMin + addOnsMinHours)
    const efficiencyMax = Math.max(efficiencyMin, baseMax + addOnsMaxHours)

    const savingsEuroMinPerWeek = efficiencyMin * hourlyRateEuro
    const savingsEuroMaxPerWeek = efficiencyMax * hourlyRateEuro

    const paybackWeeksMin = totalFrom ? totalFrom / Math.max(1, savingsEuroMaxPerWeek) : null
    const paybackWeeksMax = totalFrom ? totalFrom / Math.max(1, savingsEuroMinPerWeek) : null

    return {
      totalFrom,
      addOnsCost,
      efficiencyMin,
      efficiencyMax,
      savingsEuroMinPerWeek,
      savingsEuroMaxPerWeek,
      paybackWeeksMin,
      paybackWeeksMax,
    }
  }, [
    activeAddOns,
    activePackage.priceEuro,
    emailsPerDay,
    hourlyRateEuro,
    leadsPerWeek,
    selectedPackage,
    ticketsPerWeek,
  ])

  const toggleAddOn = (key: AddOnKey) => {
    setSelectedAddOns((prev) => {
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key)
      }
      return [...prev, key]
    })
  }

  const configPayload: ConfigPayload = {
    selectedPackage,
    selectedAddOns,
    volumes: {
      emailsPerDay,
      leadsPerWeek,
      ticketsPerWeek,
    },
    hourlyRateEuro,
    savedAtIso: new Date().toISOString(),
  }

  const persistConfig = () => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configPayload))
    } catch {
      // ignore
    }
  }

  const shareLink = useMemo(() => {
    const encoded = encodeURIComponent(JSON.stringify(configPayload))
    return `/contact?config=${encoded}`
  }, [configPayload])

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold">1) Kies je package</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {PACKAGES.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setSelectedPackage(p.key)}
                className={`rounded-2xl border p-5 text-left transition-all hover:shadow-md ${
                  selectedPackage === p.key
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
                }`}
              >
                <p className="text-sm font-semibold">{p.title}</p>
                <p className={`mt-2 text-2xl font-bold ${selectedPackage === p.key ? "text-white" : "text-slate-900"}`}>
                  {p.priceEuro ? currency(p.priceEuro) : "Op maat"}
                </p>
                <p className={`mt-2 text-sm ${selectedPackage === p.key ? "text-white/70" : "text-slate-600"}`}>
                  {p.description}
                </p>
                {p.includedAgents > 0 && (
                  <p className={`mt-3 text-xs ${selectedPackage === p.key ? "text-white/70" : "text-slate-500"}`}>
                    Inbegrepen: {p.includedAgents} agent{p.includedAgents > 1 ? "s" : ""}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold">2) Selecteer add-ons (optioneel)</h2>
          <p className="mt-2 text-sm text-slate-600">
            Je kunt credentials/toegang zelf aanleveren. Wil je dat wij het regelen? Kies dan add-ons.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Volumes (indicatie)</p>
              <p className="mt-1 text-xs text-slate-500">
                Dit bepaalt de efficiency-schatting. We valideren dit tijdens intake.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor="emails" className="font-medium text-slate-700">E-mails per dag</label>
                    <span className="font-semibold text-slate-900">{emailsPerDay}</span>
                  </div>
                  <input
                    id="emails"
                    type="range"
                    min={0}
                    max={500}
                    value={emailsPerDay}
                    onChange={(e) => setEmailsPerDay(Number(e.target.value))}
                    className="mt-2 w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor="leads" className="font-medium text-slate-700">Leads per week</label>
                    <span className="font-semibold text-slate-900">{leadsPerWeek}</span>
                  </div>
                  <input
                    id="leads"
                    type="range"
                    min={0}
                    max={500}
                    value={leadsPerWeek}
                    onChange={(e) => setLeadsPerWeek(Number(e.target.value))}
                    className="mt-2 w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor="tickets" className="font-medium text-slate-700">Tickets per week</label>
                    <span className="font-semibold text-slate-900">{ticketsPerWeek}</span>
                  </div>
                  <input
                    id="tickets"
                    type="range"
                    min={0}
                    max={1000}
                    value={ticketsPerWeek}
                    onChange={(e) => setTicketsPerWeek(Number(e.target.value))}
                    className="mt-2 w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor="rate" className="font-medium text-slate-700">Uurtarief (EUR)</label>
                    <span className="font-semibold text-slate-900">{currency(hourlyRateEuro)}</span>
                  </div>
                  <input
                    id="rate"
                    type="range"
                    min={20}
                    max={200}
                    step={5}
                    value={hourlyRateEuro}
                    onChange={(e) => setHourlyRateEuro(Number(e.target.value))}
                    className="mt-2 w-full"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Aannames</p>
              <ul className="mt-3 space-y-2 text-xs text-slate-600">
                <li>• Email triage/draft: 30-60 sec tijdwinst per email</li>
                <li>• Lead qualification: 3-8 min tijdwinst per lead</li>
                <li>• Ticket triage: 2-5 min tijdwinst per ticket</li>
                <li>• Add-ons kunnen efficiency verhogen door meer automatisering mogelijk te maken</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {ADDONS.map((a) => {
              const checked = selectedAddOns.includes(a.key)
              return (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => toggleAddOn(a.key)}
                  className={`rounded-2xl border p-5 text-left transition-all hover:shadow-md ${
                    checked ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">{a.title}</p>
                      <p className={`mt-2 text-sm ${checked ? "text-white/70" : "text-slate-600"}`}>{a.description}</p>
                    </div>
                    <p className={`text-sm font-semibold ${checked ? "text-white" : "text-slate-900"}`}>
                      vanaf {currency(a.fromEuro)}
                    </p>
                  </div>
                  {(a.efficiencyMaxHoursPerWeek ?? 0) > 0 && (
                    <p className={`mt-4 text-xs ${checked ? "text-white/70" : "text-slate-500"}`}>
                      Indicatie impact: {a.efficiencyMinHoursPerWeek} tot {a.efficiencyMaxHoursPerWeek} uur/week
                    </p>
                  )}
                </button>
              )
            })}
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Impact-schattingen zijn indicatief. In de intake bepalen we scope en realistische ROI.
          </p>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-lg font-semibold">Indicatie</h2>

          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Package</span>
              <span className="font-semibold">{activePackage.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Add-ons</span>
              <span className="font-semibold">
                {selectedPackage === "maatwerk" ? "-" : currency(estimate.addOnsCost)}
              </span>
            </div>
            <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
              <span>Totaal (vanaf)</span>
              <span className="font-semibold">
                {estimate.totalFrom === null ? "Op maat" : currency(estimate.totalFrom)}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">Efficiency (indicatie)</p>
            <p className="mt-2 text-sm text-slate-700">
              {`${estimate.efficiencyMin.toFixed(1)} tot ${estimate.efficiencyMax.toFixed(1)} uur/week tijdwinst.`}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {`${currency(estimate.savingsEuroMinPerWeek)} tot ${currency(estimate.savingsEuroMaxPerWeek)} per week (op basis van uurtarief).`}
            </p>
            {estimate.paybackWeeksMin && estimate.paybackWeeksMax && (
              <p className="mt-2 text-xs text-slate-500">
                Payback indicatie: ~{estimate.paybackWeeksMin.toFixed(1)} tot {estimate.paybackWeeksMax.toFixed(1)} weken.
              </p>
            )}
            <p className="mt-2 text-xs text-slate-500">
              Indicatief. We valideren volumes en scope tijdens intake.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            <a
              href={shareLink}
              onClick={persistConfig}
              className="block rounded-lg bg-slate-900 px-6 py-3 text-center text-sm font-medium text-white hover:bg-slate-800 transition-colors"
            >
              Plan intake met deze configuratie
            </a>
            <button
              type="button"
              onClick={async () => {
                persistConfig()
                try {
                  await navigator.clipboard.writeText(`${window.location.origin}${shareLink}`)
                } catch {
                  // ignore
                }
              }}
              className="rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Kopieer link
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
          <h2 className="text-lg font-semibold">Wat jij aanlevert</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>• Owner + beslisser</li>
            <li>• Toegang tot tools (of wij regelen het als add-on)</li>
            <li>• 5-20 echte testcases</li>
            <li>• Succescriteria na 14 dagen</li>
          </ul>
        </div>
      </aside>
    </div>
  )
}
