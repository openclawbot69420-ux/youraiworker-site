import type { Metadata } from "next"
import { buildBreadcrumbJsonLd } from "../jsonld"

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Privacy", url: "https://youraiworker.nl/privacy" },
])

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacybeleid van Your AI Worker.",
  alternates: {
    canonical: "https://youraiworker.nl/privacy",
  },
}

const LAST_UPDATED = "15 maart 2026"

const PrivacyPage: React.FC = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <main className="mx-auto max-w-4xl px-4 py-20">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacybeleid</h1>
          <p className="mt-3 text-xs text-slate-500">Laatst bijgewerkt: {LAST_UPDATED}</p>
          <p className="mt-4 text-slate-600">
            Wij respecteren je privacy en verwerken persoonsgegevens alleen wanneer dat nodig is om contact op te nemen of een aanvraag te behandelen.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"> AVG / GDPR </p>
              <p className="mt-2 text-sm text-slate-700">Verwerking volgens AVG/GDPR-principes.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"> EU verwerking </p>
              <p className="mt-2 text-sm text-slate-700"> Waar mogelijk verwerken we gegevens binnen de EU. </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"> Geen derden </p>
              <p className="mt-2 text-sm text-slate-700"> Geen verkoop of deling van persoonsgegevens met derden. </p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Welke gegevens verzamelen we?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Via het contactformulier kunnen we je naam, e-mailadres, bedrijfsnaam en bericht ontvangen. We gebruiken deze gegevens uitsluitend om je aanvraag te behandelen en eventuele opvolging te doen.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Rechtsgrond</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                We verwerken gegevens op basis van gerechtvaardigd belang (het beantwoorden van je vraag en het leveren van onze dienst) en, waar van toepassing, uitvoering van een overeenkomst.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Hoe gebruiken we je gegevens?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Alleen voor communicatie over je aanvraag, intake of voorstel. We gebruiken de gegevens niet voor verkoop aan derden en delen persoonsgegevens niet met derde partijen.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">AVG / GDPR en verwerking</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                We hanteren AVG/GDPR-principes zoals dataminimalisatie, doelbinding en beperkte bewaartermijnen. Waar mogelijk verwerken we gegevens binnen de EU. In sommige gevallen kan verwerking (deels) buiten de EU plaatsvinden, bijvoorbeeld door gebruikte infrastructuur of leveranciers. In dat geval zorgen we voor passende waarborgen.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Bewaartermijn</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                We bewaren je gegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld of zolang dit wettelijk vereist is.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Je rechten</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Je kunt inzage, correctie of verwijdering van je persoonsgegevens aanvragen. Ook kun je bezwaar maken tegen verwerking of vragen om gegevensoverdraagbaarheid waar dit van toepassing is. Stuur hiervoor een e-mail naar info@youraiworker.nl.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900"> Vragen over privacy? </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            Neem contact met ons op als je vragen hebt over gegevensverwerking, bewaartermijnen of je privacyrechten. We reageren zo snel mogelijk.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Naar contact
            </a>
            <a
              href="mailto:info@youraiworker.nl"
              className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 sm:w-auto"
            >
              <span className="break-all">info@youraiworker.nl</span>
            </a>
          </div>
        </section>
      </main>
    </>
  )
}

export default PrivacyPage
