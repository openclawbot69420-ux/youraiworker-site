"use client";

import { useState } from "react";
import { Printer, Check } from "lucide-react";

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export function PrintButton({
  label = "Print deze pagina",
  className = "",
}: PrintButtonProps) {
  const [showFeedback, setShowFeedback] = useState(false);

  const handlePrint = () => {
    window.print();
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  return (
    <button
      onClick={handlePrint}
      className={[
        "inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all",
        "hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2",
        "print:hidden",
        className,
      ].join(" ")}
      aria-label={label}
    >
      {showFeedback ? (
        <>
          <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          <span className="text-emerald-700">Printen...</span>
        </>
      ) : (
        <>
          <Printer className="h-4 w-4" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
