import type { Metadata } from "next"

import { ConfigureUI } from "./ui"

export const metadata: Metadata = {
  title: "Configureer package",
  description: "Kies een package, selecteer add-ons en krijg een snelle indicatie van kosten en impact.",
}

const ConfigurePage: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="-mx-4 mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm subtle-mesh sm:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Configurator</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Configureer package + add-ons</h1>
          <p className="mt-4 text-slate-600">
            Kies een package en optionele add-ons. Je ziet direct een indicatie van totaalprijs en
            een ruwe impact-schatting (efficiency). Definitieve scope bepalen we tijdens de intake.
          </p>
        </div>
      </div>

      <ConfigureUI />
    </section>
  )
}

export default ConfigurePage
