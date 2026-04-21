"use client"

import { useState } from "react"
import { Copy, Check, ClipboardList } from "lucide-react"

/**
 * CopyPricingSummaryButton - Allows users to copy a formatted pricing summary
 * to share with decision-makers (budget owners, managers, team leads).
 *
 * Removes friction in the buying process by making it easy to paste
 * pricing details into Slack, email, or internal documentation.
 */
export const CopyPricingSummaryButton: React.FC = () => {
  const [copied, setCopied] = useState(false)

  const pricingSummary = `Your AI Worker - AI-agent Implementatie

STARTER PAKKET
- 1 workflow (bijv. inbox triage, leadkwalificatie, of planning)
- 1-2 integraties (Gmail, Calendar, WhatsApp, Slack, etc.)
- Testen met realistische cases + handover
- 2 weken break-fix support tijdens business hours
- Eenmalig: EUR 1.000 (excl. btw)
- Looptijd: 3-7 werkdagen

GROEI PAKKET
- Tot 5 workflows
- Meerdere integraties en complexere routing
- Uitgebreidere testcases en foutafhandeling
- 4 weken break-fix support
- Eenmalig: EUR 2.500 (excl. btw)
- Looptijd: 5-10 werkdagen

BELANGRIJK
- Dit is eenmalige implementatie, geen maandelijkse kosten
- Third-party kosten (AI API, tools) lopen via eigen accounts
- 48-uurs garantie: niet live = niet betalen

KvK: 95290475 | BTW: NL8677.15.849.B01
Meer info: https://youraiworker.nl/pricing
Intake plannen: https://youraiworker.nl/contact`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pricingSummary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Silently fail - button just won't show feedback
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={copied}
      className={[
        "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2",
        copied
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm",
      ].join(" ")}
      title={copied ? "Gekopieerd!" : "Kopieer prijsoverzicht om te delen"}
      aria-label={copied ? "Prijsoverzicht gekopieerd" : "Kopieer prijsoverzicht"}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          <span className="hidden sm:inline">Gekopieerd</span>
          <span className="sm:hidden">OK</span>
        </>
      ) : (
        <>
          <ClipboardList className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Kopieer prijzen</span>
          <span className="sm:hidden">Kopieer</span>
        </>
      )}
    </button>
  )
}

export default CopyPricingSummaryButton
