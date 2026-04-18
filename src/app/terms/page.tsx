import type { Metadata } from "next"
import { buildBreadcrumbJsonLd } from "../jsonld"
import { PrintButton } from "../../components/PrintButton"

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Algemene voorwaarden", url: "https://youraiworker.nl/terms" },
])

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export const metadata: Metadata = {
  title: "Algemene voorwaarden | Your AI Worker",
  description: "Algemene voorwaarden van Your AI Worker.",
  alternates: {
    canonical: "https://youraiworker.nl/terms",
  },
}

const TERMS_UPDATED_AT = "2026-03-20"

const TermsPage: React.FC = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <main className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Juridisch</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Algemene voorwaarden
              </h1>
            </div>
            <PrintButton />
          </div>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Hieronder vind je een korte, praktische samenvatting van hoe Your AI Worker werkt.
          </p>
          <div className="mt-8 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-800">Laatst bijgewerkt:</span> {TERMS_UPDATED_AT}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Disclaimer:</span> Dit document is geen juridisch advies.
              Bij verschillen tussen dit document en een ondertekend voorstel of overeenkomst, geldt de ondertekende overeenkomst.
            </p>
            <p>
              <span className="font-semibold text-slate-800">Download:</span>{" "}
              <a className="underline underline-offset-2 hover:text-slate-900" href="/terms.txt">/terms.txt</a>
            </p>
          </div>
          <section className="mt-10 grid gap-8">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">1. Dienst</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your AI Worker levert maatwerk AI automatisering en implementatie van AI agents voor bedrijven.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">2. Intake en voorstel</h2>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                <li>Een intakegesprek is vrijblijvend.</li>
                <li>Na de intake ontvang je een voorstel met scope, planning en prijs.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">3. Planning en oplevering</h2>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                <li>Doorlooptijd en planning hangen af van scope en beschikbaarheid.</li>
                <li>We leveren in fases: eerst een werkende basis, daarna iteraties.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">4. Verantwoordelijkheden</h2>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                <li>Jij levert tijdig toegang, input en eventueel API-sleutels of accounts die nodig zijn.</li>
                <li>Jij blijft verantwoordelijk voor het gebruik van de automatisering in je organisatie.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">5. Betaling</h2>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                <li>Betalingsafspraken staan in het voorstel en de factuur.</li>
                <li>Werk start meestal na akkoord en (waar van toepassing) betaling.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">6. Support</h2>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                <li>Supportafspraken staan in het voorstel.</li>
                <li>We communiceren primair via e-mail.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">7. Beveiliging</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We nemen security serieus. Details en richtlijnen staan op{" "}
                <a className="underline underline-offset-2 hover:text-slate-900" href="/security">/security</a>.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">8. Privacy</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We verwerken persoonsgegevens volgens het privacybeleid:{" "}
                <a className="underline underline-offset-2 hover:text-slate-900" href="/privacy">/privacy</a>.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">9. Aansprakelijkheid</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We leveren zorgvuldig, maar aansprakelijkheid is beperkt tot wat redelijk is en wat in het voorstel is afgesproken.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">10. Contact</h2>
              <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-600">
                <li>
                  <span className="font-semibold text-slate-800">E-mail:</span>{" "}
                  <a className="underline underline-offset-2 hover:text-slate-900" href="mailto:info@youraiworker.nl">
                    info@youraiworker.nl
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-slate-800">Website:</span>{" "}
                  <a className="underline underline-offset-2 hover:text-slate-900" href="/">
                    https://youraiworker.nl
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-slate-800">KvK:</span> 95290475
                </li>
                <li>
                  <span className="font-semibold text-slate-800">BTW:</span> NL8677.15.849.B01
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default TermsPage
