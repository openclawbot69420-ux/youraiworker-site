import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Clock } from "lucide-react"
import { ReadingTime } from "../../../components/ReadingTime"
import { GUIDES } from "../../../lib/catalog"

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
      <div className="motion-fade-in -mx-4 mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm subtle-mesh sm:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Handleiding</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{guide.title}</h1>
          <div className="mt-2">
            <ReadingTime steps={guide.steps} checklist={guide.checklist} />
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
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {guide.checklist.map((item) => (
                <li key={item}>{item}</li>
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
  )
}

export default GuideDetailPage
