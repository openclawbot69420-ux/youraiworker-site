"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Search, X, Command } from "lucide-react";

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
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: / or Cmd/Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Focus search on "/" (but not when holding modifier)
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      // Focus search on Cmd/Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
        <div className="group relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-slate-400" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek handleidingen..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-24 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            aria-label="Zoek handleidingen"
          />
          {/* Keyboard shortcut hint - shows when not focused */}
          <span className="absolute right-9 hidden items-center gap-0.5 text-xs text-slate-400 group-focus-within:hidden sm:flex">
            <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans">
              /
            </kbd>
            <span className="px-0.5">of</span>
            <kbd className="inline-flex items-center gap-0.5 rounded border border-slate-200 bg-slate-50 px-1 py-0.5 font-sans">
              <Command className="h-2.5 w-2.5" />
              <span>K</span>
            </kbd>
          </span>
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
