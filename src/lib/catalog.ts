import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCheck,
  Cloud,
  FileText,
  Handshake,
  Inbox,
  MessageSquare,
  Receipt,
  RefreshCw,
  Send,
  ShieldCheck,
  Target,
  UserCheck,
  Workflow,
  Wrench,
} from "lucide-react"

import type { BrandIconName } from "../components/BrandIcon"

export interface UseCase {
  slug: string
  title: string
  icon: LucideIcon
  shortDescription: string
  longDescription: string
  typicalIntegrations: string[]
  whatYouNeed: string[]
  deliverables: string[]
}

export const USE_CASES: UseCase[] = [
  {
    slug: "email-management",
    title: "Email management",
    icon: Inbox,
    shortDescription:
      "Triage van je inbox, concept-antwoorden, opvolging en prioritering - zodat je team alleen nog hoeft te reviewen.",
    longDescription:
      "Je inbox is geen werkplek. Met een OpenClaw agent automatiseer je triage, prioriteit, concept-antwoorden en opvolging. Resultaat: sneller reageren, minder context-switching en consistente communicatie.",
    typicalIntegrations: ["Gmail", "Google Calendar", "HubSpot", "Google Sheets"],
    whatYouNeed: [
      "Toegang tot mailbox (of gedeelde mailbox)",
      "Voorbeeldcases van goede antwoorden",
      "Duidelijke categorieen en prioriteitsregels",
    ],
    deliverables: [
      "Classificatie + labels/routers",
      "Draft replies met tone-of-voice",
      "Follow-up reminders en escalaties",
      "Logging en acceptatiecriteria",
    ],
  },
  {
    slug: "whatsapp-support",
    title: "WhatsApp support",
    icon: MessageSquare,
    shortDescription:
      "24/7 eerste lijn support: vragen beantwoorden, status updates geven en complexe cases doorzetten naar een medewerker.",
    longDescription:
      "Gebruik WhatsApp als slimme support-ingang. De agent beantwoordt FAQ, vraagt ontbrekende info uit en maakt een ticket aan als het complex wordt. Je team krijgt alleen de cases die menselijk judgement nodig hebben.",
    typicalIntegrations: ["WhatsApp", "Zendesk", "Google Sheets"],
    whatYouNeed: [
      "FAQ of kennisbank (mag klein beginnen)",
      "Escalatieregels naar mens",
      "Eventuele ticketing tool",
    ],
    deliverables: [
      "Conversatieflow + tone-of-voice",
      "Automatische intake (vragen, fotos, ordernummer)",
      "Ticket aanmaak + routing",
      "Audit trail en monitoring",
    ],
  },
  {
    slug: "lead-qualification",
    title: "Lead qualification",
    icon: UserCheck,
    shortDescription:
      "Kwalificeer leads automatisch via chat of e-mail, verzamel context en zet alleen de juiste prospects door naar sales.",
    longDescription:
      "Stop met tijd verspillen aan vage leads. De agent stelt een korte set vragen, scoort fit en zet gekwalificeerde leads door naar je CRM met context en next steps.",
    typicalIntegrations: ["WhatsApp", "HubSpot", "Salesforce", "Google Sheets"],
    whatYouNeed: [
      "Jouw ideale klantprofiel",
      "Kwalificatievragen (max 5 tot 8)",
      "CRM velden en pipeline afspraken",
    ],
    deliverables: [
      "Kwalificatieflow + scoring",
      "CRM logging",
      "Automatische reminders/follow-ups",
      "Rapportage over conversie",
    ],
  },
  {
    slug: "meeting-scheduling",
    title: "Meeting scheduling",
    icon: CalendarDays,
    shortDescription:
      "Stop met heen-en-weer mailen. Plan afspraken op basis van beschikbaarheid, agenda regels en bevestigingen.",
    longDescription:
      "De agent plant meetings op basis van jouw beschikbaarheid, meeting types, buffers en intake vragen. Inclusief bevestiging, reminders en post-meeting follow-up.",
    typicalIntegrations: ["Google Calendar", "Gmail", "Zoom"],
    whatYouNeed: [
      "Meeting types + duur",
      "Beschikbaarheidsregels",
      "Intake vragen (optioneel)",
    ],
    deliverables: [
      "Scheduling flow",
      "Automatische reminders",
      "Agenda hygiene (buffers, labels)",
      "Logging van afspraken",
    ],
  },
  {
    slug: "invoice-tracking",
    title: "Invoice tracking en payment reminders",
    icon: Receipt,
    shortDescription:
      "Track facturen, detecteer achterstanden en verstuur professionele herinneringen met oplopende toon - volledig automatisch.",
    longDescription:
      "Nooit meer achter facturen aan. De agent monitort openstaande posten, stuurt vriendelijke reminders en escaleert richting 'firm' op basis van jouw beleid.",
    typicalIntegrations: ["Gmail", "Google Sheets", "Stripe"],
    whatYouNeed: [
      "Bron van factuurstatus (boekhouding, sheet of export)",
      "Herinneringsschema en tone-of-voice",
    ],
    deliverables: [
      "Automatische reminders",
      "Status updates en uitzonderingen",
      "Escalatieflow",
      "Overzichtsrapport",
    ],
  },
  {
    slug: "internal-helpdesk",
    title: "Internal helpdesk (IT/HR)",
    icon: Wrench,
    shortDescription:
      "Routeer interne requests, verzamel ontbrekende info en zet tickets klaar met de juiste prioriteit en categorie.",
    longDescription:
      "Eerste lijn IT en HR vragen kunnen grotendeels geautomatiseerd: intake, classificatie, standaard antwoorden en routing. Minder ping-pong, meer doorlooptijd.",
    typicalIntegrations: ["Slack", "Microsoft Teams", "Jira"],
    whatYouNeed: [
      "Ticket categorieen",
      "SLA/prioriteitsregels",
      "Kennisartikelen (kan minimaal)",
    ],
    deliverables: [
      "Triage + routing",
      "Automatische intake",
      "Status updates",
      "Logging",
    ],
  },
  {
    slug: "customer-onboarding",
    title: "Customer onboarding",
    icon: Handshake,
    shortDescription:
      "Nieuwe klanten sneller live: intake, documentatie, checklists en activatie-stappen geautomatiseerd en traceerbaar.",
    longDescription:
      "Onboarding is vaak een checklist-chaos. De agent verzamelt documenten, zet taken klaar en bewaakt deadlines. Jij houdt grip met een audit trail.",
    typicalIntegrations: ["Google Drive", "Google Sheets", "HubSpot"],
    whatYouNeed: [
      "Onboarding checklist",
      "Benodigde documenten",
      "Owner per stap",
    ],
    deliverables: [
      "Automatische document intake",
      "Task routing",
      "Reminders en escalaties",
      "Overzichtspagina in sheet/CRM",
    ],
  },
  {
    slug: "knowledge-base-qa",
    title: "Knowledge base Q&A",
    icon: BookOpen,
    shortDescription:
      "Een agent die vragen beantwoordt door je interne documenten te doorzoeken - met bronverwijzingen en rollen/rechten.",
    longDescription:
      "Laat medewerkers vragen stellen en direct antwoorden krijgen met bronnen. Dit werkt goed voor policies, procedures en productkennis.",
    typicalIntegrations: ["Google Drive", "Notion", "Slack"],
    whatYouNeed: [
      "Documenten (PDF, docs, pagina's)",
      "Rollen en toegangsrechten",
      "Scope (welke onderwerpen wel/niet)",
    ],
    deliverables: [
      "Index + retrieval",
      "Antwoorden met bronnen",
      "Beperkte scope + guardrails",
      "Usage logging",
    ],
  },
  {
    slug: "report-generation",
    title: "Automated report generation",
    icon: BarChart3,
    shortDescription:
      "Genereer wekelijkse management updates, dashboards en stakeholder reports op basis van data uit je tools.",
    longDescription:
      "Rapportages kosten tijd en zijn saai. De agent verzamelt data, schrijft een heldere samenvatting en maakt een actie-lijst voor je team.",
    typicalIntegrations: ["Google Sheets", "HubSpot", "Slack"],
    whatYouNeed: [
      "Brondata",
      "Template of gewenste structuur",
      "Frequentie en ontvangers",
    ],
    deliverables: [
      "Automatische data pull",
      "Report template",
      "Distributie via mail/chat",
      "Logging",
    ],
  },
  {
    slug: "crm-data-sync",
    title: "CRM data sync",
    icon: RefreshCw,
    shortDescription:
      "Log e-mails, meetings en deal updates automatisch in je CRM - zonder handmatige data entry.",
    longDescription:
      "Laat de agent interacties automatisch vastleggen. Resultaat: een CRM dat klopt, zonder dat sales het hoeft bij te houden.",
    typicalIntegrations: ["HubSpot", "Salesforce", "Gmail"],
    whatYouNeed: [
      "CRM velden en mapping",
      "Welke events loggen",
      "Privacy afspraken",
    ],
    deliverables: [
      "Event logging",
      "Field mapping",
      "Dedup en kwaliteitschecks",
      "Rapportage",
    ],
  },
  {
    slug: "document-drafting",
    title: "Document drafting",
    icon: FileText,
    shortDescription:
      "Concepten voor voorstellen, rapporten en e-mails op basis van templates en input uit je systemen - altijd met review.",
    longDescription:
      "Maak documenten sneller en consistenter. De agent vult templates met data en context en levert een draft aan voor review.",
    typicalIntegrations: ["Google Drive", "Notion", "Gmail"],
    whatYouNeed: [
      "Templates",
      "Brondata",
      "Review flow",
    ],
    deliverables: [
      "Template library",
      "Draft generator",
      "Review checklist",
      "Logging",
    ],
  },
  {
    slug: "approval-workflows",
    title: "Approval workflow automation",
    icon: CheckCheck,
    shortDescription:
      "Laat aanvragen automatisch langs de juiste beslissers gaan, met context, deadlines en audit trail.",
    longDescription:
      "Van purchase requests tot beleid approvals. De agent bewaakt wie moet goedkeuren, wanneer en met welke context.",
    typicalIntegrations: ["Slack", "Google Sheets", "Jira"],
    whatYouNeed: [
      "Approval matrix",
      "Deadline regels",
      "Audit requirements",
    ],
    deliverables: [
      "Approval routing",
      "Context bundeling",
      "Reminders",
      "Audit trail",
    ],
  },
]

export interface Integration {
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  brand?: BrandIconName
  icon?: LucideIcon
  exampleAutomations: string[]
}

export const INTEGRATIONS: Integration[] = [
  {
    slug: "gmail",
    name: "Gmail",
    brand: "gmail",
    icon: Inbox,
    shortDescription: "Email triage, drafts, follow-ups en routing.",
    longDescription:
      "Koppel Gmail om e-mail workflows te automatiseren: triage, drafts, opvolging, en logging naar je CRM of tasks.",
    exampleAutomations: [
      "Inbox triage en prioriteit",
      "Draft replies met tone-of-voice",
      "Email to task",
    ],
  },
  {
    slug: "google-calendar",
    name: "Google Calendar",
    brand: "google-calendar",
    icon: CalendarDays,
    shortDescription: "Scheduling, reminders en beschikbaarheid.",
    longDescription:
      "Laat een agent meetings plannen, verzetten en bevestigen. Inclusief buffers, intake vragen en reminders.",
    exampleAutomations: [
      "Meeting scheduling",
      "Reminders + follow-up",
      "Intake vragen",
    ],
  },
  {
    slug: "whatsapp",
    name: "WhatsApp",
    brand: "whatsapp",
    icon: MessageSquare,
    shortDescription: "Support, bookings en lead intake via chat.",
    longDescription:
      "Maak WhatsApp een slimme ingang voor support en sales. De agent beantwoordt, verzamelt info en escaleert waar nodig.",
    exampleAutomations: [
      "24/7 support",
      "Lead qualification",
      "Appointment booking",
    ],
  },
  {
    slug: "zapier",
    name: "Zapier",
    brand: "zapier",
    icon: Workflow,
    shortDescription: "Koppel met duizenden tools via triggers en acties.",
    longDescription:
      "Gebruik Zapier voor snelle koppelingen met je bestaande stack. Ideaal voor MVP automatiseringen en glue-workflows.",
    exampleAutomations: [
      "CRM sync",
      "Form to sheet",
      "Notifications",
    ],
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    icon: Cloud,
    shortDescription: "Leads, opportunities en activity logging.",
    longDescription:
      "Automatiseer lead routing, opportunity updates en activity logging. Houd je pipeline consistent zonder handwerk.",
    exampleAutomations: [
      "Lead routing",
      "Activity logging",
      "Pipeline updates",
    ],
  },
  {
    slug: "slack",
    name: "Slack",
    icon: Send,
    shortDescription: "Interne workflows, alerts en approvals in channels.",
    longDescription:
      "Laat de agent samenwerken in Slack: approvals, alerts, status updates en helpdesk triage.",
    exampleAutomations: [
      "Approvals",
      "Helpdesk triage",
      "Report distribution",
    ],
  },
]

export interface Guide {
  slug: string
  title: string
  icon: LucideIcon
  shortDescription: string
  overview: string
  steps: string[]
  checklist: string[]
}

export const GUIDES: Guide[] = [
  {
    slug: "eerste-agent",
    title: "Je eerste AI agent opzetten",
    icon: Target,
    shortDescription: "Van use case naar productie: scope, acceptatie en go-live.",
    overview:
      "Een goede eerste agent is klein, meetbaar en veilig. Start met 1 workflow en maak die production-ready.",
    steps: [
      "Kies 1 workflow met duidelijke input en output",
      "Definieer acceptatiecriteria en edge cases",
      "Koppel alleen de minimaal benodigde tools",
      "Test met echte cases en log alles",
      "Go-live met gecontroleerde uitrol",
    ],
    checklist: [
      "Owner per workflow",
      "Voorbeeldcases",
      "Toegangen en permissions",
      "Logging en rollback plan",
    ],
  },
  {
    slug: "security",
    title: "Security checklist",
    icon: ShieldCheck,
    shortDescription: "Permissions, logging, secrets en governance - veilig in productie.",
    overview:
      "Security is een baseline. Je wil weten: wie kan erbij, waar gaat data heen, en wat wordt gelogd.",
    steps: [
      "Least privilege per integratie",
      "Secrets niet in code - alleen in secret store",
      "Audit logs voor acties en beslissingen",
      "Beperk scope en data exposure",
    ],
    checklist: [
      "Rollen en rechten",
      "Logging bewaartermijn",
      "Incident flow",
      "Backups",
    ],
  },
]
