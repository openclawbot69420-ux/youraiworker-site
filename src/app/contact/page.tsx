import type { Metadata } from "next"
import { ContactForm } from "./ContactForm"
import { TrustBar } from "../../components/TrustBar"
import { buildBreadcrumbJsonLd } from "../jsonld"

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Contact", url: "https://youraiworker.nl/contact" },
])

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export const metadata: Metadata = {
  title: "Contact",
  description: "Plan een intake, stel je vraag of vraag een voorstel aan. Binnen 1 werkdag reactie.",
  alternates: {
    canonical: "https://youraiworker.nl/contact",
  },
  openGraph: {
    title: "Contact voor AI-agent intake | Your AI Worker",
    description: "Bespreek je workflow, scope en planning. Binnen 1 werkdag een eerste reactie.",
    url: "https://youraiworker.nl/contact",
    images: [
      {
        url: "/og-home.png",
        alt: "Your AI Worker - contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan AI-agent intake | Your AI Worker",
    description: "Vraag een intake of voorstel aan voor AI-automatisering. Binnen 1 werkdag reactie, heldere scope.",
    images: ["/og-home.png"],
  },
}

const ContactPage: React.FC = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <section className="mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact</h1>
        <p className="mt-4 text-slate-600">
          Plan een intake, stel een vraag, of vraag een voorstel aan. Je krijgt binnen 1 werkdag reactie.
        </p>
        <div className="mt-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold">Stuur je aanvraag</h2>
            <p className="mt-2 text-sm text-slate-600">
              Vertel kort wat je wil automatiseren. Hoe concreter, hoe sneller we kunnen scopen.
            </p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Liever direct plannen?</p>
              <p className="mt-1 text-slate-600">
                Plan een intake van 20 minuten. Je krijgt binnen 1 werkdag reactie en een voorstel met scope en planning.
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <a
                  href="https://cal.com/youraiworker"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                >
                  Plan intake (20 min)
                </a>
                <a
                  href="mailto:info@youraiworker.nl"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
                >
                  Mail: info@youraiworker.nl
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h2 className="text-lg font-semibold">Wat gebeurt er daarna?</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-900">
                    1
                  </span>
                  <span>We nemen je aanvraag door en stellen 2 tot 5 verduidelijkende vragen.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-900">
                    2
                  </span>
                  <span>Je krijgt een voorstel met scope, planning, integraties en vaste uitgangspunten.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-900">
                    3
                  </span>
                  <span>Na akkoord bouwen we de agent, testen met echte cases en doen we een korte handover.</span>
                </li>
              </ol>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white sm:p-8">
              <h2 className="text-lg font-semibold">Checklist voor een snelle intake</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>- Voorbeeld van een echte case (e-mail, chat, ticket)</li>
                <li>- Welke tool is bron van waarheid (CRM, inbox, sheets)</li>
                <li>- Wie is owner en wie moet goedkeuren</li>
                <li>- Wat is succes na 14 dagen?</li>
              </ul>
              <a
                href="/pricing"
                className="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
              >
                Bekijk prijzen
              </a>
            </div>
          </div>
        </div>

        {/* Trust bar with verified badges */}
        <TrustBar />
      </section>
    </>
  )
}

export default ContactPage
