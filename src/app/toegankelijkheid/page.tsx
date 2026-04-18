import type { Metadata } from "next"
import { Accessibility, CheckCircle, AlertCircle, Mail, ExternalLink } from "lucide-react"
import { buildBreadcrumbJsonLd } from "../jsonld"

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Toegankelijkheid", url: "https://youraiworker.nl/toegankelijkheid" },
])

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export const metadata: Metadata = {
  title: "Toegankelijkheid | WCAG 2.1 AA | Your AI Worker",
  description: "Onze toegankelijkheidsverklaring. We streven naar een website die voor iedereen goed bruikbaar is, inclusief mensen met een beperking.",
  alternates: {
    canonical: "https://youraiworker.nl/toegankelijkheid",
  },
  openGraph: {
    title: "Toegankelijkheidsverklaring | Your AI Worker",
    description: "We streven naar een inclusieve website die voor iedereen goed bruikbaar is.",
    url: "https://youraiworker.nl/toegankelijkheid",
    images: [{ url: "https://youraiworker.nl/toegankelijkheid/opengraph-image", width: 1200, height: 630, alt: "Toegankelijkheid WCAG 2.1 AA | Your AI Worker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toegankelijkheid | Your AI Worker",
    description: "Inclusief digitaal. Onze toegankelijkheidsverklaring.",
    images: ["https://youraiworker.nl/toegankelijkheid/twitter-image"],
  },
}

const COMPLIANCE_ITEMS = [
  { label: "Toetsenbordnavigatie", status: "ondersteund" },
  { label: "Schermlezer compatibel", status: "ondersteund" },
  { label: "Voldoende kleurcontrast", status: "ondersteund" },
  { label: "Schaalbare tekst tot 200%", status: "ondersteund" },
  { label: "Verklarende links", status: "ondersteund" },
  { label: "Formulier labels", status: "ondersteund" },
  { label: "Alt-teksten voor afbeeldingen", status: "ondersteund" },
  { label: "Focus indicators", status: "ondersteund" },
] as const

const KNOWN_LIMITATIONS = [
  {
    title: "Chat demo interface",
    description: "De interactieve chat demo bevat animaties die niet voor alle gebruikers essentieel zijn. Alternatieve beschrijvingen staan in de tekst zelf.",
  },
  {
    title: "Tabellen op mobiel",
    description: "Brede vergelijkingstabellen vereisen horizontaal scrollen op kleine schermen. Dit is de standaard voor data-tabellen.",
  },
] as const

export default function ToegankelijkheidPage(): React.ReactNode {
  const today = new Date().toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" })
  
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20" aria-labelledby="accessibility-title">
        <div className="text-center">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50">
            <Accessibility className="h-8 w-8 text-emerald-600" aria-hidden="true" />
          </div>
          <h1 id="accessibility-title" className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Toegankelijkheidsverklaring
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            We streven naar een website die voor iedereen goed bruikbaar is, ongeacht beperking of hulpmiddel.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Laatste controle: {today}
          </div>
        </div>

        {/* WCAG Compliance Badge */}
        <div className="mt-10 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">WCAG 2.1 niveau AA</h2>
              <p className="mt-1 text-sm text-slate-600">
                We volgen de Web Content Accessibility Guidelines van het W3C.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              In uitvoering
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            We streven ernaar om te voldoen aan het niveau A en AA van de WCAG 2.1 richtlijnen.
            Dit betekent onder andere dat je de site kunt gebruiken met een toetsenbord, schermlezer,
            en dat het contrast voldoende is voor gebruikers met een visuele beperking.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">Wat we ondersteunen</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {COMPLIANCE_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
                  <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-sm text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Known Limitations */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/50 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 bg-white text-amber-700">
              <AlertCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Bekende beperkingen</h2>
          </div>
          <ul className="mt-5 space-y-4">
            {KNOWN_LIMITATIONS.map((limitation) => (
              <li key={limitation.title} className="rounded-xl border border-amber-200/70 bg-white px-4 py-3">
                <p className="font-medium text-slate-900">{limitation.title}</p>
                <p className="mt-1 text-sm text-slate-600">{limitation.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Testing & Feedback */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Hoe we testen</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">1</span>
                <span>Automatische checks met Lighthouse en axe-core</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">2</span>
                <span>Handmatige toetsenbordnavigatie tests</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">3</span>
                <span>Screen reader testing (VoiceOver, NVDA)</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">4</span>
                <span>Mobile accessibility checks</span>
              </li>
            </ul>
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-sm text-slate-600">
                <strong className="text-slate-900">Noot:</strong> We testen continu en verbeteren waar nodig.
                Deze verklaring wordt bijgewerkt bij significante wijzigingen.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Feedback of problemen?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Loop je tegen een toegankelijkheidsprobleem aan? We willen het weten zodat we het kunnen oplossen.
            </p>
            <div className="mt-5 space-y-3">
              <a 
                href="mailto:info@youraiworker.nl?subject=Toegankelijkheidsfeedback" 
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-slate-300"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                  <Mail className="h-5 w-5 text-slate-600" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">E-mail ons</p>
                  <p className="text-sm text-slate-500 truncate">info@youraiworker.nl</p>
                </div>
              </a>
              <a 
                href="https://www.w3.org/WAI/WCAG21/quickref/" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-slate-300"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                  <ExternalLink className="h-5 w-5 text-slate-600" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">WCAG 2.1 richtlijnen</p>
                  <p className="text-sm text-slate-500 truncate">w3.org/WAI/WCAG21</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-500">
            Deze verklaring is opgesteld op {today}. Contact: info@youraiworker.nl
          </p>
        </div>
      </section>
    </>
  )
}