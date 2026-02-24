export const dynamic = "force-static"

export const metadata = {
  title: "Pagina niet gevonden",
  description:
    "Deze pagina bestaat niet (meer). Ga terug naar de homepage of bekijk onze toepassingen.",
}

export default function NotFound() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white px-8 py-8 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">404</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Pagina niet gevonden
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-700">
            De link is mogelijk verplaatst, verwijderd of verkeerd ingevoerd. Gebruik de knoppen
            hieronder om terug te gaan naar de homepage of direct contact op te nemen.
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
              Plan een intake
            </a>
          </div>
        </div>

        <div className="px-8 py-8 sm:px-10">
          <p className="text-sm font-medium text-slate-900">Handige pagina&apos;s</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-white"
              href="/use-cases"
            >
              Toepassingen
            </a>
            <a
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-white"
              href="/integrations"
            >
              Integraties
            </a>
            <a
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-white"
              href="/guides"
            >
              Handleidingen
            </a>
            <a
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-white"
              href="/security"
            >
              Beveiliging
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
