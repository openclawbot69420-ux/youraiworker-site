import type { Metadata } from "next";
import { Builder } from "./Builder";
import { buildBreadcrumbJsonLd } from "../jsonld";
import { buildFaqJsonLd } from "../faq/faqJsonLd";
import { SharePage } from "../../components/SharePage";
import { PrintButton } from "../../components/PrintButton";
import { TrustPillars } from "../../components/TrustPillars";
const LAST_UPDATED = new Date(process.env.NEXT_PUBLIC_BUILD_DATE || Date.now());
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Prijzen", url: "https://youraiworker.nl/pricing" },
]);

const PRICING_FAQ_ITEMS = [
  {
    question: "Wat zit er precies in het Starter pakket?",
    answer: "Starter is bedoeld voor één afgebakende workflow en bevat intake, scope en acceptatiecriteria, implementatie van één productierijpe AI-agent, 1 tot 2 integraties, testen met cases, documentatie en handover.",
  },
  {
    question: "Zijn de prijzen op deze pagina definitief?",
    answer: "Nee. Dit zijn vanafprijzen. De definitieve prijs hangt af van scope, integraties, toegangen, uitzonderingen, testcases en gewenste foutafhandeling.",
  },
  {
    question: "Kan ik klein starten en later uitbreiden?",
    answer: "Ja. Dat is de standaardaanpak. We starten met een afgebakende workflow, meten resultaat en schalen daarna gecontroleerd op.",
  },
  {
    question: "Zijn third-party kosten inbegrepen?",
    answer: "Nee. Kosten van providers, nummers, licenties, tools of model-usage van derden vallen buiten onze implementatieprijs en worden apart afgestemd.",
  },
  {
    question: "Is €1.000 inclusief of exclusief btw?",
    answer: "Exclusief btw. Op de pagina staat steeds (excl. btw).",
  },
] as const;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI-agent implementatie en automatisering",
  serviceType: "AI-agent implementatie",
  description: "Implementatie van production-ready AI-agents voor Nederlandse bedrijven, inclusief scope, integraties, beveiligingsbaseline en livegang.",
  provider: {
    "@type": "Organization",
    name: "Your AI Worker",
    url: "https://youraiworker.nl",
  },
  areaServed: {
    "@type": "Country",
    name: "Nederland",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "1000",
    url: "https://youraiworker.nl/pricing",
    images: [{
      url: "https://youraiworker.nl/pricing/opengraph-image",
      width: 1200,
      height: 630,
      alt: "AI-agent implementatie vanaf €1.000 - Geen maandelijkse kosten",
    }],
  },
};

const faqSchema = buildFaqJsonLd(
  PRICING_FAQ_ITEMS.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
);

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c");
const PRICING_JSON_LD_ID = "pricing-jsonld";

export const metadata: Metadata = {
  title: "Prijzen | AI-agent implementatie vanaf €1.000 | Your AI Worker",
  description: "Heldere pakketten voor AI-agent implementatie. Vanaf €1.000, geen maandelijkse kosten. Plan een intake.",
  alternates: {
    canonical: "https://youraiworker.nl/pricing",
  },
  openGraph: {
    title: "Prijzen voor AI-agents | Your AI Worker",
    description: "Heldere pakketten, scopegrenzen en intakeflow voor done-for-you AI-agent implementatie.",
    url: "https://youraiworker.nl/pricing",
    images: [{
      url: "https://youraiworker.nl/pricing/opengraph-image",
      width: 1200,
      height: 630,
      alt: "AI-agent implementatie vanaf €1.000 - Geen maandelijkse kosten",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prijzen AI-agents | Your AI Worker",
    description: "Kies pakket en add-ons, zie wat wel/niet inbegrepen is en start intake.",
  },
};

const PricingPage = () => {
  return (
    <>
      <script id={PRICING_JSON_LD_ID} type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd([serviceSchema, faqSchema, breadcrumbJsonLd]) }} />
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="flex items-center justify-end gap-2">
          <PrintButton />
          <SharePage title="Deel prijzen" />
        </div>
      </div>
      <Builder />
      {/* Trust pillars - credibility signals at decision point */}
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Waarom teams voor ons kiezen
          </h2>
          <TrustPillars />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"> Prijzen </p>
                <span className="text-slate-300" aria-hidden="true"> | </span>
                <p className="text-xs text-slate-400"> Bijgewerkt: <time dateTime={LAST_UPDATED.toISOString()}> {formatDate(LAST_UPDATED)} </time> </p>
              </div>
              <h2 className="text-balance mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"> Zo houden we pricing voorspelbaar </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base"> De pagina geeft je een realistisch startpunt. Tijdens intake zetten we dit om naar een concrete scope met duidelijke grenzen zodat uitvoering en oplevering beheersbaar blijven. </p>
            </div>
            <ol className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Intake & scope",
                  text: "We bepalen workflow, uitzonderingen, integraties en acceptatiecriteria.",
                },
                {
                  title: "Offerte & planning",
                  text: "Je krijgt een definitieve prijs en planning op basis van bevestigde scope.",
                },
                {
                  title: "Implementatie & handover",
                  text: "We bouwen, testen en leveren op met documentatie en afgesproken support.",
                },
              ].map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-shadow duration-200 hover:shadow-sm motion-reduce:transition-none" >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-900"> {index + 1} </span>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900"> {step.title} </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600"> {step.text} </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900"> Vertrouwen zonder grote claims </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700">
              {[
                "We verkopen implementatiepakketten, geen onbegrensde maatwerkbelofte.",