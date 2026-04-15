import type { Metadata } from "next"
import { CheckCircle, Clock, Mail, Calendar, Home, FileText, ArrowRight, MessageSquare, ShieldCheck } from "lucide-react"
import { buildBreadcrumbJsonLd } from "../../jsonld"

const SITE_URL = "https://youraiworker.nl"

export const metadata: Metadata = {
  title: "Bedankt voor je aanvraag | Your AI Worker",
  description: "Je aanvraag is ontvangen. We nemen binnen 1 werkdag contact met je op.",
  alternates: {
    canonical: `${SITE_URL}/contact/bedankt`,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Aanvraag ontvangen | Your AI Worker",
    description: "Je aanvraag is ontvangen. We nemen binnen 1 werkdag contact met je op.",
    url: `${SITE_URL}/contact/bedankt`,
    images: [
      {
        url: `${SITE_URL}/contact/bedankt/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Your AI Worker - Aanvraag ontvangen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aanvraag ontvangen | Your AI Worker",
    description: "Je aanvraag is ontvangen. We nemen binnen 1 werkdag contact met je op.",
    images: [`${SITE_URL}/contact/bedankt/twitter-image`],
  },
}

const NEXT_STEPS: Array<{
  href: string
  label: string
  description: string
  icon: typeof FileText
  external?: boolean
}> = [
  {
    href: "/pricing",
    label: "Bekijk prijzen",
    description: "Vanaf EUR 1.000 voor je eerste workflow",
    icon: FileText,
  },
  {
    href: "/use-cases",
    label: "Toepassingen",
    description: "Zie welke workflows andere teams automatiseren",
    icon: MessageSquare,
  },
  {
    href: "/guides",
    label: "Lees de guides",
    description: "Praktische handleidingen voor implementatie",
    icon: FileText,
  },
  {
    href: "https://cal.com/youraiworker",
    label: "Plan direct een intake",
    description: "20 minuten, kort en concreet",
    icon: Calendar,
    external: true,
  },
]

const TIMELINE_STEPS = [
  {
    title: "Aanvraag ontvangen",
    description: "We hebben je bericht ontvangen",
    duration: "Nu",
  },
  {
    title: "Vragen gesteld",
    description: "2-5 verduidelijkende vragen over je workflow",
    duration: "Binnen 1 werkdag",
  },
  {
    title: "Voorstel ontvangen",
    description: "Scope, planning, integraties en vaste uitgangspunten",
    duration: "1-2 werkdagen",
  },
  {
    title: "Go-live",
    description: "Live binnen 3-10 werkdagen na akkoord",
    duration: "3-10 werkdagen",
  },
] as const

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export default function ContactSuccessPage(): React.ReactElement {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Contact", url: `${SITE_URL}/contact` },
    { name: "Bedankt", url: `${SITE_URL}/contact/bedankt` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />
      <main className="min-h-[80vh] bg-slate-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4">
          {/* Success card */}
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm sm:p-12">
            <div className="text-center">
              {/* Success icon */}
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-200 bg-white shadow-sm">
                <CheckCircle className="h-8 w-8 text-emerald-600" aria-hidden="true" />
              </div>
              <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Bedankt voor je aanvraag
              </h1>
              <p className="mt-4 max-w-md mx-auto text-base leading-relaxed text-slate-600">
                We hebben je bericht ontvangen en nemen binnen 1 werkdag contact met je op.
              </p>

              {/* Timeline badge */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
                <Clock className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                <span>Reactie binnen <span className="font-medium text-slate-900">1 werkdag</span> gegarandeerd</span>
              </div>
            </div>

            {/* What happens next - timeline */}
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                Wat er nu gebeurt
              </h2>
              <div className="mt-6 space-y-6">
                {TIMELINE_STEPS.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                          index === 0
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {index + 1}
                      </span>
                      {index < TIMELINE_STEPS.length - 1 && (
                        <div className="mt-2 h-full w-px bg-slate-200" aria-hidden="true" />
                      )}
                    </div>
                    <div className="pb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <p className={`font-semibold ${index === 0 ? "text-emerald-800" : "text-slate-900"}`}>
                          {step.title}
                        </p>
                        <span className="text-xs font-medium text-slate-500">{step.duration}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                KvK: 95290475
              </span>
              <span className="hidden text-slate-300 sm:inline">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                Response binnen 1 werkdag
              </span>
              <span className="hidden text-slate-300 sm:inline">|</span>
              <span>Amsterdam</span>
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                <span>Terug naar home</span>
              </a>
              <a
                href="https://cal.com/youraiworker"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Plan direct een intake</span>
              </a>
            </div>
          </div>

          {/* Next steps grid */}
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
              Verken verder
            </h2>
            <nav aria-label="Gerelateerde pagina's" className="mt-6 grid gap-3 sm:grid-cols-2">
              {NEXT_STEPS.map(({ href, label, description, icon: Icon, external }) => (
                <a
                  key={href}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-slate-300 hover:bg-white hover:shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 flex items-center gap-1">
                      {label}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true" />
                    </p>
                    <p className="text-xs text-slate-500">{description}</p>
                  </div>
                </a>
              ))}
            </nav>
          </div>

          {/* Support hint */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Vragen?{" "}
              <a href="mailto:info@youraiworker.nl" className="font-medium text-slate-900 underline underline-offset-2 transition-colors hover:text-slate-700" >
                Mail ons
              </a>{" "}
              of{" "}
              <a href="/faq" className="font-medium text-slate-900 underline underline-offset-2 transition-colors hover:text-slate-700" >
                bekijk de FAQ
              </a>.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
