"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

interface Guide {
  slug: string;
  title: string;
  description: string;
  updatedAt?: string;
  readingMinutes: number;
}

interface GuidesSearchProps {
  guides: Guide[];
  children: (filteredGuides: Guide[]) => React.ReactNode;
}

export function GuidesSearch({ guides, children }: GuidesSearchProps) {
  const [query, setQuery] = useState("");

  const filteredGuides = useMemo(() => {
    if (!query.trim()) return guides;
    const normalizedQuery = query.toLowerCase().trim();
    return guides.filter(
      (guide) =>
        guide.title.toLowerCase().includes(normalizedQuery) ||
        guide.description.toLowerCase().includes(normalizedQuery)
    );
  }, [guides, query]);

  const resultCount = filteredGuides.length;

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search
            className="absolute left-3 h-5 w-5 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek handleidingen..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            aria-label="Zoek handleidingen"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Zoekveld leegmaken"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
        {/* Results count */}
        {query && (
          <p className="mt-2 text-xs text-slate-500">
            {resultCount === 0
              ? "Geen resultaten gevonden"
              : resultCount === 1
                ? "1 resultaat gevonden"
                : `${resultCount} resultaten gevonden`}
          </p>
        )}
      </div>

      {/* Guide grid rendered via children prop */}
      {children(filteredGuides)}
    </div>
  );
}
