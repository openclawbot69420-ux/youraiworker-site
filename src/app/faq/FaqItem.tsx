"use client"

import { Link2 } from "lucide-react"

interface FaqItemProps {
  id: string
  question: string
  answer: string
}

export function FaqItem({ id, question, answer }: FaqItemProps) {
  return (
    <details
      id={id}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm scroll-mt-24"
    >
      <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
        <span className="flex items-start justify-between gap-4">
          <span className="flex items-center gap-3">
            {question}
            <a
              href={`#${id}`}
              className="inline-flex opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
              aria-label="Link naar deze vraag"
              title="Link naar deze vraag"
              onClick={(e) => {
                e.preventDefault()
                window.history.replaceState(null, "", `#${id}`)
                const el = document.getElementById(id)
                el?.scrollIntoView({ behavior: "smooth", block: "center" })
                el?.setAttribute("open", "")
              }}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors">
                <Link2 className="h-3 w-3" aria-hidden="true" />
              </span>
            </a>
          </span>
          <span
            aria-hidden="true"
            className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform group-open:rotate-45"
          >
            +
          </span>
        </span>
      </summary>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{answer}</p>
    </details>
  )
}
