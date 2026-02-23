import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Beveiliging",
  description: "Hoe wij omgaan met security, toegangsbeheer en data-bescherming.",
}

const SecurityPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Beveiliging</h1>
      <p className="mt-4 text-slate-600">
        Security is geen add-on — het zit in elk onderdeel van hoe we werken.
      </p>

      <div className="mt-12 space-y-8">
        {[
          [
            "Toegangsbeheer",
            "Least-privilege per integratie. Elke agent krijgt alleen toegang tot wat nodig is voor de specifieke workflow.",
          ],
          [
            "Versleutelde verbindingen",
            "Remote access via Tailscale — een identity-based mesh netwerk zonder open poorten op je systemen.",
          ],
          [
            "Secrets management",
            "Geen API-keys of wachtwoorden in code. Alles via encrypted secret stores met rotatie-ondersteuning.",
          ],
          [
            "Logging & traceability",
            "Elke actie van een agent wordt gelogd. Volledige audit trail voor compliance en troubleshooting.",
          ],
          [
            "Omgevingsscheiding",
            "Waar nodig scheiden we test- en productieomgevingen om risico's te minimaliseren.",
          ],
          [
            "Dagelijkse backups",
            "Automatische dagelijkse backups van configuratie en data, zodat je altijd kunt herstellen.",
          ],
        ].map(([title, desc]) => (
          <div key={title} className="border-b border-slate-200 pb-8">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SecurityPage
