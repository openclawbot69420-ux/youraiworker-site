import { Clock, Shield, Zap, Users } from "lucide-react"

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
    value: "<24",
    unit: "uur",
    label: "Reactietijd",
    description: "Reactie binnen 1 werkdag op aanvragen",
  },
  {
    icon: Shield,
    value: "48",
    unit: "uur",
    label: "Warranty periode",
    description: "Break-fix garantie na livegang",
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

export const Testimonials: React.FC = () => {
  return (
    <section id="trust-metrics" className="mx-auto max-w-6xl px-4 py-16">
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
    </section>
  )
}
