import type { Metadata } from "next"
import { Check, MapPin, Shield, Users, Target, Clock, Sparkles } from "lucide-react"
import { buildBreadcrumbJsonLd } from "../jsonld"

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Over ons", url: "https://youraiworker.nl/about" },
])

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export const metadata: Metadata = {
  title: "Over ons | Your AI Worker - AI-agent implementatie voor Nederland",
  description: "Wij helpen Nederlandse bedrijven met productierijpe AI-agents voor automatisering van e-mail, chat, planning en CRM. KvK 95290475, gevestigd in Amsterdam.",
  alternates: {
    canonical: "https://youraiworker.nl/about",
  },
  openGraph: {
    title: "Over Your AI Worker | AI-agent implementatie",
    description: "Nederlands bedrijf gespecialiseerd in productierijpe AI-agents. Van intake tot livegang met duidelijke scope en support.",
    url: "https://youraiworker.nl/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "Over Your AI Worker | Nederlandse AI-agent implementatie",
    description: "Wij bouwen productierijpe AI-agents voor Nederlandse bedrijven. Geen maandelijkse kosten, wel heldere scope en support.",
  },
}

const COMPANY_VALUES = [
  {
    icon: Target,
    title: "Focus op resultaat",
    description: "We starten met één workflow die meetbaar verschil maakt, niet met pilots die nooit live gaan.",
  },
  {
    icon: Shield,
    title: "Security by design",
    description: "Toegangsbeheer, logging en compliance zijn geen add-ons maar ingebouwd vanaf het begin.",
  },
  {
    icon: Clock,
    title: "Sneller dan je denkt",
    description: "Meeste workflows staan binnen 3-10 werkdagen live, niet in maandenlange trajecten.",
  },
  {
    icon: Users,
    title: "Echte eigenaar",
    description: "Je krijgt een dedicated contactpersoon die je workflow kent en blijft volgen.",
  },
] as const

const WHY_DIFFERENT = [
  "Eenmalige setup fee, geen verplichte maandelijkse kosten",
  "Duidelijke scope vooraf, geen vage uitkomstbeloftes",
  "48 uur warranty en 2 weken break-fix support standaard",
  "Nederlandse klantenservice die je kent en snapt",
  "Gevestigd in Amsterdam met KvK-inschrijving",
] as const

const COMPANY_FACTS: Array<{ label: string; value: string; href?: string }> = [
  { label: "KvK-nummer", value: "95290475", href: "https://www.kvk.nl/zoeken/?q=95290475" },
  { label: "BTW-nummer", value: "NL867715849B01", href: "https://ec.europa.eu/taxation_customs/vies/#/vat-validation?countryCode=NL&vatNumber=867715849B01" },
  { label: "Locatie", value: "Amsterdam, Nederland" },
  { label: "Reactietijd", value: "Binnen 1 werkdag" },
]

const AboutPage: React.FC = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <main className="mx-auto max-w-6xl px-4 py-20">
        {/* Hero */}
        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Wij bouwen AI-agents die echt werken
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Your AI Worker helpt Nederlandse bedrijven met productierijpe AI-agents voor e-mail, chat, 
              planning en CRM-processen. Geen experimenten, maar workflows met eigenaar, logging en support.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Gevestigd in Amsterdam. Werkend voor bedrijven door heel Nederland.
            </p>
          </div>
        </section>

        {/* Company values */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Hoe we werken</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Onze aanpak is ontstaan uit wat we zagen misgaan bij AI-implementaties: 
            te grootte scope, te weinig eigenaarschap, geen logging. Dat doen we anders.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {COMPANY_VALUES.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Why different */}
        <section className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Waarom kiezen voor Your AI Worker?</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            We zijn niet het enige bedrijf dat met AI werkt. Dit maakt ons anders voor organisaties 
            die serieus zijn over automatisering.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {WHY_DIFFERENT.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Company facts */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Bedrijfsgegevens</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-slate-200 bg-white p-4 text-center transition-all hover:border-slate-300 hover:shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{fact.label}</p>
                {fact.href ? (
                  <a
                    href={fact.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-slate-900 underline underline-offset-2 hover:text-slate-700"
                  >
                    {fact.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm font-semibold text-slate-900">{fact.value}</p>
          )}
        </div>
      ))}
    </div>
  </section>
  {/* CTA */}
  <section className="mt-14 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white sm:p-10">
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold tracking-tight">Klaar om te starten?</h2>
      <p className="mt-4 text-white/80">Plan een intake van 20 minuten en ontdek wat er mogelijk is voor jouw team.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href="/contact" className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100">Plan een intake</a>
        <a href="/pricing" className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">Bekijk prijzen</a>
      </div>
    </div>
  </section>
</main>
</>
)
}

export default AboutPage