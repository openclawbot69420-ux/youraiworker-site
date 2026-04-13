import type { Metadata } from "next";
import { ArrowRight, FileText, Shield, HelpCircle, BookOpen, Zap, Users, Mail, MapPin } from "lucide-react";
import { buildBreadcrumbJsonLd } from "../jsonld";

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", url: "https://youraiworker.nl/" },
  { name: "Sitemap", url: "https://youraiworker.nl/sitemap" },
]);

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  title: "Sitemap | Alle pagina's op een rij | Your AI Worker",
  description: "Overzicht van alle pagina's op youraiworker.nl. Vind snel wat je zoekt.",
  alternates: {
    canonical: "https://youraiworker.nl/sitemap",
  },
  openGraph: {
    title: "Sitemap | Your AI Worker",
    description: "Volledig overzicht van alle pagina's op de website.",
    url: "https://youraiworker.nl/sitemap",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface SectionItem {
  href: string;
  label: string;
  description: string;
  external?: boolean;
}

interface Section {
  title: string;
  icon: typeof Zap;
  items: SectionItem[];
}

const SECTIONS: Section[] = [
  {
    title: "Product",
    icon: Zap,
    items: [
      { href: "/", label: "Home", description: "Startpagina met overzicht" },
      { href: "/pricing", label: "Prijzen", description: "Packages en add-ons" },
      { href: "/use-cases", label: "Toepassingen", description: "Workflow voorbeelden" },
      { href: "/integrations", label: "Integraties", description: "Beschikbare koppelingen" },
      { href: "/implementatie", label: "Implementatie", description: "Hoe we werken" },
    ],
  },
  {
    title: "Bedrijf",
    icon: Users,
    items: [
      { href: "/about", label: "Over ons", description: "Wie we zijn" },
      { href: "/faq", label: "FAQ", description: "Veelgestelde vragen" },
      { href: "/contact", label: "Contact", description: "Intake plannen" },
      { href: "/guides", label: "Handleidingen", description: "Praktische guides" },
    ],
  },
  {
    title: "Informatie",
    icon: BookOpen,
    items: [
      { href: "/security", label: "Beveiliging", description: "Security-first aanpak" },
      { href: "/privacy", label: "Privacy", description: "Privacybeleid" },
      { href: "/terms", label: "Algemene voorwaarden", description: "Voorwaarden" },
    ],
  },
  {
    title: "Technisch",
    icon: FileText,
    items: [
      { href: "/sitemap.xml", label: "XML Sitemap", description: "Voor zoekmachines", external: true },
      { href: "/humans.txt", label: "Humans.txt", description: "Colofon", external: true },
      { href: "/.well-known/security.txt", label: "Security.txt", description: "Security contact", external: true },
    ],
  },
] as const;

const QUICK_LINKS = [
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "mailto:info@youraiworker.nl", label: "info@youraiworker.nl", icon: Mail },
  { href: "#", label: "Amsterdam, Nederland", icon: MapPin },
];

const SitemapPage: React.FC = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />
      <main className="mx-auto max-w-6xl px-4 py-20">
        {/* Header */}
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Sitemap
          </h1>
          <p className="mt-4 text-slate-600">
            Volledig overzicht van alle pagina&apos;s op Your AI Worker. 
            Hier vind je alles over onze diensten, bedrijfsinformatie en resources.
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SECTIONS.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                  <section.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="text-lg font-semibold text-slate-900">
                  {section.title}
                </h2>
              </div>
              <ul className="mt-5 space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="group flex items-center justify-between rounded-lg border border-transparent px-3 py-2.5 transition-colors hover:border-slate-200 hover:bg-slate-50"
                    >
                      <div>
                        <p className="font-medium text-slate-900 group-hover:text-slate-700">
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-500">{item.description}</p>
                      </div>
                      <ArrowRight
                        className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Quick Contact */}
        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Niet gevonden wat je zoekt?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Neem contact op. We helpen je graag.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Plan een intake
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-6 text-sm text-slate-600">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-2 transition-colors hover:text-slate-900"
              >
                <link.icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
            KvK: 95290475
          </span>
          <span className="text-slate-300">|</span>
          <span>BTW: NL8677.15.849.B01</span>
          <span className="text-slate-300">|</span>
          <span className="inline-flex items-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            Reactie binnen 1 werkdag
          </span>
        </div>
      </main>
    </>
  );
};

export default SitemapPage;
