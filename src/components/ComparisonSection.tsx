"use client"

import { Check, X, AlertCircle, Clock, DollarSign, Shield, Wrench, Users } from "lucide-react"

const COMPARISON_DATA = [
  {
    icon: Clock,
    factor: "Tijd tot live",
    diy: "3-6 maanden",
    freelancer: "1-3 maanden",
    agency: "2-4 maanden",
    youraiworker: "3-10 werkdagen",
    highlight: true,
  },
  {
    icon: DollarSign,
    factor: "Investering",
    diy: "Geschat €5-15k (hidden costs)",
    freelancer: "€8-25k + uurtje factuur",
    agency: "€15-50k + retainer",
    youraiworker: "Vanaf €1.000 eenmalig",
    highlight: true,
  },
  {
    icon: Shield,
    factor: "Security & compliance",
    diy: "Je bouwt zelf kennis op",
    freelancer: "Varieert sterk",
    agency: "Vaak 1-2 week garnalen",
    youraiworker: "Security-first baseline",
    highlight: true,
  },
  {
    icon: Wrench,
    factor: "Onderhoud & support",
    diy: "100% zelf",
    freelancer: "Op basis van beschikbaarheid",
    agency: "Contractueel, duur",
    youraiworker: "48 uur warranty + 2 weken support",
    highlight: false,
  },
  {
    icon: AlertCircle,
    factor: "Risico bij fouten",
    diy: "Hoog (geen backup)",
    freelancer: "Middel (afhankelijk van persoon)",
    agency: "Laag-middel",
    youraiworker: "Laag (geteste patterns)",
    highlight: false,
  },
  {
    icon: Users,
    factor: "Domeinkennis AI-agents",
    diy: "Zelf opbouwen",
    freelancer: "Algemeen tech",
    agency: "Algemeen AI",
    youraiworker: "Gespecialiseerd (dagelijks)",
    highlight: true,
  },
] as const

const CHECK_ICON = <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
const X_ICON = <X className="h-4 w-4 text-slate-400" aria-hidden="true" />
const CAUTION_ICON = <AlertCircle className="h-4 w-4 text-amber-500" aria-hidden="true" />

export const ComparisonSection: React.FC = () => {
  return (
    <section id="vergelijking" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"> Waarom wij </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"> Vergelijk je opties </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base"> Wat je krijgt als je kiest voor een gespecialiseerde implementatie versus zelf bouwen of een algemene partij inschakelen. </p>
      </div>

      {/* Desktop table - lg and up */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 shadow-sm lg:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"> Factor </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"> Zelf bouwen </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"> Freelancer </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"> Agency </th>
              <th className="bg-slate-900 px-4 py-4 text-left">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300"> Your AI Worker </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {COMPARISON_DATA.map((row, index) => (
              <tr key={row.factor} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <row.icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    <span className="font-medium text-slate-900">{row.factor}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-600">{row.diy}</td>
                <td className="px-4 py-4 text-slate-600">{row.freelancer}</td>
                <td className="px-4 py-4 text-slate-600">{row.agency}</td>
                <td className="bg-slate-900/95 px-4 py-4">
                  <div className="flex items-center gap-2">
                    {row.highlight && (
                      <Check className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    )}
                    <span className={`font-medium ${row.highlight ? "text-emerald-400" : "text-slate-300"}`}>
                      {row.youraiworker}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards - below lg */}
      <div className="grid gap-4 lg:hidden">
        {COMPARISON_DATA.map((row) => (
          <div key={row.factor} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <row.icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <span className="font-semibold text-slate-900">{row.factor}</span>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-500">DIY</span>
                <span className="text-sm text-right text-slate-600">{row.diy}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-500">Agency</span>
                <span className="text-sm text-right text-slate-600">{row.agency}</span>
              </div>
              <div className="flex items-start justify-between gap-2 rounded-lg bg-slate-900 p-3 -mx-1">
                <span className="text-xs uppercase tracking-wide text-slate-400">Your AI Worker</span>
                <span className={`text-sm font-medium text-right ${row.highlight ? "text-emerald-400" : "text-slate-300"}`}>
                  {row.youraiworker}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key takeaway */}
      <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6">
        <div className="flex items-start gap-3 sm:items-center">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-4 w-4 text-emerald-700" aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium text-emerald-900">De keuze voor efficiëntie</p>
            <p className="mt-1 text-sm text-emerald-800"> Waar bij andere opties de scope vaak uitloopt en prijzen stijgen, beginnen wij met een duidelijk afgebakende workflow vanaf €1.000. Specialistisch in AI-agents, zonder de overhead van een agency. </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs leading-relaxed text-slate-500"> Vergelijking is gebaseerd op typische ervaringen. Exacte tijdlijnen en kosten hangen af van je specifieke situatie en scope. </p>
    </section>
  )
}
