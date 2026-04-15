import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"
import { Calendar, Clock, Rss } from "lucide-react"
import { buildBreadcrumbJsonLd, buildCollectionPageJsonLd } from "../jsonld"
import { GuidesList } from "./GuidesList"
import { GUIDES } from "../../lib/catalog"

export const metadata: Metadata = {
  title: "Handleidingen | AI-agent guides en best practices | Your AI Worker",
  description: "Praktische guides voor AI-agents: opzetten, testen, beveiligen en opschalen.",
  alternates: {
    canonical: "https://youraiworker.nl/guides",
  },
  openGraph: {
    title: "Handleidingen voor AI-agents | Your AI Worker",
    description: "Praktische stappenplannen voor scope, approvals, testen, security en go-live van AI-agents.",
    url: "https://youraiworker.nl/guides",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-agent handleidingen | Your AI Worker",
    description: "Concrete guides voor workflow implementatie, approvals en beveiliging.",
  },
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Date(dateString).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

// Calculate reading time based on guide content (overview + steps + checklist)
const calculateReadingTime = (guide: (typeof GUIDES)[number]): number => {
  const content = [guide.overview, ...guide.steps, ...guide.checklist].join(" ")
  const wordCount = content.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

interface Guide {
  slug: string
  title: string
  description: string
  updatedAt?: string
  readingMinutes: number
}

const guides: Guide[] = GUIDES.map((guide) => ({
  slug: guide.slug,
  title: guide.title,
  description: guide.shortDescription,
  updatedAt: guide.updatedAt,
  readingMinutes: calculateReadingTime(guide),
}))

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

const GuidesPage: React.FC = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: "https://youraiworker.nl/" },
    { name: "Handleidingen", url: "https://youraiworker.nl/guides" },
  ])

  const collectionJsonLd = buildCollectionPageJsonLd({
    name: "Your AI Worker - Handleidingen",
    description: "Praktische handleidingen voor AI-agents: van scope en approvals tot testen, security en go-live.",
    url: "https://youraiworker.nl/guides",
    items: GUIDES.map((guide) => ({
      name: guide.title,
      url: `https://youraiworker.nl/guides/${guide.slug}`,
      description: guide.shortDescription,
    })),
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(collectionJsonLd) }}
      />
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="motion-fade-in -mx-4 mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm subtle-mesh sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Handleidingen
              </h1>
              <p className="mt-4 text-slate-600">
                Praktische handleidingen voor AI-agents: van scope en approvals tot
                testen, security en go-live. Geen hype, wel concrete stappen die we
                ook in managed implementaties gebruiken.
              </p>
            </div>
            <a
              href="/guides/rss.xml"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
              title="Abonneer op updates via RSS"
            >
              <Rss className="h-4 w-4 text-orange-500" aria-hidden="true" />
              <span>RSS</span>
            </a>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Voor wie
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Teams die een eerste workflow veilig en meetbaar live willen zetten.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Wat je krijgt
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Stappenplan, checklist en duidelijke eisen voor toegang, testen en
                logging.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Approvals
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Per guide benoemen we waar menselijke review of expliciete
                goedkeuring hoort.
              </p>
            </div>
          </div>
          {/* Search hint */}
          <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-600">🔍</span>
            <span>Gebruik de zoekbalk hieronder om snel de juiste handleiding te vinden</span>
          </div>
        </div>

        {/* Guides list with search */}
        <GuidesList guides={guides} />

        <div className="motion-fade-in motion-delay-4 mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Van guide naar implementatie
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            De guides beschrijven de minimale basis. In een traject vertalen wij
            dit naar een concrete workflow, approvals, testset en beheerde go-live
            in jouw tooling.
          </p>
        </div>

        <div className="motion-fade-in motion-delay-4 mt-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-12 text-white sm:px-12">
          <h2 className="text-2xl font-bold tracking-tight">
            Klaar om te automatiseren?
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Vertel welke workflow je als eerste wil aanpakken. Wij helpen met
            scope, implementatie, approvals en gecontroleerde livegang.
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
      </section>
    </>
  )
}

export default GuidesPage
