"use client";

import { Calendar, Clock, FileText } from "lucide-react";
import { GuidesSearch } from "../../components/GuidesSearch";

interface Guide {
  slug: string;
  title: string;
  description: string;
  updatedAt?: string;
  readingMinutes: number;
}

interface GuidesListProps {
  guides: Guide[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Date(dateString).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Check if guide was updated within last 30 days
const isRecentlyUpdated = (dateString?: string): boolean => {
  if (!dateString) return false;
  const updated = new Date(dateString);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return updated >= thirtyDaysAgo;
};

export function GuidesList({ guides }: GuidesListProps) {
  return (
    <GuidesSearch guides={guides}>
      {(filteredGuides) => (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-sm text-slate-600">
                Geen handleidingen gevonden. Probeer een andere zoekterm.
              </p>
            </div>
          ) : (
            filteredGuides.map((guide, index) => (
              <div
                key={guide.title}
                className={`hover-lift motion-fade-in rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-md ${
                  index % 3 === 0
                    ? "motion-delay-1"
                    : index % 3 === 1
                      ? "motion-delay-2"
                      : "motion-delay-3"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                    <FileText className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="font-semibold">{guide.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {guide.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      Praktische checklist
                    </span>
                    {isRecentlyUpdated(guide.updatedAt) && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                          aria-hidden="true"
                        />
                        Recent bijgewerkt
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400"
                      title="Geschatte leestijd"
                    >
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      <span>{guide.readingMinutes} min</span>
                    </span>
                    {guide.updatedAt && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="h-3 w-3" aria-hidden="true" />
                        <time dateTime={guide.updatedAt}>
                          {formatDate(guide.updatedAt)}
                        </time>
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={`/guides/${guide.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-slate-900 underline"
                >
                  Bekijk details
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </GuidesSearch>
  );
}
