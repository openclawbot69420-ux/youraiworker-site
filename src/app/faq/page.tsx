import type { Metadata } from "next"
import { FaqItem } from "./FaqItem"
import { buildFaqJsonLd } from "./faqJsonLd"

const LAST_UPDATED = new Date("2026-04-02")

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

const FAQS: Array<{ question: string; answer: string; id: string }> = [
  {
    id: "wat-is-ai-agent",
    question: "Wat is een AI-agent precies?",
    answer: "Een AI-agent is een stukje software dat taken uitvoert namens je team. Denk aan: e-mails sorteren, leads kwalificeren, vragen beantwoorden en acties uitvoeren in tools zoals Gmail, Google Calendar, WhatsApp of je CRM.",
  },
  {
    id: "doorlooptijd-live",
    question: "Hoe snel kunnen we live?",
    answer: "Meestal binnen dagen, afhankelijk van scope en integraties. Na een intake ontvang je een concreet plan en planning.",
  },
  {
    id: "voor-wie",
    question: "Voor wie is dit bedoeld?",
    answer: "Voor Nederlandse bedrijven die repetitief werk willen automatiseren zonder in te leveren op kwaliteit en veiligheid. Vaak gaat het om sales, support en operations.",
  },
  {
    id: "security-privacy",
    question: "Hoe zit het met security en privacy?",
    answer: "We bouwen security-first en minimaliseren data-toegang. Waar mogelijk gebruiken we least-privilege, logging en duidelijke afspraken over dataretentie. Zie ook de beveiligingspagina voor details.",
  },
  {
    id: "abonnement",
    question: "Is dit een abonnement?",
    answer: "Nee: je betaalt voor implementatie. Support of doorontwikkeling kan daarna optioneel.",
  },
  {
    id: "starten",
    question: "Wat heb je nodig om te starten?",
    answer: "Een korte intake (20 min) en toegang tot de relevante tools (bijv. Google Workspace of WhatsApp Business). Daarna werken we het plan uit en gaan we bouwen.",
  },
  {
    id: "fouten-afhandeling",
    question: "Wat als de agent een fout maakt?",
    answer: "Elke workflow heeft expliciete foutafhandeling: onduidelijke requests worden teruggezet voor review, kritieke acties vereisen approval, en uitzonderingen worden gelogd met notificatie. De 48-uurs warranty dekt bugs en regressies binnen scope.",
  },
  {
    id: "data-toegang",
    question: "Wie heeft er toegang tot mijn data?",
    answer: "Alleen jij en de geconfigureerde agent hebben toegang, via versleutelde verbindingen met least-privilege permissies. We gebruiken Tailscale voor beveiligde remote access en slaan geen data langer op dan nodig voor de workflow.",
  },
  {
    id: "bestaande-tools",
    question: "Werkt dit met onze bestaande tools?",
    answer: "Ja. We integreren met gangbare tools zoals Gmail, Google Calendar, Slack, WhatsApp Business, Telegram, HubSpot, Salesforce, Zapier en veel meer. Tijdens intake bespreken we welke tools je gebruikt en hoe we deze veilig koppelen.",
  },
  {
    id: "aanpassen-na-oplevering",
    question: "Kan ik de agent zelf aanpassen na oplevering?",
    answer: "Je krijgt documentatie en een handover met uitleg over configuratie. Kleine aanpassingen (regels, teksten) kan je zelf doen. Grotere wijzigingen of nieuwe features bespreken we via een vervolgafspraak.",
  },
]

export const metadata: Metadata = {
  title: "Veelgestelde vragen | AI-agents en implementatie | Your AI Worker",
  description: "Veelgestelde vragen over AI-agents: implementatie, security, fouten, data-toegang en integraties. Krijg snel duidelijkheid voordat je een intake plant.",
  alternates: {
    canonical: "https://youraiworker.nl/faq",
  },
  openGraph: {
    title: "FAQ | Your AI Worker",
    description: "Veelgestelde vragen over AI-agents, implementatie, security en doorlooptijd. Krijg snel duidelijkheid voordat je een intake plant.",
    url: "https://youraiworker.nl/faq",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Your AI Worker FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Your AI Worker",
    description: "Veelgestelde vragen over AI-agents, implementatie, security en doorlooptijd. Krijg snel duidelijkheid voordat je een intake plant.",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Your AI Worker FAQ",
      },
    ],
  },
}

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

export default function FAQPage() {
  const faqJsonLd = buildFaqJsonLd(FAQS)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">FAQ</h1>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <p className="text-sm text-slate-400">Bijgewerkt: {formatDate(LAST_UPDATED)}</p>
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Snelle antwoorden op de meest voorkomende vragen. Staat jouw vraag er niet bij? Plan een intake of mail ons.
          </p>
        </div>
        <div className="mt-10 grid gap-4">
          {FAQS.map((item) => (
            <FaqItem key={item.id} id={item.id} question={item.question} answer={item.answer} />
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-900">Klaar voor de volgende stap?</p>
          <p className="mt-2 text-sm text-slate-600">
            Plan een korte intake en krijg een concreet voorstel met scope, planning en prijs.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a href="/contact" className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
              Plan intake (20 min)
            </a>
            <a href="mailto:info@youraiworker.nl" className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100">
              Mail ons
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
