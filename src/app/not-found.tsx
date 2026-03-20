import Link from "next/link"

const NotFoundPage = () => {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Pagina niet gevonden
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
        De link klopt waarschijnlijk niet (meer). Ga terug naar de homepage of bekijk onze toepassingen en
        prijzen.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 motion-reduce:transition-none"
        >
          Terug naar home
        </Link>
        <Link
          href="/use-cases"
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors duration-200 hover:bg-slate-50 motion-reduce:transition-none"
        >
          Bekijk toepassingen
        </Link>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors duration-200 hover:bg-slate-50 motion-reduce:transition-none"
        >
          Bekijk prijzen
        </Link>
      </div>

      <p className="mt-10 text-xs text-slate-400">
        Denk je dat dit een fout is? Mail ons op{" "}
        <a
          className="underline underline-offset-2 transition-colors hover:text-slate-500"
          href="mailto:info@youraiworker.nl"
        >
          info@youraiworker.nl
        </a>
        .
      </p>
    </section>
  )
}

export default NotFoundPage
