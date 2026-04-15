import React from "react";

export const WarrantyTrust: React.FC = () => {
  return (
    <section id="garantie" className="mx-auto max-w-6xl px-4 pb-16">
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            <div>
              <h2 className="text-xl font-semibold text-emerald-950 sm:text-2xl">48-uurs garantie</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-emerald-900/80">
                Geen live agent, geen betaling. Als we geen werkende oplevering kunnen demonstreren binnen scope,
                betaal je niets. Na oplevering geldt 48-uurs garantie op bugs en regressies.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:shrink-0">
            <div className="rounded-xl border border-emerald-200/70 bg-white/70 px-4 py-3 text-center">
              <p className="text-xs font-semibold text-emerald-800">Dekking</p>
              <p className="text-sm font-medium text-emerald-950">Bugs + regressies</p>
            </div>
            <div className="rounded-xl border border-emerald-200/70 bg-white/70 px-4 py-3 text-center">
              <p className="text-xs font-semibold text-emerald-800">Periode</p>
              <p className="text-sm font-medium text-emerald-950">48 uur na livegang</p>
            </div>
            <div className="rounded-xl border border-emerald-200/70 bg-white/70 px-4 py-3 text-center">
              <p className="text-xs font-semibold text-emerald-800">Support</p>
              <p className="text-sm font-medium text-emerald-950">Break-fix incl.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
