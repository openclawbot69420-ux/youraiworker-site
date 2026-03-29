import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"

import { USE_CASES } from "../../lib/catalog"
import { buildBreadcrumbJsonLd } from "../jsonld"

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Toepassingen", url: "https://youraiworker.nl/use-cases" },
])

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export const metadata: Metadata = {
  title: "Toepassingen | AI-agent workflows voor e-mail, leads en support | Your AI Worker",
  description:
    "Concrete toepassingen voor AI-agents in e-mail, support, leadkwalificatie en interne workflows.",
  alternates: {
    canonical: "https://youraiworker.nl/use-cases",
  },
  openGraph: {
    title: "Toepassingen voor AI-agents | Your AI Worker",
    description:
      "Bekijk concrete AI-agent use cases voor support, inboxbeheer, leads en interne workflows.",
    url: "https://youraiworker.nl/use-cases",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Your AI Worker use cases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-agent use cases | Your AI Worker",
    description:
      "Concrete voorbeelden van AI-agents voor support, leads, e-mail en rapportages.",
    images: ["/og-home.png"],
  },
}

const useCases = USE_CASES.map((useCase) => {
  return {
    slug: useCase.slug,
    icon: useCase.icon,
    title: useCase.title,
    description: useCase.shortDescription,
  }
}) satisfies Array<{
  slug: string
  icon: LucideIcon
  title: string
  description: string
}>

const UseCasesPage: React.FC = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="motion-fade-in mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm subtle-mesh sm:-mx-4 sm:p-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Toepassingen</h1>
          <p className="mt-4 text-slate-600">
            Voorbeelden van workflows die we in OpenClaw implementeren - met duidelijke outputs, approvals en
            beheerde livegang.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {useCases.map((useCase, index) => (
          <div
            key={useCase.title}
            className={`hover-lift motion-fade-in rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-md ${index % 3 === 0 ? "motion-delay-1" : index % 3 === 1 ? "motion-delay-2" : "motion-delay-3"}`}
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <useCase.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="min-w-0 text-sm font-semibold leading-snug text-slate-900">{useCase.title}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{useCase.description}</p>
            <a
              href={`/use-cases/${useCase.slug}`}
              className="mt-5 inline-block text-sm font-medium text-slate-900 underline"
            >
              Bekijk details
            </a>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-12 text-white sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight">Klaar om te automatiseren?</h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Kies een package en vertel ons wat je wil automatiseren. Wij regelen de rest.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/pricing"
            className="rounded-lg bg-white px-6 py-3 text-center text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
          >
            Bekijk packages
          </a>
          <a
            href="/contact"
            className="rounded-lg border border-white/30 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Plan een intake
          </a>
        </div>
      </div>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">Ga verder</h2>
        <p className="mt-2 text-sm text-slate-600">
          Verken de bijbehorende integraties, implementatie-aanpak en prijsopbouw.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <a
            href="/integrations"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-slate-300"
          >
            Integraties
          </a>
          <a
            href="/implementatie"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-slate-300"
          >
            Implementatie
          </a>
          <a
            href="/pricing"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-slate-300"
          >
            Prijzen
          </a>
        </div>
      </section>
    </section>
    </>
  )
}

export default UseCasesPage
