import type { SimpleIcon } from "simple-icons"

import {
  siGmail,
  siGooglecalendar,
  siGoogledrive,
  siWhatsapp,
  siTelegram,
  siHubspot,
  siJira,
  siZendesk,
  siZapier,
  siMake,
  siN8n,
  siGooglesheets,
} from "simple-icons"

export type BrandIconName =
  | "gmail"
  | "google-calendar"
  | "google-drive"
  | "whatsapp"
  | "telegram"
  | "hubspot"
  | "jira"
  | "zendesk"
  | "zapier"
  | "make"
  | "n8n"
  | "google-sheets"

const ICONS: Record<BrandIconName, SimpleIcon> = {
  "gmail": siGmail,
  "google-calendar": siGooglecalendar,
  "google-drive": siGoogledrive,
  "whatsapp": siWhatsapp,
  "telegram": siTelegram,
  "hubspot": siHubspot,
  "jira": siJira,
  "zendesk": siZendesk,
  "zapier": siZapier,
  "make": siMake,
  "n8n": siN8n,
  "google-sheets": siGooglesheets,
}

interface BrandIconProps {
  name: BrandIconName
  title: string
  className?: string
}

export const BrandIcon: React.FC<BrandIconProps> = (props) => {
  const { name, title, className } = props

  const icon = ICONS[name]

  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 24 24"
      className={className}
      style={{ color: `#${icon.hex}` }}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  )
}
