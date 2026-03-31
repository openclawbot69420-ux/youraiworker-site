import type { Metadata } from "next"
import { CheckCircle, Mail, Calendar, MessageSquare, Home, FileText, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Aangemeld voor updates | Your AI Worker",
  description: "Je bent succesvol aangemeld voor praktische updates over AI-agents en workflow automatisering.",
  alternates: {
    canonical: "https://youraiworker.nl/newsletter/bedankt",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Succesvol aangemeld | Your AI Worker",
    description: "Je ontvangt nu praktische updates over AI-agents en workflow automatisering.",
    url: "https://youraiworker.nl/newsletter/bedankt",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Your AI Worker - Nieuwsbrief aanmelding",
      },
    ],
  },
}

const NEXT_STEPS = [
  {
    href: "/use-cases",
    label: "Bekijk toepassingen",
    description: "Zie welke workflows andere teams automatiseren",
    icon: FileText,
  },
  {
    href: "/guides",
    label: "Lees de guides",
    description: "Praktische handleidingen voor AI-agent implementatie",
    icon: FileText,
  },
  {
    href: "/pricing",
    label: "Bekijk prijzen",
    description: "Vanaf EUR 1.000 voor je eerste workflow",
    icon: Calendar,
  },
  {
    href: "/contact",
    label: "Plan een intake",
    description: "Krijg een concreet voorstel binnen 1 werkdag",
    icon: MessageSquare,
  },
] as const

export default function NewsletterSuccessPage(): React.ReactElement {
  return (
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
              Je bent aangemeld
            </h1>

            <p className="mt-4 max-w-md mx-auto text-base leading-relaxed text-slate-600">
              Je ontvangt nu elke 2 weken praktische updates over AI-agents,
              implementatietips en wat we leren uit productie deployments.
            </p>

            {/* Email confirmation hint */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
              <Mail className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <span>Check je inbox (en spam-filter) voor bevestiging</span>
            </div>
          </div>

          {/* What to expect */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
              Wat je kunt verwachten
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {[
                "Korte, praktische updates - geen fluff",
                "Nieuwe use-cases en implementatietips",
                "Lessons learned uit productie deployments",
                "Altijd uitschrijven via de link in elke mail",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
              href="/use-cases"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              <span>Bekijk toepassingen</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Next steps grid */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
            Verken verder
          </h2>
          <nav
            aria-label="Gerelateerde pagina's"
            className="mt-6 grid gap-3 sm:grid-cols-2"
          >
            {NEXT_STEPS.map(({ href, label, description, icon: Icon }) => (
              <a
                key={href}
                href={href}
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
            <a
              href="mailto:info@youraiworker.nl"
              className="font-medium text-slate-900 underline underline-offset-2 transition-colors hover:text-slate-700"
            >
              Mail ons
            </a>{" "}
            of{" "}
            <a
              href="/contact"
              className="font-medium text-slate-900 underline underline-offset-2 transition-colors hover:text-slate-700"
            >
              plan een intake
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
