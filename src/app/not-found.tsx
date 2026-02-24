export const dynamic = "force-static"

export const metadata = {
  title: "Pagina niet gevonden",
  description:
    "Deze pagina bestaat niet (meer). Ga terug naar de homepage of bekijk onze use cases.",
}

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Pagina niet gevonden
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-700">
          De link is mogelijk verplaatst of verwijderd. Je kunt terug naar de homepage of een van
          de pagina's hieronder openen.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Naar de homepage
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-slate-300"
          >
            Plan intake
          </a>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-white"
            href="/use-cases"
          >
            Use cases
          </a>
          <a
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-white"
            href="/integrations"
          >
            Integraties
          </a>
          <a
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-white"
            href="/pricing"
          >
            Prijzen
          </a>
          <a
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-white"
            href="/security"
          >
            Beveiliging
          </a>
        </div>
      </div>
    </main>
  )
}
