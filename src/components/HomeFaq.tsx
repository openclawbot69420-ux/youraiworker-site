import { FaqJsonLd } from "./FaqJsonLd"

type FaqItem = {
  question: string
  answer: string
}

const FAQ_ITEMS: ReadonlyArray<FaqItem> = [
  {
    question: "Wat leveren jullie precies op?",
    answer:
      "Je krijgt een production-ready AI-agent voor één afgebakende workflow, inclusief scope, acceptatiecriteria, integraties, testcases, handover en support binnen de afgesproken periode.",
  },
  {
    question: "Hoe snel kunnen we live?",
    answer:
      "Meestal binnen 3-10 werkdagen, afhankelijk van scope en integraties. Na intake krijg je een concrete planning met duidelijke stappen.",
  },
  {
    question: "Wat is het verschil met een VA of zelf bouwen?",
    answer:
      "Wij leveren een afgebakende workflow die productie draait, inclusief security baseline, logging, foutafhandeling en duidelijke overdracht. Een VA is vooral capaciteit. Zelf bouwen kan, maar kost vaak weken tot maanden aan ontwikkeling en beheer.",
  },
  {
    question: "Zijn er maandelijkse kosten?",
    answer:
      "Onze implementatie is eenmalig. Wel kunnen er kosten zijn voor tools, nummers, licenties of model-usage van derde partijen. Die stemmen we vooraf af.",
  },
  {
    question: "Hoe ziet support eruit na oplevering?",
    answer:
      "Standaard: 48 uur warranty (bugs en regressies) en 2 weken break-fix tijdens business hours. Daarna kun je kiezen voor support op aanvraag.",
  },
  {
    question: "Moeten jullie toegang hebben tot al onze systemen?",
    answer:
      "Nee. We werken met least privilege: alleen toegang tot wat nodig is voor de workflow. Remote access kan via Tailscale zodat je geen poorten hoeft open te zetten.",
  },
  {
    question: "Hoe zit het met privacy en data?",
    answer:
      "We gebruiken een minimale set aan rechten, loggen acties waar nodig en richten approvals in voor kritieke stappen. In de intake stemmen we af welke data de agent mag zien, wat er opgeslagen wordt, en welke retention past bij je proces.",
  },
] as const

export const HomeFaq = () => {
  return (
    <section aria-labelledby="faq-title" className="border-b border-slate-200/70 bg-white">
      <FaqJsonLd items={[...FAQ_ITEMS]} />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">FAQ</p>
          <h2 id="faq-title" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Veelgestelde vragen
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Snelle antwoorden op de vragen die we het meest krijgen tijdens intake.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-200 bg-slate-50/40 p-5 transition-colors hover:bg-white"
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </div>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Plan een intake
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            Bekijk prijzen
          </a>
        </div>
      </div>
    </section>
  )
}
