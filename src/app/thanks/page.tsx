import type { Metadata } from "next"
import { CheckCircle, Mail, Calendar, Clock, ArrowLeft, MessageSquare } from "lucide-react"
import { buildBreadcrumbJsonLd } from "../jsonld"

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Bedankt", url: "https://youraiworker.nl/thanks" },
])

export const metadata: Metadata = {
  title: "Bedankt voor je aanmelding | Your AI Worker",
  description: "Je aanmelding is ontvangen. We nemen binnen 1 werkdag contact met je op.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://youraiworker.nl/thanks",
  },
}

export default function ThanksPage(): React.ReactElement {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <section className="mx-auto max-w-3xl px-4 py-20 sm:py-28">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50">
            <CheckCircle className="h-10 w-10 text-emerald-600" aria-hidden="true" />
          </div>

          {/* Main Message */}
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Bedankt voor je aanmelding
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Je bericht is succesvol ontvangen. We nemen zo snel mogelijk contact met je op.
          </p>

          {/* Response Time Badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
            <Clock className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <span>Reactie binnen <strong className="text-slate-900">1 werkdag</strong></span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Wat je kan verwachten</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <span className="text-sm font-bold">1</span>
              </div>
              <p className="mt-3 text-sm font-medium text-slate-900">Bevestiging per mail</p>
              <p className="mt-1 text-xs text-slate-600">Je ontvangt een korte bevestiging</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <span className="text-sm font-bold">2</span>
              </div>
              <p className="mt-3 text-sm font-medium text-slate-900">Persoonlijke reactie</p>
              <p className="mt-1 text-xs text-slate-600">Binnen 1 werkdag van ons team</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <span className="text-sm font-bold">3</span>
              </div>
              <p className="mt-3 text-sm font-medium text-slate-900">Vervolgstappen</p>
              <p className="mt-1 text-xs text-slate-600">Samen een plan maken</p>
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href="/contact"
            className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
              <Calendar className="h-5 w-5 text-slate-700" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-900">Direct een afspraak plannen</p>
              <p className="text-sm text-slate-600">Plan een intake van 20 minuten</p>
            </div>
            <ArrowLeft className="h-5 w-5 shrink-0 -rotate-180 text-slate-400 group-hover:text-slate-600" aria-hidden="true" />
          </a>
          <a
            href="mailto:info@youraiworker.nl"
            className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
              <Mail className="h-5 w-5 text-slate-700" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-900">Liever mailen?</p>
              <p className="text-sm text-slate-600">info@youraiworker.nl</p>
            </div>
            <ArrowLeft className="h-5 w-5 shrink-0 -rotate-180 text-slate-400 group-hover:text-slate-600" aria-hidden="true" />
          </a>
        </div>

        {/* Quick FAQ */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2 text-slate-900">
            <MessageSquare className="h-5 w-5" aria-hidden="true" />
            <h3 className="font-semibold">Veelgestelde vragen</h3>
          </div>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-sm font-medium text-slate-900">Hoe snel krijg ik reactie?</dt>
              <dd className="mt-1 text-sm text-slate-600">
                Binnen 1 werkdag (maandag tot en met vrijdag, 09:00 - 17:00 CET).
              </dd>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <dt className="text-sm font-medium text-slate-900">Wat gebeurt er na de eerste reactie?</dt>
              <dd className="mt-1 text-sm text-slate-600">
                We sturen je een korte intake vragenlijst of plannen direct een 20-minuten call om je use-case te bespreken.
              </dd>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <dt className="text-sm font-medium text-slate-900">Zijn er kosten verbonden aan de intake?</dt>
              <dd className="mt-1 text-sm text-slate-600">
                Nee, de eerste intake is vrijblijvend en kosteloos. Pas na akkoord op het voorstel starten we met de implementatie.
              </dd>
            </div>
          </dl>
          <a
            href="/faq"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Bekijk alle FAQ
            <ArrowLeft className="h-4 w-4 -rotate-180" aria-hidden="true" />
          </a>
        </div>

        {/* Back to Home */}
        <div className="mt-10 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Terug naar de homepage
          </a>      </div>
    </section>
  </>
  )
}
