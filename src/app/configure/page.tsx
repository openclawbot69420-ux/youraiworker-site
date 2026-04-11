import type { Metadata } from "next";
import { Calculator, ArrowRight } from "lucide-react";
import { ConfigureUI } from "./ui";
import { buildBreadcrumbJsonLd } from "../jsonld";

export const metadata: Metadata = {
  title: "AI-agent configurator | Bouw je pakket en bereken ROI",
  description:
    "Stel je AI-agent pakket samen met de configurator. Kies Starter, Groei of Maatwerk, voeg add-ons toe en krijg direct een indicatie van kosten, tijdwinst en terugverdientijd. Definitieve scope bepalen we tijdens de intake.",
  alternates: {
    canonical: "https://youraiworker.nl/configure",
  },
  openGraph: {
    title: "AI-agent configurator | Bouw je pakket en bereken ROI",
    description:
      "Stel je pakket samen: kies Starter, Groei of Maatwerk, voeg add-ons toe en zie direct indicatie van kosten en tijdwinst.",
    url: "https://youraiworker.nl/configure",
    images: [
      {
        url: "https://youraiworker.nl/configure/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI-agent configurator - bereken kosten en ROI",
      },
    ],
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-agent configurator | Bouw je pakket en bereken ROI",
    description:
      "Kies pakket, add-ons en zie direct indicatie van kosten en tijdwinst.",
    images: ["/configure/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const toJsonLd = (value: object) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Configurator", url: "https://youraiworker.nl/configure" },
]);

const CONFIGURE_JSON_LD_ID = "configure-jsonld";

type NextStep = {
  step: string;
  title: string;
  description: string;
  active?: boolean;
  href?: string;
};

const NEXT_STEPS: NextStep[] = [
  {
    step: "1",
    title: "Configureer",
    description: "Kies pakket en add-ons die bij je situatie passen.",
    active: true,
  },
  {
    step: "2",
    title: "Intake",
    description:
      "Plan een gesprek. We bespreken scope en maken een concreet voorstel.",
    href: "/contact",
  },
  {
    step: "3",
    title: "Implementatie",
    description: "Wij bouwen, testen en leveren op. Live in 3-10 werkdagen.",
    href: "/implementatie",
  },
];

const ConfigurePage: React.FC = () => {
  return (
    <>
      <script
        id={CONFIGURE_JSON_LD_ID}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />
      <section className="mx-auto max-w-6xl px-4 py-20">
        {/* Header */}
        <div className="-mx-4 mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm subtle-mesh sm:p-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                <Calculator
                  className="h-4 w-4 text-slate-600"
                  aria-hidden="true"
                />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Configurator
              </p>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Configureer pakket en add-ons
            </h1>
            <p className="mt-4 text-slate-600">
              Kies een pakket en optionele add-ons. Je ziet direct een indicatie
              van totaalprijs en een ruwe impact-schatting (efficiency).
              Definitieve scope bepalen we tijdens de intake.
            </p>
          </div>
        </div>

        {/* Configurator UI */}
        <ConfigureUI />

        {/* Next steps */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-slate-900">
            Van configuratie naar live
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Je configuratie is een startpunt. De volgende stap is een intake
            waar we scope concreet maken.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {NEXT_STEPS.map((item) => (
              <div
                key={item.step}
                className={`relative rounded-xl border p-5 ${
                  item.active
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-900"
                }`}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    item.active
                      ? "bg-white/10 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.step}
                </span>
                <h3
                  className={`mt-3 text-sm font-semibold ${
                    item.active ? "text-white" : "text-slate-900"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    item.active ? "text-white/70" : "text-slate-600"
                  }`}
                >
                  {item.description}
                </p>
                {item.href && !item.active && (
                  <a
                    href={item.href}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-slate-900 underline underline-offset-2"
                  >
                    Meer info
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Klaar om je configuratie te bespreken?
              </p>
              <p className="text-sm text-slate-600">
                We nemen je selectie mee als startpunt voor het gesprek.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Plan een intake
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConfigurePage;
