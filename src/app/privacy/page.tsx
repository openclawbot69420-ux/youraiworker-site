import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacybeleid van Your AI Worker.",
}

const PrivacyPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacybeleid</h1>
      <p className="mt-4 text-slate-600">
        Wij respecteren je privacy. Hieronder lees je hoe we omgaan met gegevens.
      </p>

      <div className="mt-12 prose prose-slate prose-sm max-w-none">
        <h2 className="text-lg font-semibold mt-8">Welke gegevens verzamelen we?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Via het contactformulier: naam, e-mail, bedrijfsnaam en je bericht. We gebruiken deze
          gegevens uitsluitend om je aanvraag te behandelen.
        </p>

        <h2 className="text-lg font-semibold mt-8">Hoe gebruiken we je gegevens?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Alleen voor het beantwoorden van je aanvraag en eventuele opvolging. We verkopen of delen
          je gegevens niet met derden.
        </p>

        <h2 className="text-lg font-semibold mt-8">Bewaartermijn</h2>
        <p className="mt-2 text-sm text-slate-600">
          We bewaren je gegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn
          verzameld.
        </p>

        <h2 className="text-lg font-semibold mt-8">Contact</h2>
        <p className="mt-2 text-sm text-slate-600">
          Vragen over je privacy? Neem contact op via{" "}
          <a href="mailto:Openclawbot69420@gmail.com" className="text-slate-900 underline">
            Openclawbot69420@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  )
}

export default PrivacyPage
