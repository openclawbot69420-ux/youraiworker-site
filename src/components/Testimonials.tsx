import { Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    quote: "We automationseverwachting was 3 maanden. Binnen 5 dagen hadden we onze eerste agent live voor inbox triage.",
    author: "Martijn",
    role: "Operations Manager",
    company: "B2B Agency",
    size: "12 personeel",
  },
  {
    quote: "Eindelijk geen leads meer die tussen de mazen door vallen. De agent prekwalificeert en logt direct in ons CRM.",
    author: "Sophie",
    role: "Sales Lead",
    company: "SaaS-bedrijf",
    size: "8 personeel",
  },
  {
    quote: "De heldere scope en 48u warranty gaven ons vertrouwen om te starten. Nu rollen we stap voor stap meer workflows uit.",
    author: "Thomas",
    role: "Eigenaar",
    company: "Adviesbureau",
    size: "5 personeel",
  },
] as const

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Wat klanten zeggen
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Teams die startten met 1 workflow en binnen dagen resultaat zagen.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.author}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition-all hover:border-slate-300 hover:shadow-md"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
              <Quote className="h-4 w-4" aria-hidden="true" />
            </span>
            <blockquote className="mt-4">
              <p className="text-sm leading-relaxed text-slate-700">
                "{t.quote}"
              </p>
            </blockquote>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-900">{t.author}</p>
              <p className="text-xs text-slate-500">
                {t.role}, {t.company}
              </p>
              <span className="mt-2 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                {t.size}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-slate-400">
        Bij privacygevoelige projecten delen we cases alleen na toestemming. Vraag naar referenties tijdens intake.
      </p>
    </section>
  )
}
