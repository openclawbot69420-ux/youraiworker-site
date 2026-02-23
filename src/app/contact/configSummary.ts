export type PackageKey = "starter" | "groei" | "maatwerk"
export type AddOnKey =
  | "ai-billing"
  | "telegram"
  | "whatsapp"
  | "crm"
  | "ticketing"
  | "security"

export type ConfigPayload = {
  selectedPackage: PackageKey
  selectedAddOns: AddOnKey[]
  volumes: {
    emailsPerDay: number
    leadsPerWeek: number
    ticketsPerWeek: number
  }
  hourlyRateEuro: number
  savedAtIso?: string
}

const PACKAGE_LABELS: Record<PackageKey, string> = {
  starter: "Starter",
  groei: "Groei",
  maatwerk: "Maatwerk",
}

const ADDON_LABELS: Record<AddOnKey, string> = {
  "ai-billing": "AI model + billing setup",
  telegram: "Telegram setup",
  whatsapp: "WhatsApp Business setup",
  crm: "CRM integratie",
  ticketing: "Ticketing (Jira/Zendesk)",
  security: "Security hardening",
}

export const getAddOnLabel = (key: AddOnKey) => {
  return ADDON_LABELS[key]
}

export const summarizeConfig = (config: ConfigPayload) => {
  const packageLabel = PACKAGE_LABELS[config.selectedPackage]
  const addOns = config.selectedAddOns.map(getAddOnLabel)

  return {
    packageLabel,
    addOns,
    volumes: config.volumes,
    hourlyRateEuro: config.hourlyRateEuro,
  }
}

export const formatConfigForEmail = (config: ConfigPayload) => {
  const summary = summarizeConfig(config)
  const addOns = summary.addOns.length > 0 ? summary.addOns.join(", ") : "Geen"

  return [
    "---",
    "Configuratie (van configurator)",
    `Package: ${summary.packageLabel}`,
    `Add-ons: ${addOns}`,
    `Volumes: ${summary.volumes.emailsPerDay} emails/dag, ${summary.volumes.leadsPerWeek} leads/week, ${summary.volumes.ticketsPerWeek} tickets/week`,
    `Uurtarief: €${summary.hourlyRateEuro}/uur`,
    "---",
    "",
  ].join("\n")
}
