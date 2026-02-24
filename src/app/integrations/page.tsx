import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"
import { Cloud, MessageSquare } from "lucide-react"

import { BrandIcon, type BrandIconName } from "../../components/BrandIcon"

export const metadata: Metadata = {
  title: "Integraties",
  description: "Koppel AI-agents aan CRM, ticketing, chat en planningstools die je team al gebruikt.",
  alternates: {
    canonical: "https://youraiworker.nl/integrations",
  },
  openGraph: {
    title: "AI-agent integraties | Your AI Worker",
    description: "Verbind AI-agents met CRM, support, chat en duizenden tools via slimme integraties.",
    url: "https://youraiworker.nl/integrations",
    images: [
      {
        url: "/og.png",
        alt: "Your AI Worker integraties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integraties voor AI-agents | Your AI Worker",
    description: "Koppel AI-agents aan je bestaande stack: CRM, ticketing, chat, planning en meer.",
    images: ["/og.png"],
  },
}

import { INTEGRATIONS } from "../../lib/catalog"

const integrations = INTEGRATIONS.map((integration) => {
  return {
    slug: integration.slug,
    name: integration.name,
    badge: integration.name
      .split(" ")
      .map((part) => part.trim()[0])
      .filter(Boolean)
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    brand: integration.brand,
    icon: integration.icon,
    shortDescription: integration.shortDescription,
  }
}) satisfies Array<{
  slug: string
  name: string
  badge: string
  shortDescription: string
  brand?: BrandIconName
  icon?: LucideIcon
}>

const IntegrationsPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="-mx-4 mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm subtle-mesh sm:p-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Integraties</h1>
          <p className="mt-4 text-slate-600">
            Koppel je AI-agent aan de tools die je al gebruikt: CRM, ticketing, chat, planning en meer.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-100 text-slate-700 shadow-sm">
                {integration.brand ? (
                  <BrandIcon name={integration.brand} title={integration.name} className="h-5 w-5" />
                ) : (
                  integration.icon && <integration.icon className="h-5 w-5" aria-hidden="true" />
                )}
                <span className="absolute -bottom-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-md border border-slate-200 bg-slate-900 px-1 text-[10px] font-semibold leading-4 text-white">
                  {integration.badge}
                </span>
              </div>
              <h2 className="font-semibold">{integration.name}</h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">{integration.shortDescription}</p>
            <a
              href={`/integrations/${integration.slug}`}
              className="mt-5 inline-block text-sm font-medium text-slate-900 underline"
            >
              Bekijk details
            </a>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-slate-600">
        Mis je een tool? OpenClaw koppelt met 10.000+ apps. Neem contact op en we bespreken de
        mogelijkheden.
      </p>

      <div className="mt-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-12 text-white sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight">Klaar om te automatiseren?</h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Kies een package en vertel ons wat je wil automatiseren. Wij regelen de rest.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/pricing"
            className="rounded-lg bg-white px-6 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Bekijk packages
          </a>
          <a
            href="/contact"
            className="rounded-lg border border-white/30 px-6 py-3 text-center text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            Plan intake
          </a>
        </div>
      </div>
    </section>
  )
}

export default IntegrationsPage
