import type { Metadata } from "next"

const FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "Wat is een AI-agent precies?",
    answer:
      "Een AI-agent is een stukje software dat taken uitvoert namens je team. Denk aan: e-mails sorteren, leads kwalificeren, vragen beantwoorden en acties uitvoeren in tools zoals Gmail, Google Calendar, WhatsApp of je CRM.",
  },
  {
    question: "Hoe snel kunnen we live?",
    answer:
      "Meestal binnen dagen, afhankelijk van scope en integraties. Na een intake ontvang je een concreet plan en planning.",
  },
  {
    question: "Voor wie is dit bedoeld?",
    answer:
      "Voor Nederlandse bedrijven die repetitief werk willen automatiseren zonder in te leveren op kwaliteit en veiligheid. Vaak gaat het om sales, support en operations.",
  },
  {
    question: "Hoe zit het met security en privacy?",
    answer:
      "We bouwen security-first en minimaliseren data-toegang. Waar mogelijk gebruiken we least-privilege, logging en duidelijke afspraken over dataretentie. Zie ook de beveiligingspagina voor details.",
  },
  {
    question: "Is dit een abonnement?",
    answer:
      "Nee: je betaalt voor implementatie. Support of doorontwikkeling kan daarna optioneel.",
  },
  {
    question: "Wat heb je nodig om te starten?",
    answer:
      "Een korte intake (20 min) en toegang tot de relevante tools (bijv. Google Workspace of WhatsApp Business). Daarna werken we het plan uit en gaan we bouwen.",
  },
]

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Veelgestelde vragen over AI-agents, implementatie, security en doorlooptijd. Krijg snel duidelijkheid voordat je een intake plant.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Your AI Worker",
    description:
      "Veelgestelde vragen over AI-agents, implementatie, security en doorlooptijd. Krijg snel duidelijkheid voordat je een intake plant.",
    url: "/faq",
  },
}

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">FAQ</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Snelle antwoorden op de meest voorkomende vragen. Staat jouw vraag er niet bij? Stuur ons een
          bericht.
        </p>
      </div>

      <div className="mt-10 grid gap-4">
        {FAQS.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
              <span className="flex items-start justify-between gap-4">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm font-semibold text-slate-900">Klaar voor de volgende stap?</p>
        <p className="mt-2 text-sm text-slate-600">
          Plan een korte intake en krijg een concreet voorstel met scope, planning en prijs.
        </p>
        <div className="mt-4">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Plan intake (20 min)
          </a>
        </div>
      </div>
    </div>
  )
}
