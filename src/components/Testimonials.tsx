import { Clock, Shield, Zap, Users, Building2, Briefcase, Store, Globe, UserRound, Lock } from "lucide-react"
import { TrustIndicatorsJsonLd } from "./TrustIndicatorsJsonLd"

// Trust indicators - concrete operational metrics that speak louder than placeholder testimonials
const TRUST_METRICS = [
  {
    icon: Zap,
    value: "3-10",
    unit: "dagen",
    label: "Van intake tot live",
    description: "Afgebakende workflows met duidelijke scope",
  },
  {
    icon: Clock,
    value: "1",
    unit: "werkdag",
    label: "Reactietijd",
    description: "Snel antwoord op je intake-aanvraag",
  },
  {
    icon: Shield,
    value: "48",
    unit: "uur",
    label: "Garantieperiode",
    description: "Break-fix garantie na livegang",
  },
  {
    icon: Lock,
    value: "AVG",
    unit: "ready",
    label: "Security baseline",
    description: "Best practices voor toegang, logging en back-ups",
  },
  {
    icon: Users,
    value: "1-10",
    unit: "personen",
    label: "Ideale teamgrootte",
    description: "Vroeg adopterend MKB segment",
  },
] as const

const TRUST_SECTION_TITLE = "Voorspelbaarheid en zekerheid"
const TRUST_SECTION_SUBTITLE = "Geen vage beloftes, wel concrete uitgangspunten die we vooraf met je afstemmen."
const TRUST_SECTION_DISCLAIMER = "Indicatief. We bevestigen scope, doorlooptijd en supportafspraken altijd in het voorstel."

// Industry sectors we serve - helps visitors self-identify fit
const SECTOR_BADGES = [
  { icon: Building2, label: "Marketing- & creatieve agencies", description: "Voor klantcontact en planning" },
  { icon: Briefcase, label: "B2B dienstverlening", description: "Leadopvolging en offertes" },
  { icon: Store, label: "Retail & e-commerce", description: "Support en orderafhandeling" },
  { icon: Globe, label: "Administratieve dienstverlening", description: "Workflows en rapportages" },
  { icon: UserRound, label: "Consultancy & ZZP", description: "Intake en planning" },
] as const

const SECTORS_TITLE = "Voor wie we het meest geschikt zijn"
const SECTORS_SUBTITLE = "AI-automatisering die het beste past bij deze organisatietypes."

const SITE_URL = "https://youraiworker.nl"
const SITE_NAME = "Your AI Worker"

export const Testimonials: React.FC = () => {
  return (
    <section id="trust-metrics" className="mx-auto max-w-6xl px-4 py-16">
      <TrustIndicatorsJsonLd
        trustMetrics={[...TRUST_METRICS]}
        sectorBadges={[...SECTOR_BADGES]}
        siteName={SITE_NAME}
        siteUrl={SITE_URL}
      />
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {TRUST_SECTION_TITLE}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {TRUST_SECTION_SUBTITLE}
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_METRICS.map((metric) => {
          const Icon = metric.icon
          return (
            <div
              key={metric.label}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition-all hover:border-slate-300 hover:shadow-md"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors group-hover:border-slate-300 group-hover:bg-slate-100">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="mt-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold tracking-tight text-slate-900">
                    {metric.value}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    {metric.unit}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {metric.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {metric.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <p className="mt-5 text-xs leading-relaxed text-slate-500">
        {TRUST_SECTION_DISCLAIMER}
      </p>

      {/* Industry sectors - helps visitors self-identify fit */}
      <div className="mt-12 border-t border-slate-200/70 pt-10">
        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            {SECTORS_TITLE}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {SECTORS_SUBTITLE}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {SECTOR_BADGES.map((sector) => {
            const Icon = sector.icon
            return (
              <span
                key={sector.label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow"
                title={sector.description}
              >
                <Icon className="h-4 w-4 text-slate-500" aria-hidden="true" />
                <span className="font-medium">{sector.label}</span>
              </span>
            )
          })}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          Geen exacte match? Geen probleem - we bespreken tijdens de intake of jouw use-case past.
        </p>
      </div>
    </section>
  )
}
