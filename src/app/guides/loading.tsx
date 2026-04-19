export default function GuidesLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Header skeleton */}
      <div className="max-w-2xl">
        <div className="h-10 w-full max-w-lg rounded-lg bg-slate-200 motion-reduce:bg-slate-100" />
        <div className="mt-4 h-4 w-full max-w-md rounded bg-slate-200 motion-reduce:bg-slate-100" />
        <div className="mt-2 h-4 w-3/4 max-w-sm rounded bg-slate-200 motion-reduce:bg-slate-100" />
      </div>

      {/* Search skeleton */}
      <div className="mt-8">
        <div className="h-12 w-full max-w-md rounded-lg bg-slate-200 motion-reduce:bg-slate-100" />
      </div>

      {/* Guides grid skeleton */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 motion-reduce:border-slate-200"
          >
            {/* Icon */}
            <div className="h-10 w-10 rounded-xl bg-slate-200 motion-reduce:bg-slate-100" />
            {/* Title */}
            <div className="mt-4 h-5 w-3/4 rounded bg-slate-200 motion-reduce:bg-slate-100" />
            {/* Description lines */}
            <div className="mt-3 h-4 w-full rounded bg-slate-200 motion-reduce:bg-slate-100" />
            <div className="mt-2 h-4 w-5/6 rounded bg-slate-200 motion-reduce:bg-slate-100" />
            {/* Meta */}
            <div className="mt-4 flex gap-2">
              <div className="h-3 w-20 rounded bg-slate-200 motion-reduce:bg-slate-100" />
              <div className="h-3 w-px bg-slate-200" />
              <div className="h-3 w-16 rounded bg-slate-200 motion-reduce:bg-slate-100" />
            </div>
          </div>
        ))}
      </div>

      {/* RSS feed skeleton */}
      <div className="mt-12 flex justify-center">
        <div className="h-8 w-32 rounded-full bg-slate-200 motion-reduce:bg-slate-100" />
      </div>
    </div>
  )
}
