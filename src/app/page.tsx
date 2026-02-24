import type { Metadata } from "next"

const MARQUEE_ITEMS = [
  "E-mail triage",
  "Lead kwalificatie",
  "Meeting planning",
  "Rapportages",
  "CRM updates",
  "Support tickets",
  "Data-analyse",
  "Facturatie",
]

export const metadata: Metadata = {
  title: "AI-agents voor je organisatie",
  description:
    "Production-ready AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en snel live.",
  openGraph: {
    title: "Your AI Worker - AI-agents voor je organisatie",
    description:
      "Production-ready AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en snel live.",
    images: ["/og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your AI Worker - AI-agents voor je organisatie",
    description:
      "Production-ready AI-agents voor Nederlandse bedrijven. Maatwerk automatisering, veilig ingericht en snel live.",
    images: ["/og.svg"],
  },
}

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              AI‑agents die je organisatie echt werk uit handen nemen.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Wij ontwerpen en implementeren maatwerk AI‑agents voor teams die snelheid, veiligheid
              en betrouwbaarheid eisen. Start met één production‑ready agent vanaf{" "}
              <span className="font-semibold text-slate-900">€1.000</span>.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="rounded-lg bg-slate-900 px-6 py-3 text-center text-sm font-medium text-white hover:bg-slate-800 transition-colors"
              >
                Plan een intake (20 min)
              </a>
              <a
                href="/contact"
                className="rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
              >
                Vraag een voorstel aan
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-lg font-semibold">Hoe het werkt</h2>
              <p className="mt-2 text-sm text-slate-600">
                We starten klein, leveren snel, en zorgen dat je team direct met een bruikbare
                agent werkt.
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl bg-white p-4 border border-slate-100">
                  <p className="text-xs font-medium text-slate-500">1. Kies één workflow</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Bijv. inbox triage, lead kwalificatie of rapportages
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 border border-slate-100">
                  <p className="text-xs font-medium text-slate-500">2. Wij bouwen &amp; testen</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Production-ready binnen dagen, niet maanden
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 border border-slate-100">
                  <p className="text-xs font-medium text-slate-500">3. Live + support</p>
                  <p className="mt-1 text-sm text-slate-600">
                    48 uur warranty + 2 weken break‑fix
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="marquee-shell overflow-hidden">
            <div className="marquee-track">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-3 text-xs font-medium tracking-wide text-slate-500 sm:text-sm"
                >
                  <span>{item}</span>
                  <span aria-hidden="true" className="text-slate-300">
                    •
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="border-y border-slate-200/70 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Waar teams op vastlopen met &ldquo;AI in de praktijk&rdquo;
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              ["Te veel pilots, te weinig productie", "Losse prompts zonder ownership, monitoring of ROI."],
              ["Handmatig werk stapelt op", "Triage, follow‑ups, rapportages, tickets en samenvattingen."],
              ["Integraties zijn de bottleneck", "AI zonder toegang tot systemen levert weinig op."],
              ["Security & compliance zorgen", "Wie kan erbij, waar gaat data heen, wat wordt gelogd?"],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md hover:border-slate-300 transition-all"
              >
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Wat we leveren (production‑ready, niet demo‑ready)
            </h2>
            <p className="mt-4 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">Pakket vanaf €1.000 (incl. 1 agent):</span>{" "}
              één duidelijke workflow, gebouwd, getest, gedocumenteerd en uitgerold.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="/pricing"
                className="inline-block rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Bekijk pricing →
              </a>
              <a
                href="/package/configure"
                className="inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
              >
                Configureer package →
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["1 AI‑agent met duidelijke scope", "Eén proces / één teamflow, met acceptatiecriteria."],
                ["Integraties waar het telt", "API's/webhooks waar mogelijk; altijd expliciet gescoped."],
                ["Rollen, rechten & logging", "Zakelijke baseline: least privilege en traceability."],
                ["Handover + training", "Korte docs + beheerinstructies + 30-min handover."],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all"
                >
                  <p className="font-semibold">{title}</p>
                  <p className="mt-2 text-sm text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Starter Agents */}
      <section className="border-y border-slate-200/70 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Starter agents (kies er één om te beginnen)
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-600">
                Dit zijn bewezen workflows die we vaak in dagen live hebben. Klik door voor details,
                benodigde toegang en typische integraties.
              </p>
            </div>
            <a
              href="/use-cases"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Alle use cases →
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              [
                "Inbox & triage agent",
                "Categoriseert requests, maakt concept‑antwoorden, zet taken klaar.",
                "/use-cases/email-management",
              ],
              [
                "Lead qualification",
                "Pre‑kwalificeert leads en logt naar Google Sheets of CRM.",
                "/use-cases/lead-qualification",
              ],
              [
                "Meeting scheduling",
                "Intake → voorstel → bevestiging. Integratie op maat.",
                "/use-cases/meeting-scheduling",
              ],
              [
                "Automated report generation",
                "Updates voor sales/marketing en management op vaste momenten.",
                "/use-cases/report-generation",
              ],
            ].map(([title, desc, href]) => (
              <a
                key={title}
                href={href}
                className="group block rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-slate-900 group-hover:underline">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
                <p className="mt-4 text-sm font-medium text-slate-900 underline">Bekijk details</p>
              </a>
            ))}

            <a
              href="/use-cases/knowledge-base-qa"
              className="group block rounded-xl border border-slate-200 bg-white p-6 md:col-span-2 transition-all hover:border-slate-300 hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-900 group-hover:underline">Knowledge base Q&A</h3>
              <p className="mt-2 text-sm text-slate-600">
                Kleine scope inbegrepen (max 25 files / 200 pagina&apos;s). Groter = add‑on.
              </p>
              <p className="mt-4 text-sm font-medium text-slate-900 underline">Bekijk details</p>
            </a>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Proces: snel, gecontroleerd, meetbaar
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["1", "Intake", "~30 min", "Scope, risico's, data‑bronnen, succescriteria."],
            ["2", "Design", "1–2 dagen", "Agent‑flow, permissions, outputs, testcases."],
            ["3", "Build & integrate", "3–5 dagen", "Implementatie + koppelingen + logging."],
            ["4", "Review & UAT", "1–2 dagen", "Testen met echte cases, edge cases."],
            ["5", "Go‑live", "1 dag", "Gecontroleerde uitrol + korte training."],
            ["6", "Stabilisatie", "2 weken", "48 uur warranty + 2 weken break‑fix."],
          ].map(([num, title, duration, desc]) => (
            <div
              key={num}
              className="rounded-xl border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {num}
              </span>
              <p className="mt-3 font-semibold">{title}</p>
              <p className="mt-2">
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {duration}
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore */}
      <section className="border-y border-slate-200/70 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Wat we precies voor je kunnen configureren
            </h2>
            <p className="mt-4 text-slate-600">
              Van één concrete workflow tot complete multi-tool automatisering. Bekijk use cases,
              integraties en implementatie-guides om te zien wat haalbaar is voor jouw bedrijf.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              [
                "Use cases",
                "Concrete automatiseringen voor sales, support, operations en finance.",
                "/use-cases",
                "Bekijk use cases",
              ],
              [
                "Integraties",
                "Koppelingen met de tools die je al gebruikt: CRM, mail, chat, planning en meer.",
                "/integrations",
                "Bekijk integraties",
              ],
              [
                "Guides",
                "Praktische handleidingen voor setup, governance, security en schaalbare uitrol.",
                "/guides",
                "Bekijk guides",
              ],
            ].map(([title, description, href, cta]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
                <a
                  href={href}
                  className="mt-6 inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
                >
                  {cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Security by default
              </h2>
              <p className="mt-4 text-sm text-slate-600">
                Remote access via <span className="font-semibold text-slate-900">Tailscale</span> -
                versleuteld, identity‑based netwerk zonder open poorten.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-600">
                <li>• Least‑privilege per integratie</li>
                <li>• Secrets management (geen keys in code)</li>
                <li>• Logging/traceability</li>
                <li>• Omgevingsscheiding waar nodig</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="font-semibold text-lg">Support & warranty</h3>
              <p className="mt-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">48 uur warranty</span> (bugs/regressies
                binnen scope) +{" "}
                <span className="font-semibold text-slate-900">2 weken break‑fix</span> (business
                hours).
              </p>
              <p className="mt-4 text-sm text-slate-600">
                24/7, SLA&apos;s of incident response: op aanvraag.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-14 text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Klaar om één proces te automatiseren?
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Plan een korte intake. Je krijgt binnen 24-48 uur een concreet voorstel met scope,
            planning en vaste uitgangspunten.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="rounded-lg bg-white px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Plan intake
            </a>
            <a
              href="/pricing"
              className="rounded-lg border border-white/30 px-6 py-3 text-center text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Bekijk pricing
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
