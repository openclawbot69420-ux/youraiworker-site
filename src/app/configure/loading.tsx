"use client"

import { Package, Cpu, Calculator, ArrowRight } from "lucide-react"

/**
 * Loading skeleton for the configure page.
 * Provides visual feedback while the interactive configurator hydrates.
 */
export default function ConfigureLoading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      {/* Header skeleton */}
      <div className="-mx-4 mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" aria-hidden="true" />
          <div className="mt-3 h-9 w-3/4 animate-pulse rounded-lg bg-slate-200 sm:h-11" aria-hidden="true" />
          <div className="mt-4 h-20 animate-pulse rounded-lg bg-slate-100" aria-hidden="true" />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left column skeleton */}
        <div className="space-y-8">
          {/* Package selection skeleton */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-slate-400" aria-hidden="true" />
              <div className="h-6 w-48 animate-pulse rounded bg-slate-200" aria-hidden="true" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  aria-hidden="true"
                >
                  <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                  <div className="mt-2 h-8 w-28 animate-pulse rounded bg-slate-200" />
                  <div className="mt-2 h-8 w-full animate-pulse rounded bg-slate-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons skeleton */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-slate-400" aria-hidden="true" />
              <div className="h-6 w-56 animate-pulse rounded bg-slate-200" aria-hidden="true" />
            </div>
            <div className="mt-2 h-4 w-full max-w-md animate-pulse rounded bg-slate-100" aria-hidden="true" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  aria-hidden="true"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                      <div className="h-12 w-full animate-pulse rounded bg-slate-100" />
                    </div>
                    <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator skeleton */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-slate-400" aria-hidden="true" />
              <div className="h-5 w-40 animate-pulse rounded bg-slate-200" aria-hidden="true" />
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" aria-hidden="true" />
                <div className="mt-4 space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2" aria-hidden="true">
                      <div className="flex items-center justify-between">
                        <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
                        <div className="h-3 w-12 animate-pulse rounded bg-slate-300" />
                      </div>
                      <div className="h-2 w-full animate-pulse rounded bg-slate-100" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" aria-hidden="true" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-slate-100" aria-hidden="true" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" aria-hidden="true" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar skeleton */}
        <aside className="space-y-6">
          {/* Summary card skeleton */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <div className="h-5 w-24 animate-pulse rounded bg-slate-200" aria-hidden="true" />
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-20 animate-pulse rounded bg-slate-300" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-16 animate-pulse rounded bg-slate-300" />
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-28 animate-pulse rounded bg-slate-300" />
                </div>
              </div>
            </div>
            <div className="mt-6 h-10 w-full animate-pulse rounded-lg bg-slate-200" aria-hidden="true" />
          </div>

          {/* Info card skeleton */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 p-8">
            <div className="h-5 w-40 animate-pulse rounded bg-white/50" aria-hidden="true" />
            <div className="mt-4 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-full animate-pulse rounded bg-white/30" aria-hidden="true" />
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Configurator wordt geladen, een moment geduld...
      </div>
    </section>
  )
}
