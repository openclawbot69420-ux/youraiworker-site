import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { GUIDES } from "../../../lib/catalog"

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  return GUIDES.map((guide) => ({ slug: guide.slug }))
}

export const generateMetadata = async (props: GuideDetailPageProps): Promise<Metadata> => {
  const { slug } = await props.params
  const guide = GUIDES.find((item) => item.slug === slug)

  if (!guide) {
    return {
      title: "Handleiding",
      description: "Deze handleiding is niet gevonden of is niet langer beschikbaar.",
    }
  }

  return {
    title: guide.title,
    description: guide.shortDescription,
  }
}

const GuideDetailPage: React.FC<GuideDetailPageProps> = async (props) => {
  const { slug } = await props.params
  const guide = GUIDES.find((item) => item.slug === slug)

  if (!guide) {
    notFound()
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="-mx-4 mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm subtle-mesh sm:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Handleiding</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{guide.title}</h1>
          <p className="mt-4 text-slate-600">{guide.overview}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-lg font-semibold">Stappen</h2>
            <ol className="mt-5 space-y-3 text-sm text-slate-700">
              {guide.steps.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    {guide.steps.indexOf(item) + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-lg font-semibold">Checklist</h2>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {guide.checklist.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
            <h2 className="text-lg font-semibold">Wil je dit netjes aanpakken?</h2>
            <p className="mt-3 text-sm text-white/70">
              We helpen je met scope, implementatie, security en go-live.
            </p>
            <div className="mt-6 flex flex-col gap-3">
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
                Plan een intake
              </a>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-12">
        <a href="/guides" className="text-sm font-medium text-slate-900 underline">
          Terug naar handleidingen
        </a>
      </div>
    </section>
  )
}

export default GuideDetailPage
