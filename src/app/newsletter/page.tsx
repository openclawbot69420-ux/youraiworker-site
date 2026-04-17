import type { Metadata } from "next"
import { Mail, CheckCircle, FileText, Zap, Shield, ArrowRight, Calendar } from "lucide-react"
import { NewsletterSignup } from "../../components/NewsletterSignup"
import { TrustBar } from "../../components/TrustBar"
import { buildBreadcrumbJsonLd } from "../jsonld"

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Nieuwsbrief", url: "https://youraiworker.nl/newsletter" },
])

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export const metadata: Metadata = {
  title: "Nieuwsbrief | Praktische AI-agent updates | Your AI Worker",
  description: "Ontvang elke 2 weken praktische updates over AI-agents, implementatietips en lessons learned uit productie deployments.",
  alternates: {
    canonical: "https://youraiworker.nl/newsletter",
  },
  openGraph: {
    title: "Nieuwsbrief | Praktische AI-agent updates",
    description: "Bi-wekelijkse updates over AI-agents voor je bedrijf. Geen spam, alleen relevante content.",
    url: "https://youraiworker.nl/newsletter",
    images: [{
      url: "https://youraiworker.nl/newsletter/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Your AI Worker Nieuwsbrief - Praktische AI-agent updates",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nieuwsbrief | Your AI Worker",
    description: "Praktische updates over AI-agents en workflow automatisering.",
    images: ["https://youraiworker.nl/newsletter/twitter-image"],
  },
}

const WHAT_YOU_GET = [
  {
    icon: FileText,
    title: "Nieuwe use-cases",
    description: "Concrere voorbeelden van hoe teams AI-agents inzetten voor e-mail, chat en CRM.",
  },
  {
    icon: Zap,
    title: "Implementatietips",
    description: "Wat werkt en wat niet, vanuit ervaring met productie deployments bij klanten.",
  },
  {
    icon: Shield,
    title: "Security en compliance",
    description: "Updates over veilige inrichting, privacy en governance rondom AI-agents.",
  },
  {
    icon: Calendar,
    title: "Bi-wekelijks",
    description: "Geen dagelijkse spam. Elke 2 weken een korte, praktische update.",
  },
] as const

const TESTIMONIALS = [
  {
    quote: "De updates geven me handvatten om AI-automatisering bespreekbaar te maken binnen ons team.",
    author: "CEO, middelgroot bedrijf",
  },
  {
    quote: "Geen clickbait, alleen concrete voorbeelden die ik meteen kan toepassen.",
    author: "Operations Manager",
  },
] as const

export default function NewsletterPage(): React.ReactElement {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:pt-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            <Mail className="h-3.5 w-3.5 text-slate-500" />
            <span>Gratis updates</span>
          </div>
          <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Praktische updates over AI-agents voor je bedrijf
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
            Ontvang elke 2 weken een korte update met nieuwe use-cases, implementatietips en wat we leren uit productie deployments.
          </p>
        </div>
      </section>

      {/* Embedded signup form */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <NewsletterSignup />
      </section>

      {/* Trust indicators below signup - builds credibility at the decision point */}
      <section className="mx-auto max-w-6xl px-4 pb-8" aria-label="Vertrouwensindicatoren">
        <TrustBar />
      </section>

      {/* What you get */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-center text-xl font-semibold text-slate-900">
            Wat je krijgt
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-slate-600">
            Geen tijdverspilling. Alleen relevante content die je direct toepasbaar maakt.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_YOU_GET.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-8">
          <h2 className="text-center text-xl font-semibold text-slate-900">
            Wat abonnees zeggen
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {TESTIMONIALS.map(({ quote, author }, index) => (
              <div key={index} className="rounded-xl border border-emerald-200/70 bg-white p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <p className="text-sm leading-relaxed text-slate-700">"{quote}"</p>
                    <p className="mt-2 text-xs font-medium text-slate-500">- {author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-xl font-semibold text-slate-900">Veelgestelde vragen</h2>
        <div className="mt-6 space-y-4">
          {[
            {
              q: "Hoe vaak krijg ik een update?",
              a: "Elke 2 weken. Geen dagelijkse spam, alleen relevante content als we iets interessants hebben.",
            },
            {
              q: "Kan ik me altijd uitschrijven?",
              a: "Ja, in elke mail staat een uitschrijflink. We respecteren je keuze direct.",
            },
            {
              q: "Wat gebeurt er met mijn e-mailadres?",
              a: "We bewaren je e-mail alleen voor deze nieuwsbrief. Geen verkoop aan derden, geen ongevraagde mail.",
            },
            {
              q: "Is dit een verkoopmailing?",
              a: "Nee. We delen kennis en ervaring. De focus ligt op wat we leren, niet op verkopen.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-medium text-slate-900">{q}</h3>
              <p className="mt-1 text-sm text-slate-600">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-12 text-center text-white sm:py-16">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Aanmelden is gratis en vrijblijvend
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/70">
            Geef je e-mail op en ontvang de volgende update direct in je inbox.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="#nieuwsbrief"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              <Mail className="h-4 w-4" />
              Direct aanmelden
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mx-auto mt-4 max-w-lg text-xs text-white/50">
            Al meer dan 100 professionals ontvangen onze updates. KvK 95290475.
          </p>
        </div>
      </section>
    </>
  )
}