import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Handleidingen",
  description: "Praktische guides voor AI-agents: opzetten, testen, beveiligen en opschalen.",
  alternates: {
    canonical: "https://youraiworker.nl/guides",
  },
  openGraph: {
    title: "Handleidingen voor AI-agents | Your AI Worker",
    description: "Praktische stappenplannen voor scope, approvals, testen, security en go-live van AI-agents.",
    url: "https://youraiworker.nl/guides",
    images: [
      {
        url: "/og.png",
        alt: "Your AI Worker handleidingen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-agent handleidingen | Your AI Worker",
    description: "Concrete guides voor workflow implementatie, approvals en beveiliging.",
    images: ["/og.png"],
  },
}

import { GUIDES } from "../../lib/catalog"

const guides = GUIDES.map((guide) => {
  return {
    slug: guide.slug,
    icon: guide.icon,
    title: guide.title,
    description: guide.shortDescription,
  }
}) satisfies Array<{
  slug: string
  icon: LucideIcon
  title: string
  description: string
}>

const GuidesPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="motion-fade-in -mx-4 mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm subtle-mesh sm:p-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Handleidingen</h1>
          <p className="mt-4 text-slate-600">
            Praktische handleidingen voor AI-agents: van scope en approvals tot testen, security en go-live. Geen
            hype, wel concrete stappen die we ook in managed implementaties gebruiken.
          </p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Voor wie</p>
            <p className="mt-2 text-sm text-slate-700">Teams die een eerste workflow veilig en meetbaar live willen zetten.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Wat je krijgt</p>
            <p className="mt-2 text-sm text-slate-700">Stappenplan, checklist en duidelijke eisen voor toegang, testen en logging.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Approvals</p>
            <p className="mt-2 text-sm text-slate-700">Per guide benoemen we waar menselijke review of expliciete goedkeuring hoort.</p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide, index) => (
          <div
            key={guide.title}
            className={`hover-lift motion-fade-in rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-md ${index % 3 === 0 ? "motion-delay-1" : index % 3 === 1 ? "motion-delay-2" : "motion-delay-3"}`}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <guide.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-semibold">{guide.title}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{guide.description}</p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                Praktische checklist
              </span>
              <a
                href={`/guides/${guide.slug}`}
                className="inline-block text-sm font-medium text-slate-900 underline"
              >
                Bekijk details
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="motion-fade-in motion-delay-4 mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">Van guide naar implementatie</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          De guides beschrijven de minimale basis. In een traject vertalen wij dit naar een concrete workflow,
          approvals, testset en beheerde go-live in jouw tooling.
        </p>
      </div>

      <div className="motion-fade-in motion-delay-4 mt-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-12 text-white sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight">Klaar om te automatiseren?</h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Vertel welke workflow je als eerste wil aanpakken. Wij helpen met scope, implementatie, approvals en
          gecontroleerde livegang.
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
            Plan een intake
          </a>
        </div>
      </div>
    </section>
  )
}

export default GuidesPage
