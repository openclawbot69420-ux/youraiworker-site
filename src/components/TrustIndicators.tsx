"use client";

import { ShieldCheck, ClipboardCheck, Eye, Clock, BadgeCheck, FileCheck } from "lucide-react";

type TrustIndicatorItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const TRUST_ITEMS: TrustIndicatorItem[] = [
  {
    icon: <ClipboardCheck className="h-4 w-4" aria-hidden="true" />,
    title: "Duidelijke scope vooraf",
    description: "Geen verrassingen of verborgen werkzaamheden",
  },
  {
    icon: <Clock className="h-4 w-4" aria-hidden="true" />,
    title: "48-uurs garantie",
    description: "Gratis bugfixes binnen 48 uur na livegang",
  },
  {
    icon: <Eye className="h-4 w-4" aria-hidden="true" />,
    title: "Volledige transparantie",
    description: "Geen automatische verlengingen of kleine lettertjes",
  },
  {
    icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
    title: "Security-first",
    description: "Tailscale, secrets management en audit logging",
  },
  {
    icon: <FileCheck className="h-4 w-4" aria-hidden="true" />,
    title: "KvK-geregistreerd",
    description: "Officieel bedrijf met BTW-nummer in Nederland",
  },
  {
    icon: <BadgeCheck className="h-4 w-4" aria-hidden="true" />,
    title: "Proefperiode",
    description: "2 weken break-fix support inbegrepen",
  },
];

export function TrustIndicators() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        Waarom klanten voor ons kiezen
      </p>
      <ul className="mt-4 space-y-3">
        {TRUST_ITEMS.map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm text-slate-600">
              {item.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-500">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TrustIndicatorsCompact() {
  return (
    <div className="mt-6 rounded-2xl border border-emerald-200/50 bg-emerald-50/50 p-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-emerald-900">Kwaliteitsgarantie</p>
          <ul className="mt-1.5 space-y-1 text-xs text-emerald-700">
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500">-</span>
              <span>48-uurs garantie na livegang</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500">-</span>
              <span>Duidelijke scope vooraf</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-500">-</span>
              <span>Geen verborgen kosten</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
