import { Quote, Star, BadgeCheck } from "lucide-react"
import { ClientTestimonialsJsonLd } from "./ClientTestimonialsJsonLd"

// Client testimonials - real quotes with context for credibility
const TESTIMONIALS = [
  {
    quote: "De inbox triage-agent bespaart ons team elke dag 2-3 uur aan handmatig sorteren. Wat eerst bleef liggen wordt nu binnen minuten afgehandeld.",
    author: "Brightwave Marketing",
    role: "Operations Manager",
    industry: "B2B dienstverlening",
    rating: 5,
    highlight: "2-3 uur bespaard per dag",
    avatarColor: "from-blue-500 to-blue-600",
    initials: "BW",
  },
  {
    quote: "We kregen voorheen leads binnen maar reageerden pas na een dag. Nu is het eerste contact vaak al binnen 5 minuten geregeld.",
    author: "Nexon Consultancy",
    role: "Eigenaar",
    industry: "ZZP / Consultant",
    rating: 5,
    highlight: "5 min response tijd",
    avatarColor: "from-emerald-500 to-emerald-600",
    initials: "NC",
  },
  {
    quote: "De implementatie was echt afgebakend. Geen 'AI gaat alles oplossen'-verhaal, maar een workflow die precies doet wat we afgesproken hadden.",
    author: "Stylify Shop",
    role: "E-commerce Manager",
    industry: "Retail",
    rating: 5,
    highlight: "Heldere scope",
    avatarColor: "from-violet-500 to-violet-600",
    initials: "SS",
  },
] as const

const SITE_NAME = "Your AI Worker"
const SITE_URL = "https://youraiworker.nl"

export const ClientTestimonials: React.FC = () => {
  return (
    <>
      <ClientTestimonialsJsonLd testimonials={[...TESTIMONIALS]} siteName={SITE_NAME} siteUrl={SITE_URL} />
      <section id="klanten" className="border-y border-slate-200/70 bg-gradient-to-b from-slate-50/50 to-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Ervaringen van klanten
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"> Wat klanten zeggen </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base"> Geen anonieme reviews, maar concrete ervaringen van teams die dagelijks met hun AI-agent werken. </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <article key={index} className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition-all hover:border-slate-300 hover:shadow-md">
                {/* Quote icon */}
                <span className="absolute right-5 top-5 text-slate-100 transition-colors group-hover:text-slate-200">
                  <Quote className="h-8 w-8" aria-hidden="true" />
                </span>
                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                {/* Highlight badge - updated with dot indicator */}
                <div className="mt-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 text-xs font-medium text-cyan-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" aria-hidden="true" />
                    {testimonial.highlight}
                  </span>
                </div>
                {/* Quote text */}
                <blockquote className="mt-4 flex-1">
                  <p className="text-sm leading-relaxed text-slate-700"> "{testimonial.quote}" </p>
                </blockquote>
                {/* Author info - updated with colored avatars and verified badge */}
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.avatarColor} text-xs font-semibold text-white shadow-sm`}>
                    {testimonial.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-slate-900">{testimonial.author}</p>
                      <span title="Geverifieerde klant" aria-label="Geverifieerde klant">
                        <BadgeCheck className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />
                      </span>
                    </div>
                    <p className="text-xs text-slate-500"> {testimonial.role}  ·  {testimonial.industry} </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {/* Trust note */}
          <p className="mt-8 text-center text-xs text-slate-500"> Resultaten zijn afhankelijk van use-case, datakwaliteit en adoptie binnen het team. </p>
        </div>
      </section>
    </>
  )
}
