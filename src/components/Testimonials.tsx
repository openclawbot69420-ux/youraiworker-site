import { Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    quote: "Onze automatiseringsverwachting was 3 maanden. Binnen 5 dagen hadden we onze eerste agent live voor inbox triage.",
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
    quote: "De heldere scope en 48 uur warranty gaven ons vertrouwen om te starten. Nu rollen we stap voor stap meer workflows uit.",
    author: "Thomas",
    role: "Eigenaar",
    company: "Adviesbureau",
    size: "5 personeel",
  },
] as const

const TESTIMONIAL_DISCLAIMER =
  "Voorbeeldquotes ter illustratie (geen echte klantreviews). Vervang zodra beschikbaar."

const TESTIMONIAL_SECTION_TITLE = "Resultaat in dagen, niet maanden"
const TESTIMONIAL_SECTION_SUBTITLE =
  "Voorbeeldquotes ter illustratie (geen echte klantreviews)."

// NOTE: Only emit Review / AggregateRating JSON-LD when testimonials are real.
// Publishing placeholder reviews can be considered misleading and is a trust hit.
const SHOULD_EMIT_REVIEW_SCHEMA = false

// AggregateRating schema for rich snippets
const buildAggregateRatingJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "Organization",
    "name": "Your AI Worker",
    "url": "https://youraiworker.nl",
  },
  "ratingValue": "5",
  "reviewCount": String(TESTIMONIALS.length),
  "bestRating": "5",
  "worstRating": "1",
})

const buildReviewJsonLd = (review: (typeof TESTIMONIALS)[number]) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Organization",
    "name": "Your AI Worker",
  },
  "author": {
    "@type": "Person",
    "name": review.author,
    "jobTitle": review.role,
    "worksFor": {
      "@type": "Organization",
      "name": review.company,
    },
  },
  "reviewBody": review.quote,
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5",
  },
  "publisher": {
    "@type": "Organization",
    "name": review.company,
  },
})

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export const Testimonials: React.FC = () => {
  const aggregateRatingJsonLd = buildAggregateRatingJsonLd()
  const reviewJsonLd = TESTIMONIALS.map((t) => buildReviewJsonLd(t))

  return (
    <>
      {SHOULD_EMIT_REVIEW_SCHEMA ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: toJsonLd(aggregateRatingJsonLd) }}
          />
          {reviewJsonLd.map((review, i) => (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: toJsonLd(review) }}
            />
          ))}
        </>
      ) : null}
      <section id="testimonials" className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {TESTIMONIAL_SECTION_TITLE}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {TESTIMONIAL_SECTION_SUBTITLE}
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
          {TESTIMONIAL_DISCLAIMER}
        </p>
      </section>
    </>
  )
}
