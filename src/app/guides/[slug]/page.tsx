import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Clock, Calendar } from "lucide-react"
import { ReadingTime } from "../../../components/ReadingTime"
import { ShareButton } from "../../../components/ShareButton"
import { PrintButton } from "../../../components/PrintButton"
import { GUIDES } from "../../../lib/catalog"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildHowToJsonLd } from "../../jsonld"
import { formatTimeAgo } from "../../../lib/formatTimeAgo"

const SITE_URL = "https://youraiworker.nl"

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

const GUIDE_APPROVAL_NOTES: Record<string, string[]> = {
  "eerste-agent": [
    "Leg vooraf vast welke acties autonoom mogen lopen en welke eerst menselijke review nodig hebben.",
    "Start met approvals op kritieke stappen (bijv. verzenden of muteren) en versoepel pas na testresultaten.",
    "Log elke goedkeuring/afwijzing zodat je regels later kunt aanscherpen.",
  ],
  security: [
    "Koppel approvals aan risico: hoe groter de impact, hoe explicieter de goedkeuring.",
    "Beperk wie productie-goedkeuring mag geven en houd audit trail per beslissing bij.",
    "Test ook failure- en timeout-paden van approval-stappen.",
  ],
}

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

  const ogImage = `${SITE_URL}/og-home.png`
  const canonicalUrl = `${SITE_URL}/guides/${slug}`
  const publishDate = guide.publishedAt
  const modifyDate = guide.updatedAt ?? guide.publishedAt

  return {
    title: guide.title,
    description: guide.shortDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${guide.title} | Your AI Worker`,
      description: guide.shortDescription,
      url: canonicalUrl,
      type: "article",
      siteName: "Your AI Worker",
      locale: "nl_NL",
      publishedTime: publishDate,
      modifiedTime: modifyDate,
      authors: ["https://youraiworker.nl"],
      section: "Handleidingen",
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: guide.title,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | Your AI Worker`,
      description: guide.shortDescription,
      images: [ogImage],
    },
    other: {
      "article:published_time": publishDate,
      "article:modified_time": modifyDate,
      "article:author": "Your AI Worker",
      "article:section": "AI-agent implementatie",
    },
  }
}

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

const GuideDetailPage: React.FC<GuideDetailPageProps> = async (props) => {
  const { slug } = await props.params
  const guide = GUIDES.find((item) => item.slug === slug)
  if (!guide) {
    notFound()
  }

  // Keywords per guide for better SEO structured data
  const GUIDE_KEYWORDS: Record<string, string[]> = {
    "eerste-agent": ["AI agent", "opzetten", "implementatie", "workflow automatisering", "productie", "testen"],
    "security": ["beveiliging", "security", "permissions", "logging", "audit", "AVG", "privacy", "compliance"],
  }

  // Determine article section based on guide content
  const getArticleSection = (guideSlug: string): string | undefined => {
    if (guideSlug === "security") return "Beveiliging"
    if (guideSlug === "eerste-agent") return "Implementatie"
    return undefined
  }

  const articleJsonLd = buildArticleJsonLd({
    headline: guide.title,
    description: guide.shortDescription,
    url: `${SITE_URL}/guides/${slug}`,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt ?? guide.publishedAt,
    author: { name: "Your AI Worker", url: SITE_URL },
    publisher: { name: "Your AI Worker", url: SITE_URL, logo: `${SITE_URL}/icon-512.png` },
    image: `${SITE_URL}/og-home.png`,
    keywords: GUIDE_KEYWORDS[slug],
    articleSection: getArticleSection(slug),
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Handleidingen", url: `${SITE_URL}/guides` },
    { name: guide.title, url: `${SITE_URL}/guides/${slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      {/* HowTo schema enables step-by-step rich results in Google */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(buildHowToJsonLd({ name: guide.title, description: guide.shortDescription, url: `${SITE_URL}/guides/${slug}`, totalTime: `PT${Math.max(1, Math.ceil([guide.overview, ...guide.steps, ...guide.checklist].join(" ").split(/\s+/).length / 200))}M`, steps: guide.steps, })) }} />
      <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="motion-fade-in -mx-4 mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm subtle-mesh sm:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Handleiding</p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{guide.title}</h1>
            <ShareButton
              url={`https://youraiworker.nl/guides/${slug}`}
              title={`${guide.title} | Your AI Worker`}
              description={guide.shortDescription}
            />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <ReadingTime steps={guide.steps} checklist={guide.checklist} />
            {guide.updatedAt && (
              <span className="inline-flex items-center gap-1.5" title={guide.updatedAt ? formatDate(guide.updatedAt) : undefined}>
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={guide.updatedAt}>
                  Bijgewerkt: {formatTimeAgo(guide.updatedAt)}
                </time>
              </span>
            )}
          </div>
          <p className="mt-4 text-slate-600">{guide.overview}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Doel</p>
              <p className="mt-2 text-sm text-slate-700">Een workflow veilig en duidelijk inrichten, niet alleen een demo laten draaien.</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Uitkomst</p>
              <p className="mt-2 text-sm text-slate-700">Concrete stappen, checklist en beslismomenten voor implementatie en go-live.</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Approvals</p>
              <p className="mt-2 text-sm text-slate-700">Menselijke review hoort bij risicovolle acties; bepaal dit expliciet per stap.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="motion-fade-in motion-delay-1 rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-lg font-semibold">Stappen</h2>
            <ol className="mt-5 space-y-3 text-sm text-slate-700">
              {guide.steps.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="motion-fade-in motion-delay-2 mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-lg font-semibold">Approvals en reviews in deze guide</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              {(GUIDE_APPROVAL_NOTES[guide.slug] ?? [
                "Bepaal expliciet welke acties autonoom mogen lopen en welke menselijke review nodig hebben.",
                "Leg approvers, timeouts en escalaties vast voordat je live gaat.",
                "Log beslissingen en uitzonderingen zodat je de workflow later kunt verbeteren.",
              ]).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="space-y-6">
          <div className="motion-fade-in motion-delay-1 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-lg font-semibold">Checklist</h2>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
              {guide.checklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-emerald-200 bg-emerald-50 text-emerald-600">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="motion-fade-in motion-delay-2 rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-lg font-semibold text-slate-900">Wat wij managed implementeren</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>- Workflow scope en acceptatiecriteria concretiseren</li>
              <li>- Integraties + permissions/approvals technisch inrichten</li>
              <li>- Testcases uitvoeren en go-live begeleiden</li>
            </ul>
          </div>
          <div className="motion-fade-in motion-delay-3 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
            <h2 className="text-lg font-semibold">Wil je dit netjes aanpakken?</h2>
            <p className="mt-3 text-sm text-white/70">
              We vertalen deze guide naar een werkende implementatie in jouw tools, inclusief approvals, security en gecontroleerde livegang.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a href="/pricing" className="rounded-lg bg-white px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors">
                Bekijk packages
              </a>
              <a href="/contact" className="rounded-lg border border-white/30 px-6 py-3 text-center text-sm font-medium text-white hover:bg-white/10 transition-colors">
                Plan een intake
              </a>
            </div>
          </div>
        </aside>
      </div>
      <div className="motion-fade-in motion-delay-4 mt-12">
        <a href="/guides" className="text-sm font-medium text-slate-900 underline">
          Terug naar handleidingen
        </a>
      </div>
      </section>
    </>
  )
}

export default GuideDetailPage
