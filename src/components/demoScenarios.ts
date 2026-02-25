export type BubbleTone = "user" | "agent" | "meta"

export type ScenarioBubble = {
  tone: BubbleTone
  label?: string
  text: string
}

export type DashboardDemoScenario = {
  title: string
  channel: string
  status: string
  bubbles: ScenarioBubble[]
  resultaat: string
}

export const HOMEPAGE_SCENARIOS: DashboardDemoScenario[] = [
  {
    title: "Inbox triage",
    channel: "WhatsApp",
    status: "Inbox triage + draft",
    bubbles: [
      {
        tone: "user",
        label: "Jij",
        text: "Kun je die offerte-mail van vanochtend triagen en een reply draft maken?",
      },
      {
        tone: "agent",
        label: "Your Assistant",
        text: "Check. Welke tone of voice wil je (formeel / direct / vriendelijk) en wil je dat ik meteen 2 follow-up vragen toevoeg?",
      },
      {
        tone: "user",
        label: "Jij",
        text: "Zakelijk en direct. Voeg 2 vragen toe: deadline + of ze al een CRM gebruiken.",
      },
      {
        tone: "agent",
        label: "Your Assistant",
        text: "Gedaan. Ik heb 1 draft klaargezet in Gmail. Wil je eerst approval, of mag ik bij dit soort leads automatisch drafts maken?",
      },
      {
        tone: "meta",
        label: "Acties",
        text: "Lead herkend (P1) • draft opgeslagen in Gmail • follow-up reminder +24u • lead entry gelogd",
      },
      {
        tone: "agent",
        label: "Your Assistant",
        text: "Als je wilt, kan ik ook de lead meteen aan Sales toewijzen en een taak aanmaken voor morgen.",
      },
    ],
    resultaat:
      "✓ Gmail: reply draft klaar (wacht op approval)\n✓ Lead gelogd (CRM/Sheet)\n✓ Follow-up reminder gepland (+24u)\n✓ Run gelogd (audit trail)",
  },
  {
    title: "Lead intake",
    channel: "WhatsApp",
    status: "Kwalificatie + routing",
    bubbles: [
      {
        tone: "user",
        label: "Lead",
        text: "Hoi! Wij willen AI inzetten voor support en sales. Kunnen jullie helpen?",
      },
      {
        tone: "agent",
        label: "Your Assistant",
        text: "Ja. 3 snelle vragen zodat ik je direct goed route: (1) teamgrootte, (2) welke tools (Gmail/WhatsApp/CRM), (3) wanneer wil je live?",
      },
      {
        tone: "user",
        label: "Lead",
        text: "Support 10 mensen. Sales in HubSpot. Liefst binnen 4 weken live.",
      },
      {
        tone: "agent",
        label: "Your Assistant",
        text: "Top. Dit is een goede fit. Wil je dat ik 2 intake-slots voorstel (morgen/overmorgen) of stuur ik eerst een indicatie van scope + vanafprijs?",
      },
      {
        tone: "meta",
        label: "Acties",
        text: "Leadscore berekend • samenvatting opgeslagen • status: Qualified • intake-slots klaargezet",
      },
      {
        tone: "user",
        label: "Lead",
        text: "Stuur eerst een indicatie en daarna slots.",
      },
    ],
    resultaat:
      "✓ Leadscore + samenvatting opgeslagen\n✓ Status: Qualified\n✓ Indicatie-bericht klaar voor verzending\n✓ Intake-slots voorgesteld",
  },
  {
    title: "Proactive updates",
    channel: "WhatsApp",
    status: "Proactive briefing",
    bubbles: [
      {
        tone: "agent",
        label: "Your Assistant",
        text: "Goedemorgen. 3 dingen die aandacht nodig hebben:",
      },
      {
        tone: "agent",
        label: "Your Assistant",
        text: "1) Een klantreply staat klaar en wacht op jouw approval.",
      },
      {
        tone: "agent",
        label: "Your Assistant",
        text: "2) Over 10 min start je meeting - ik heb de notities als concept toegevoegd.",
      },
      {
        tone: "agent",
        label: "Your Assistant",
        text: "3) Factuur is betaald - ik kan de ontvangstbevestiging versturen. Wil je eerst even kijken?",
      },
      {
        tone: "user",
        label: "Jij",
        text: "Stuur de ontvangstbevestiging. En zet die klantreply klaar voor approval.",
      },
      {
        tone: "meta",
        label: "Acties",
        text: "Receipt mail draft klaar • approval request gestuurd • meeting notes concept opgeslagen",
      },
    ],
    resultaat:
      "✓ Receipt: concept klaar (versturen na approval)\n✓ Klantreply: approval flow gestart\n✓ Meeting: notities gekoppeld\n✓ Run gelogd (audit trail)",
  },
]

export const INTEGRATION_DEMO_SCENARIOS: Record<string, DashboardDemoScenario[]> = {
  gmail: [
    {
      title: "Inbox triage",
      channel: "Gmail",
      status: "Triage + draft",
      bubbles: [
        {
          tone: "user",
          label: "Team",
          text: "Nieuwe offerte-mails eerst. Zet de rest op later en maak een draft klaar.",
        },
        {
          tone: "agent",
          label: "Agent",
          text: "Nieuwe thread herkend: offerteaanvraag voor 25 accounts. Prioriteit = hoog, type = sales lead.",
        },
        {
          tone: "meta",
          label: "Acties",
          text: "Labels gezet, conceptantwoord opgesteld en follow-up taak toegevoegd voor vandaag.",
        },
      ],
      resultaat: "Inbox blijft schoon en sales krijgt direct de juiste threads met context.",
    },
    {
      title: "Follow-up reminder",
      channel: "Gmail",
      status: "Monitoring actief",
      bubbles: [
        {
          tone: "user",
          label: "Team",
          text: "Herinner me als een prospect 2 dagen niet reageert in dezelfde thread.",
        },
        {
          tone: "agent",
          label: "Agent",
          text: "Thread stil sinds 48 uur. Dealcontext geladen: onboarding Q2, laatste reactie op maandag.",
        },
        {
          tone: "meta",
          label: "Acties",
          text: "Follow-up draft klaargezet in dezelfde thread en reminder gelogd in CRM.",
        },
      ],
      resultaat: "Opvolging gebeurt consistent zonder handmatige checks.",
    },
  ],
  "google-calendar": [
    {
      title: "Meeting plannen",
      channel: "Google Calendar",
      status: "Scheduling flow",
      bubbles: [
        {
          tone: "user",
          label: "User",
          text: "Plan een kennismaking van 30 minuten volgende week met 15 minuten buffer.",
        },
        {
          tone: "agent",
          label: "Agent",
          text: "Beschikbaarheid opgehaald (ma-vr 09:00-17:00). Vier geschikte tijdsloten gevonden.",
        },
        {
          tone: "meta",
          label: "Acties",
          text: "Voorstelbericht met 4 tijdsloten klaargezet en agenda-regels toegepast.",
        },
      ],
      resultaat: "Minder heen-en-weer en planning blijft binnen afgesproken regels.",
    },
    {
      title: "Verzetten",
      channel: "Google Calendar",
      status: "Reschedule",
      bubbles: [
        {
          tone: "user",
          label: "User",
          text: "De klant wil verzetten naar donderdagmiddag. Kun je dit regelen en bevestigen?",
        },
        {
          tone: "agent",
          label: "Agent",
          text: "Bestaande demo-call gevonden en nieuw slot gereserveerd op donderdag 14:30.",
        },
        {
          tone: "meta",
          label: "Acties",
          text: "Uitnodiging bijgewerkt, bevestiging verstuurd en wijziging gelogd.",
        },
      ],
      resultaat: "Reschedules blijven snel en netjes traceerbaar.",
    },
  ],
  whatsapp: [
    {
      title: "Support intake",
      channel: "WhatsApp",
      status: "Support + escalatie",
      bubbles: [
        {
          tone: "user",
          label: "Klant",
          text: "Ik zie factuur 1049 niet in mijn account. Kunnen jullie helpen?",
        },
        {
          tone: "agent",
          label: "Agent",
          text: "Intent herkend: billing. FAQ-check gedaan en ontbrekende info gevraagd: klantnummer.",
        },
        {
          tone: "meta",
          label: "Acties",
          text: "Escalatie naar finance voorbereid met samenvatting en klantcontext.",
        },
      ],
      resultaat: "Eerste lijn reageert direct en finance krijgt complete escalaties.",
    },
    {
      title: "Lead intake",
      channel: "WhatsApp",
      status: "Lead qualification",
      bubbles: [
        {
          tone: "user",
          label: "Lead",
          text: "Ik heb interesse in automatisering voor support en sales. Wat kunnen jullie doen?",
        },
        {
          tone: "agent",
          label: "Agent",
          text: "Kwalificatievragen gestuurd over teamgrootte, use case en timing. Leadscore berekend: 82/100.",
        },
        {
          tone: "meta",
          label: "Acties",
          text: "Lead doorgestuurd naar sales met samenvatting en voorgestelde next step.",
        },
      ],
      resultaat: "Sales ontvangt alleen gekwalificeerde leads met context.",
    },
  ],
  zapier: [
    {
      title: "Form to sheet",
      channel: "Zapier",
      status: "Bridge workflow",
      bubbles: [
        {
          tone: "user",
          label: "Ops",
          text: "Nieuwe form leads naar Google Sheet en stuur direct een Slack alert.",
        },
        {
          tone: "agent",
          label: "Agent",
          text: "Zapier trigger ontvangen. Payload gevalideerd: naam, e-mail en use case aanwezig.",
        },
        {
          tone: "meta",
          label: "Acties",
          text: "Sheet-row toegevoegd, Slack alert gepost en run gelogd met status ok.",
        },
      ],
      resultaat: "Snelle glue-workflows zonder handwerk tussen tools.",
    },
    {
      title: "MVP notificaties",
      channel: "Zapier",
      status: "MVP automation",
      bubbles: [
        {
          tone: "user",
          label: "Ops",
          text: "Gebruik Zapier voor een snelle MVP-koppeling met notificaties in 3 stappen.",
        },
        {
          tone: "agent",
          label: "Agent",
          text: "Action chain gestart. Stap 1-3 uitgevoerd zonder errors, latency 2.4s.",
        },
        {
          tone: "meta",
          label: "Acties",
          text: "Runstatus opgeslagen en foutafhandeling gecontroleerd voor retry-scenario's.",
        },
      ],
      resultaat: "Je hebt snel een werkende MVP met logging en controle.",
    },
  ],
  salesforce: [
    {
      title: "Lead routing",
      channel: "Salesforce",
      status: "CRM automation",
      bubbles: [
        {
          tone: "user",
          label: "Sales",
          text: "Routeer enterprise leads direct naar het AE-team en maak een follow-up taak.",
        },
        {
          tone: "agent",
          label: "Agent",
          text: "Nieuwe lead gesegmenteerd als Enterprise op basis van company size en intake-velden.",
        },
        {
          tone: "meta",
          label: "Acties",
          text: "Owner toegewezen aan AE Benelux en taak aangemaakt voor opvolging binnen 24 uur.",
        },
      ],
      resultaat: "Lead routing gebeurt consistent en sneller binnen je pipeline.",
    },
    {
      title: "Activity logging",
      channel: "Salesforce",
      status: "Sync + logging",
      bubbles: [
        {
          tone: "user",
          label: "Sales",
          text: "Log meetings en mails automatisch in het juiste opportunity record.",
        },
        {
          tone: "agent",
          label: "Agent",
          text: "Opportunity context geladen. E-mailthread en meeting-samenvatting gematcht op deal-ID.",
        },
        {
          tone: "meta",
          label: "Acties",
          text: "Activiteit gelogd in CRM en laatste samenvatting opgeslagen in het dossier.",
        },
      ],
      resultaat: "CRM-data blijft up-to-date zonder handmatige invoer.",
    },
  ],
  slack: [
    {
      title: "Approval flow",
      channel: "Slack",
      status: "Approval routing",
      bubbles: [
        {
          tone: "user",
          label: "Finance",
          text: "Laat purchase requests in #finance-approvals landen met bedrag, owner en deadline.",
        },
        {
          tone: "agent",
          label: "Agent",
          text: "Nieuwe aanvraag gedetecteerd in #ops. Context verrijkt met budget, requester en deadline.",
        },
        {
          tone: "meta",
          label: "Acties",
          text: "Approval-thread gestart in #finance-approvals en statustracking geactiveerd.",
        },
      ],
      resultaat: "Approvals lopen via een vaste route met complete context en audit trail.",
    },
    {
      title: "Helpdesk triage",
      channel: "Slack",
      status: "IT intake",
      bubbles: [
        {
          tone: "user",
          label: "IT",
          text: "Label IT-vragen automatisch en stuur een intakevraag bij ontbrekende info.",
        },
        {
          tone: "agent",
          label: "Agent",
          text: "Bericht geclassificeerd als IT / Toegang. Prioriteit P2 op basis van impactregels.",
        },
        {
          tone: "meta",
          label: "Acties",
          text: "Intakevraag geplaatst in thread en ticket-routing voorbereid voor de servicedesk.",
        },
      ],
      resultaat: "Helpdesk krijgt beter geclassificeerde tickets met minder ping-pong.",
    },
  ],
}

export const createFallbackIntegrationScenarios = (
  integrationName: string,
): DashboardDemoScenario[] => [
  {
    title: "Koppeling testen",
    channel: integrationName,
    status: "Veilige proefrun",
    bubbles: [
      {
        tone: "user",
        label: "Team",
        text: `Test de ${integrationName}-koppeling met een veilige proefrun en alleen testdata.`,
      },
      {
        tone: "agent",
        label: "Agent",
        text: "Authenticatie gecontroleerd en testevent ontvangen binnen de afgesproken scope.",
      },
      {
        tone: "meta",
        label: "Acties",
        text: "Smoke test uitgevoerd, output gevalideerd en run gelogd voor review.",
      },
    ],
    resultaat: "Je ziet snel of de koppeling werkt zonder risico op productie-impact.",
  },
  {
    title: "Workflow uitvoeren",
    channel: integrationName,
    status: "Pilot flow",
    bubbles: [
      {
        tone: "user",
        label: "Team",
        text: "Voer daarna dezelfde workflow uit op een echte case met logging en controles.",
      },
      {
        tone: "agent",
        label: "Agent",
        text: "Input gevalideerd, mappings toegepast en uitzonderingen gecontroleerd volgens de workflowregels.",
      },
      {
        tone: "meta",
        label: "Acties",
        text: "Output verwerkt, status gelogd en resultaat klaargezet voor acceptatie.",
      },
    ],
    resultaat: "Van test naar pilot met controleerbare stappen en audit trail.",
  },
]
