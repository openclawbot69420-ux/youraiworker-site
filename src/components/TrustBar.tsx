import { ShieldCheck, MapPin, Lock, LifeBuoy, Globe, Linkedin, FileCheck, Server, Wallet } from "lucide-react"

const CONTACT_KVK = "95290475"
const CONTACT_BTW = "NL867715849B01"
const CONTACT_CITY = "Amsterdam"
const CONTACT_RESPONSE_SLA = "Reactie binnen 1 werkdag"

export const TrustBar: React.FC = () => {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500 sm:gap-3 sm:text-xs">
      {/* KvK Badge - verified */}
      <a
        href={`https://www.kvk.nl/zoeken/?q=${CONTACT_KVK}`}
        target="_blank"
        rel="noreferrer"
        title="KvK-inschrijving verifiëren"
        className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 transition-all hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-sm sm:px-3"
      >
        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <ShieldCheck className="h-2 w-2" aria-hidden="true" />
        </span>
        <span className="font-medium text-slate-700 group-hover:text-emerald-800">KvK: {CONTACT_KVK}</span>
      </a>

      {/* VAT Badge - verified */}
      <a
        href="https://ec.europa.eu/taxation_customs/vies/#/vat-validation?countryCode=NL&vatNumber=867715849B01"
        target="_blank"
        rel="noreferrer"
        title="BTW-nummer verifiëren via EU VIES"
        className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 transition-all hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-sm sm:px-3"
      >
        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <ShieldCheck className="h-2 w-2" aria-hidden="true" />
        </span>
        <span className="font-medium text-slate-700 group-hover:text-emerald-800">BTW: {CONTACT_BTW}</span>
      </a>

      {/* Location Badge */}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 transition-colors hover:border-slate-300 hover:bg-slate-50 sm:px-3">
        <MapPin className="h-3 w-3 text-slate-500" aria-hidden="true" />
        <span className="font-medium text-slate-700">Gevestigd in {CONTACT_CITY}</span>
      </span>

      {/* Dutch Business Badge */}
      <span
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 transition-colors hover:border-slate-300 hover:bg-slate-50 sm:px-3"
        title="Nederlandse onderneming"
      >
        <Globe className="h-3 w-3 text-slate-500" aria-hidden="true" />
        <span className="font-medium text-slate-700">Nederlands bedrijf</span>
      </span>

      {/* No Monthly Fees Badge - Key Differentiator */}
      <span
        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-2.5 py-1.5 transition-colors hover:border-emerald-300 hover:bg-emerald-50 sm:px-3"
        title="Eenmalige setup, geen abonnement"
      >
        <Wallet className="h-3 w-3 text-emerald-600" aria-hidden="true" />
        <span className="font-medium text-emerald-800">Geen maandelijkse kosten</span>
      </span>

      {/* Security Badge */}
      <a
        href="/.well-known/security.txt"
        target="_blank"
        rel="noreferrer"
        title="Bekijk ons security.txt bestand (RFC 9116)"
        className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 transition-all hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-sm sm:px-3"
      >
        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <Lock className="h-2 w-2" aria-hidden="true" />
        </span>
        <span className="font-medium text-slate-700 group-hover:text-emerald-800">Security-first</span>
      </a>

      {/* Response Time Badge */}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 transition-colors hover:border-slate-300 hover:bg-slate-50 sm:px-3">
        <LifeBuoy className="h-3 w-3 text-slate-500" aria-hidden="true" />
        <span className="font-medium text-slate-700">{CONTACT_RESPONSE_SLA}</span>
      </span>

      {/* LinkedIn Follow Badge */}
      <a
        href="https://www.linkedin.com/company/your-ai-worker/"
        target="_blank"
        rel="noreferrer"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Volg Your AI Worker op LinkedIn"
        className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 transition-all hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm sm:px-3"
      >
        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-100 text-blue-700">
          <Linkedin className="h-2 w-2" aria-hidden="true" />
        </span>
        <span className="font-medium text-slate-700 group-hover:text-blue-800">Volg ons</span>
      </a>

      {/* AVG/GDPR Compliance Badge */}
      <a
        href="/privacy"
        title="AVG/GDPR compliant privacybeleid"
        className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 transition-all hover:border-violet-300 hover:bg-violet-50/50 hover:shadow-sm sm:px-3"
      >
        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-violet-100 text-violet-700">
          <FileCheck className="h-2 w-2" aria-hidden="true" />
        </span>
        <span className="font-medium text-slate-700 group-hover:text-violet-800">AVG compliant</span>
      </a>

      {/* EU Data Residency Badge */}
      <span
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 transition-colors hover:border-slate-300 hover:bg-slate-50 sm:px-3"
        title="Data blijft in de EU (Nederland)"
      >
        <Server className="h-3 w-3 text-slate-500" aria-hidden="true" />
        <span className="font-medium text-slate-700">EU data</span>
      </span>
    </div>
  )
}
