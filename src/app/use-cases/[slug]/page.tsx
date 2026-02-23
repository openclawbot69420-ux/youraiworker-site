import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { USE_CASES } from "../../../lib/catalog"

interface UseCaseDetailPageProps {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  return USE_CASES.map((useCase) => ({ slug: useCase.slug }))
}

export const generateMetadata = async (props: UseCaseDetailPageProps): Promise<Metadata> => {
  const { slug } = await props.params
  const useCase = USE_CASES.find((item) => item.slug === slug)

  if (!useCase) {
    return {
      title: "Use case",
    }
  }

  return {
    title: `${useCase.title}`,
    description: useCase.shortDescription,
  }
}

const UseCaseDetailPage: React.FC<UseCaseDetailPageProps> = async (props) => {
  const { slug } = await props.params
  const useCase = USE_CASES.find((item) => item.slug === slug)

  if (!useCase) {
    notFound()
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="-mx-4 mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm subtle-mesh sm:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Use case</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{useCase.title}</h1>
          <p className="mt-4 text-slate-600">{useCase.longDescription}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-lg font-semibold">Wat je krijgt</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              {useCase.deliverables.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-lg font-semibold">Wat we van je nodig hebben</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              {useCase.whatYouNeed.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-lg font-semibold">Typische integraties</h2>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {useCase.typicalIntegrations.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
            <h2 className="text-lg font-semibold">Klaar om dit te automatiseren?</h2>
            <p className="mt-3 text-sm text-white/70">
              Plan een intake. Je krijgt een concreet voorstel met scope, planning en vaste uitgangspunten.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="/contact"
                className="rounded-lg bg-white px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Plan intake
              </a>
              <a
                href="/pricing"
                className="rounded-lg border border-white/30 px-6 py-3 text-center text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Bekijk packages
              </a>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-12">
        <a href="/use-cases" className="text-sm font-medium text-slate-900 underline">
          Terug naar use cases
        </a>
      </div>
    </section>
  )
}

export default UseCaseDetailPage
