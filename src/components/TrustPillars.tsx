import { ShieldCheck, Clock, MapPin, Wallet, BadgeCheck, LifeBuoy } from "lucide-react";

/**
 * TrustPillars - Professional trust indicators that display key credibility signals.
 *
 * Shows concisely: guarantee, response time, location, pricing model, verification,
 * and support commitment. Designed for placement near CTAs to reduce friction.
 */

const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    label: "48-uurs garantie",
    description: "Niet tevreden? Dan betaal je niet.",
    variant: "primary" as const,
  },
  {
    icon: Clock,
    label: "Snelle reactie",
    description: "Binnen 1 werkdag (ma-vr)",
    variant: "default" as const,
  },
  {
    icon: MapPin,
    label: "KvK Amsterdam",
    description: "95290475 - Officieel geregistreerd",
    variant: "default" as const,
  },
  {
    icon: Wallet,
    label: "Geen abonnement",
    description: "Eenmalige investering",
    variant: "primary" as const,
  },
  {
    icon: BadgeCheck,
    label: "AVG-compliant",
    description: "EU data, veilige setup",
    variant: "default" as const,
  },
  {
    icon: LifeBuoy,
    label: "Break-fix support",
    description: "2 weken inclusief na livegang",
    variant: "default" as const,
  },
] as const;

interface TrustPillarCardProps {
  icon: React.ElementType;
  label: string;
  description: string;
  variant: "default" | "primary";
}

const TrustPillarCard: React.FC<TrustPillarCardProps> = ({
  icon: Icon,
  label,
  description,
  variant,
}) => {
  const isPrimary = variant === "primary";

  return (
    <div
      className={[
        "flex items-start gap-3 rounded-xl border p-4 transition-all",
        "hover:shadow-sm",
        isPrimary
          ? "border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          isPrimary
            ? "bg-emerald-100 text-emerald-700"
            : "bg-slate-100 text-slate-600",
        ].join(" ")}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <p
          className={[
            "text-sm font-semibold",
            isPrimary ? "text-emerald-900" : "text-slate-900",
          ].join(" ")}
        >
          {label}
        </p>
        <p
          className={[
            "mt-0.5 text-xs leading-relaxed",
            isPrimary ? "text-emerald-800/70" : "text-slate-500",
          ].join(" ")}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export const TrustPillars: React.FC = () => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {TRUST_PILLARS.map((pillar) => (
        <TrustPillarCard key={pillar.label} {...pillar} />
      ))}
    </div>
  );
};

export default TrustPillars;
