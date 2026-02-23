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

export const ConfigureUI: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>("starter")
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnKey[]>([])

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

    const minHours = activeAddOns.reduce((sum, a) => sum + a.efficiencyMinHoursPerWeek, 0)
    const maxHours = activeAddOns.reduce((sum, a) => sum + a.efficiencyMaxHoursPerWeek, 0)

    return {
      totalFrom,
      addOnsCost,
      efficiencyMin: minHours,
      efficiencyMax: maxHours,
    }
  }, [activeAddOns, activePackage.priceEuro, selectedPackage])

  const toggleAddOn = (key: AddOnKey) => {
    setSelectedAddOns((prev) => {
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key)
      }
      return [...prev, key]
    })
  }

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
              {estimate.efficiencyMax === 0
                ? "Selecteer add-ons om een impact-indicatie te zien."
                : `${estimate.efficiencyMin} tot ${estimate.efficiencyMax} uur/week tijdwinst.`}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Dit is een grove schatting op basis van het type integratie. Werkelijke impact hangt af
              van volume en workflow.
            </p>
          </div>

          <a
            href="/contact"
            className="mt-6 block rounded-lg bg-slate-900 px-6 py-3 text-center text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Plan intake
          </a>
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
