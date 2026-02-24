import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"

import { USE_CASES } from "../../lib/catalog"

export const metadata: Metadata = {
  title: "Use cases",
  description: "Voorbeelden van AI-agents die werk uit handen nemen: e-mail, support, lead qualification en meer.",
  openGraph: {
    title: "Use cases - Your AI Worker",
    description: "Voorbeelden van AI-agents die werk uit handen nemen: e-mail, support, lead qualification en meer.",
    images: ["/og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Use cases - Your AI Worker",
    description: "Voorbeelden van AI-agents die werk uit handen nemen: e-mail, support, lead qualification en meer.",
    images: ["/og.svg"],
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
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="-mx-4 mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm subtle-mesh sm:p-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Use cases</h1>
          <p className="mt-4 text-slate-600">
            Voorbeelden van AI-agents die werk uit handen nemen: e-mail, support, lead qualification en meer.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {useCases.map((useCase) => (
          <div
            key={useCase.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <useCase.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-semibold">{useCase.title}</h2>
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

      <div className="mt-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-12 text-white sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight">Klaar om te automatiseren?</h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Kies een package en vertel ons wat je wil automatiseren. Wij regelen de rest.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/pricing"
            className="rounded-lg bg-white px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Bekijk packages
          </a>
          <a
            href="/contact"
            className="rounded-lg border border-white/30 px-6 py-3 text-center text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            Plan intake
          </a>
        </div>
      </div>
    </section>
  )
}

export default UseCasesPage
