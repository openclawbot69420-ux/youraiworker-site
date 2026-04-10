# Your AI Worker

[![Next.js](https://img.shields.io/badge/Next.js-16.2.0-black?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Latest-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-Private-ef4444)](#)

> Productierijpe AI-agents voor Nederlandse bedrijven

[youraiworker.nl](https://youraiworker.nl) is een done-for-you AI-agent implementatie service voor Nederlandse bedrijven. We leveren productierijpe automatisering voor e-mail, chat, planning en CRM-processen - van intake tot livegang binnen 3-10 werkdagen.

## Wat we doen

- **Inbox- en triage-agenten** - Categoriseer requests, maak conceptantwoorden en zet taken klaar
- **Leadkwalificatie** - Prekwalificeer leads en log naar Google Sheets of CRM
- **Afspraken plannen** - Intake, voorstel en bevestiging met integratie op maat
- **Approval workflows** - Laat aanvragen automatisch langs de juiste beslissers gaan
- **Geautomatiseerde rapportage** - Sales, marketing en management updates op vaste momenten

## Tech Stack

- **Framework:** [Next.js 16.2](https://nextjs.org) met App Router
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Language:** TypeScript (strict mode)
- **Icons:** Lucide React + Simple Icons
- **Fonts:** Inter (Google Fonts)
- **Runtime:** OpenClaw (agent orchestration)

## Getting Started

### Prerequisites

- Node.js 22.x (zie `.nvmrc`)
- npm 10.x

### Installatie

```bash
# Clone de repository
git clone https://github.com/openclawbot69420-ux/youraiworker-site.git
cd youraiworker-site

# Installeer dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

### Build voor productie

```bash
# Genereer statische assets en bouw
npm run build

# Start productie server
npm start
```

## Scripts

| Script | Beschrijving |
|--------|--------------|
| `npm run dev` | Development server met hot reload |
| `npm run build` | Build voor productie (inclusief prebuild scripts) |
| `npm run start` | Start productie server |
| `npm run lint` | Run code linting |

## Projectstructuur

```
.
├── src/
│   ├── app/              # Next.js App Router pagina's
│   │   ├── api/          # API routes (nieuwsbrief subscription)
│   │   ├── use-cases/    # Use case detail pagina's
│   │   ├── guides/       # Handleidingen en blog content
│   │   └── ...           # Overige pagina's
│   ├── components/       # React componenten
│   ├── lib/              # Utility functies
│   └── styles/           # Globale styles
├── public/               # Statische assets
│   ├── brands/           # Integratie logo's
│   └── .well-known/      # Security txt, etc.
├── scripts/              # Build scripts
└── next.config.ts        # Next.js configuratie
```

## Belangrijke Features

### SEO & Performance
- Volledige JSON-LD structured data (Organization, Service, LocalBusiness, HowTo, FAQ)
- OpenGraph en Twitter Card meta tags
- Sitemap en robots.txt
- Core Web Vitals geoptimaliseerd

### Security & Privacy
- Security headers (HSTS, CSP-ready, X-Frame-Options)
- Security.txt (RFC 9116 compliant)
- AVG-compliant ontwerp
- Geen third-party trackers

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigatie
- Screen reader optimaal
- Reduced motion support

### PWA-ready
- Web app manifest
- Service worker ready (via next-pwa)
- App shortcuts

## Omgeving Variabelen

Maak een `.env.local` bestand aan voor locale development:

```bash
# Build datum (automatisch gegenereerd)
NEXT_PUBLIC_BUILD_DATE=2026-04-10T00:00:00.000Z

# Optioneel: Nieuwsbrief service
MAILGUN_API_KEY=...
MAILGUN_DOMAIN=...
```

## Deploy

Dit project is geconfigureerd voor deployment op [Vercel](https://vercel.com):

```bash
# Installeer Vercel CLI
npm i -g vercel

# Deploy naar preview
vercel

# Deploy naar productie
vercel --prod
```

## Bedrijfsgegevens

- **Bedrijf:** Your AI Worker
- **KvK:** 95290475
- **BTW:** NL8677.15.849.B01
- **Locatie:** Amsterdam, Nederland
- **Email:** info@youraiworker.nl
- **Security:** security@youraiworker.nl

## Security

Zie [security.txt](https://youraiworker.nl/.well-known/security.txt) voor verantwoordelijke disclosures.

Voor beveiligingsproblemen, email: security@youraiworker.nl

## Credits

Gebouwd met:
- [OpenClaw](https://openclaw.ai) - Agent runtime
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Lucide](https://lucide.dev) - Icons

---

&copy; 2026 Your AI Worker. Alle rechten voorbehouden.
