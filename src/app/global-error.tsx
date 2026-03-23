'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to analytics or error tracking service
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="nl">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Er is iets misgegaan
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Onverwachte fout
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Er is een onverwachte fout opgetreden. Dit kan een tijdelijk
            probleem zijn. Probeer de pagina opnieuw te laden of ga terug naar
            de homepage.
          </p>
          {error.digest && (
            <p className="mt-4 text-xs text-slate-400">
              Foutcode: {error.digest}
            </p>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 motion-reduce:transition-none"
            >
              Probeer opnieuw
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors duration-200 hover:bg-slate-50 motion-reduce:transition-none"
            >
              Terug naar home
            </a>
          </div>
          <p className="mt-10 text-xs text-slate-400">
            Blijft dit probleem bestaan? Mail ons op{' '}
            <a
              className="underline underline-offset-2 transition-colors hover:text-slate-500"
              href="mailto:info@youraiworker.nl"
            >
              info@youraiworker.nl
            </a>
          </p>
        </div>
      </body>
    </html>
  )
}
