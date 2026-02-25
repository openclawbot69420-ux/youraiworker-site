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
    title: "E-mailbeheer",
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
    title: "WhatsApp-support",
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
    title: "Leadkwalificatie",
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
    title: "Afspraken plannen",
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
    title: "Factuuroverzicht en betalingsherinneringen",
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
    title: "Interne helpdesk (IT/HR)",
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
    title: "Klantonboarding",
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
    title: "Kennisbank Q&A",
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
    title: "Geautomatiseerde rapportage",
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
    title: "CRM-datasynchronisatie",
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
    title: "Documentconcepten opstellen",
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
    shortDescription: "Inbox triage, conceptantwoorden, follow-up taken en routing naar CRM of team.",
    longDescription:
      "Koppel Gmail om terugkerende e-mailwerkstromen te automatiseren. De agent labelt inkomende mail, maakt conceptantwoorden, zet follow-up taken klaar en logt context in CRM of takenlijsten. Verzenden kan handmatig blijven of per stap worden goedgekeurd.",
    exampleAutomations: [
      "Nieuwe e-mails classificeren en prioriteren",
      "Conceptantwoorden opstellen op basis van tone-of-voice",
      "Actiepunten/logging doorzetten naar CRM of task tool",
    ],
  },
  {
    slug: "google-calendar",
    name: "Google Calendar",
    brand: "google-calendar",
    icon: CalendarDays,
    shortDescription: "Beschikbaarheid checken, tijdsloten voorstellen, afspraken boeken en reminders sturen.",
    longDescription:
      "Laat een agent afspraken plannen, verzetten en bevestigen op basis van jouw beschikbaarheidsregels. Inclusief buffers, intakevragen en reminders. Boekingen buiten beleid of met uitzonderingen kunnen altijd langs een menselijke check.",
    exampleAutomations: [
      "Beschikbare slots voorstellen op basis van agendaregels",
      "Afspraken aanmaken/verplaatsen inclusief bevestiging",
      "Reminders en intakevragen automatisch uitsturen",
    ],
  },
  {
    slug: "whatsapp",
    name: "WhatsApp",
    brand: "whatsapp",
    icon: MessageSquare,
    shortDescription: "Supportvragen beantwoorden, lead intake doen en boekingen of tickets starten via chat.",
    longDescription:
      "Maak WhatsApp een werkende intake- en supportingang. De agent beantwoordt standaardvragen, vraagt ontbrekende informatie uit, verzamelt order- of klantgegevens en zet complexe cases door naar een medewerker met context.",
    exampleAutomations: [
      "FAQ-beantwoording met escalatie naar medewerker",
      "Leadkwalificatie met vaste intakevragen",
      "Afspraak- of ticketaanmaak vanuit chatgesprek",
    ],
  },
  {
    slug: "zapier",
    name: "Zapier",
    brand: "zapier",
    icon: Workflow,
    shortDescription: "Snelle koppelingen tussen tools via triggers, acties en webhooks voor MVP-workflows.",
    longDescription:
      "Gebruik Zapier om bestaande tools snel te verbinden zonder maatwerk-API per systeem. Ideaal voor MVP-automatiseringen, notificaties en glue-workflows. Kritieke acties kunnen we laten wachten op expliciete goedkeuring.",
    exampleAutomations: [
      "Formulierinzendingen doorzetten naar CRM of sheets",
      "Events uit tools bundelen tot meldingen/alerts",
      "MVP-syncs tussen apps zonder custom backend",
    ],
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    icon: Cloud,
    shortDescription: "Lead routing, opportunity updates en activity logging zonder handmatig bijwerken.",
    longDescription:
      "Automatiseer lead routing, activity logging en updates in je pipeline. De agent verwerkt afgesproken events, vult velden aan en zet taken klaar zodat Salesforce-data bruikbaar blijft zonder extra handwerk.",
    exampleAutomations: [
      "Nieuwe leads routeren naar de juiste eigenaar",
      "E-mails/meetings automatisch loggen als activiteiten",
      "Opportunity-status of vervolgtaak bijwerken op trigger",
    ],
  },
  {
    slug: "slack",
    name: "Slack",
    icon: Send,
    shortDescription: "Interne workflows, alerts en goedkeuringen in channels of DM.",
    longDescription:
      "Laat de agent in Slack samenwerken met je team: alerts sturen, intake doen, statusupdates delen en goedkeuringen ophalen. Handig voor operationele workflows waar snelheid telt maar auditability nodig blijft.",
    exampleAutomations: [
      "Goedkeuringsverzoeken met context en deadline posten",
      "Helpdesk intake/triage in kanaal of DM",
      "Rapporten en statusupdates automatisch distribueren",
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
    shortDescription: "Van use case naar productie: scope, testset, approvals en gecontroleerde go-live.",
    overview:
      "Een goede eerste agent automatiseert 1 terugkerende workflow van begin tot eind, met duidelijke grenzen. Je definieert wat de agent zelfstandig mag doen, waar menselijke goedkeuring nodig is en hoe succes gemeten wordt.",
    steps: [
      "Kies 1 workflow met duidelijke trigger, input en output (bijv. inbox triage of afspraakplanning)",
      "Beschrijf wat de agent zelfstandig doet en welke acties eerst goedkeuring vereisen",
      "Definieer acceptatiecriteria, uitzonderingen en fallback naar mens",
      "Koppel alleen de minimaal benodigde tools en rechten",
      "Test met echte cases, log resultaten en ga live via pilot of beperkte uitrol",
    ],
    checklist: [
      "Workflow owner en approver(s)",
      "10+ realistische testcases",
      "Toegangen, permissions en API scopes",
      "Logging, monitoring en rollback plan",
    ],
  },
  {
    slug: "security",
    title: "Beveiligingschecklist",
    icon: ShieldCheck,
    shortDescription: "Permissions, approvals, logging en secrets voor veilige productie-uitrol.",
    overview:
      "Security is geen extra stap achteraf. Voor elke agentworkflow wil je vooraf vastleggen wie toegang heeft, welke acties zelfstandig mogen lopen, hoe secrets worden beheerd en wat er wordt gelogd.",
    steps: [
      "Bepaal least-privilege rechten per integratie en account",
      "Leg vast welke acties menselijke goedkeuring vereisen (bijv. verzenden, muteren, verwijderen)",
      "Beheer secrets buiten code en beperk toegang tot productie-credentials",
      "Log agentacties, goedkeuringen en fouten voor audit en troubleshooting",
      "Beperk scope, dataretentie en zichtbaarheid per rol of team",
    ],
    checklist: [
      "Rollen, rechten en approvers",
      "Secret store en rotatiebeleid",
      "Logging bewaartermijn en audit trail",
      "Incident flow en rollback/procedure",
    ],
  },
]
