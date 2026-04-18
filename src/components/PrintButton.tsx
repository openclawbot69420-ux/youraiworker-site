"use client"

import { Printer } from "lucide-react"

/**
 * PrintButton - Allows users to print the current page.
 * Useful for guides and documentation that teams may want to
 * save as PDF or print for offline review.
 * 
 * Respects user's print preferences and works with existing
 * print styles in globals.css.
 */
export const PrintButton: React.FC = () => {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
      title="Print deze pagina of sla op als PDF"
      aria-label="Print deze pagina"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Print of PDF</span>
      <span className="sm:hidden">Print</span>
    </button>
  )
}
