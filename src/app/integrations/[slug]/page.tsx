import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BrandIcon } from "../../../components/BrandIcon"
import { ChatDemo } from "../../../components/ChatDemo"
import {
  INTEGRATION_DEMO_SCENARIOS,
  createFallbackIntegrationScenarios,
} from "../../../components/demoScenarios"
import { INTEGRATIONS } from "../../../lib/catalog"

interface IntegrationDetailPageProps {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  return INTEGRATIONS.map((integration) => ({ slug: integration.slug }))
}

export const generateMetadata = async (props: IntegrationDetailPageProps): Promise<Metadata> => {
  const { slug } = await props.params
  const integration = INTEGRATIONS.find((item) => item.slug === slug)

  if (!integration) {
    return {
      title: "Integratie",
      description: "Details over deze integratie zijn niet beschikbaar.",
    }
  }

  return {
    title: `${integration.name} integratie`,
    description: integration.shortDescription,
  }
}

const IntegrationDetailPage: React.FC<IntegrationDetailPageProps> = async (props) => {
  const { slug } = await props.params
  const integration = INTEGRATIONS.find((item) => item.slug === slug)

  if (!integration) {
    notFound()
  }

  const demoScenarios =
    INTEGRATION_DEMO_SCENARIOS[integration.slug] ?? createFallbackIntegrationScenarios(integration.name)

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="-mx-4 mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm subtle-mesh sm:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Integratie</p>
          <h1 className="mt-3 flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
              {integration.brand ? (
                <BrandIcon name={integration.brand} title={integration.name} className="h-6 w-6" />
              ) : (
                integration.icon && <integration.icon className="h-6 w-6 text-slate-700" aria-hidden="true" />
              )}
            </span>
            {integration.name}
          </h1>
          <p className="mt-4 text-slate-600">{integration.longDescription}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h2 className="text-lg font-semibold">Voorbeelden van automatiseringen</h2>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                {integration.exampleAutomations.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h2 className="text-lg font-semibold">Demo</h2>
              <p className="mt-2 text-sm text-slate-600">
                Een korte chat-simulatie van hoe een {integration.name} workflow eruit kan zien.
              </p>
              <div className="mt-5 h-[24rem] overflow-hidden rounded-2xl sm:h-[26rem]">
                <ChatDemo scenarios={demoScenarios} demoTitle={`${integration.name} demo`} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h2 className="text-lg font-semibold">Wat is nodig om dit te koppelen?</h2>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                  Toegang tot het juiste account of workspace (liefst een testomgeving waar mogelijk).
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                  Benodigde permissies en API scopes volgens least-privilege.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                  Duidelijke workflow-afspraken: triggers, outputs, uitzonderingen en escalaties.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                  5-10 realistische testcases om gedrag te valideren voor go-live.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                  Monitoring/logging en een gecontroleerde go-live (bijv. pilot of beperkte uitrol).
                </li>
              </ul>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
            <h2 className="text-lg font-semibold">Wil je dit koppelen?</h2>
            <p className="mt-3 text-sm text-white/70">
              We scopen de workflow, richten permissions veilig in en testen met echte cases.
            </p>
            <div className="mt-6 flex flex-col gap-3">
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
                Bekijk packages
              </a>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-12">
        <a href="/integrations" className="text-sm font-medium text-slate-900 underline">
          Terug naar integraties
        </a>
      </div>
    </section>
  )
}

export default IntegrationDetailPage
