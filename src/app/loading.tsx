export default function Loading() {
  return (
    <div
      className="mx-auto max-w-6xl px-4 py-20"
      aria-busy="true"
      aria-live="polite"
      aria-label="Pagina wordt geladen"
    >
      {/* Screen reader only status text */}
      <span className="sr-only">Pagina inhoud wordt geladen, een moment geduld</span>
      {/* Hero skeleton */}
      <div className="motion-safe:animate-pulse">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="h-16 w-full max-w-xl rounded-lg bg-slate-200 motion-reduce:bg-slate-100" />
            <div className="mt-6 h-4 w-full max-w-md rounded bg-slate-200 motion-reduce:bg-slate-100" />
            <div className="mt-3 h-4 w-3/4 max-w-sm rounded bg-slate-200 motion-reduce:bg-slate-100" />
            <div className="mt-8 flex gap-3">
              <div className="h-12 w-40 rounded-lg bg-slate-300 motion-reduce:bg-slate-100" />
              <div className="h-12 w-32 rounded-lg bg-slate-200 motion-reduce:bg-slate-100" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="h-64 rounded-2xl bg-slate-100 motion-reduce:border motion-reduce:border-slate-200" />
          </div>
        </div>
      </div>
      {/* Content skeleton */}
      <div className="mt-16 motion-safe:animate-pulse">
        <div className="h-8 w-48 rounded bg-slate-200 motion-reduce:bg-slate-100" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-slate-100 motion-reduce:border motion-reduce:border-slate-200"
            />
          ))}
        </div>
      </div>
      {/* Footer skeleton */}
      <div className="mt-16 motion-safe:animate-pulse">
        <div className="h-24 rounded-2xl bg-slate-100 motion-reduce:border motion-reduce:border-slate-200" />
      </div>
    </div>
  )
}
