import type { Metadata } from "next"
import { Github, Linkedin } from "lucide-react"
import "../styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: "Your AI Worker - AI-agents voor je organisatie",
    template: "%s · Your AI Worker",
  },
  description:
    "Maatwerk AI-agents die je organisatie echt werk uit handen nemen. Production-ready, binnen dagen live.",
  metadataBase: new URL("https://youraiworker.nl"),
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Your AI Worker",
  },
}

const RootLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props

  return (
    <html lang="nl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          Your AI Worker
        </a>
        <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
          <a className="hover:text-slate-900 transition-colors" href="/">
            Home
          </a>
          <a className="hover:text-slate-900 transition-colors" href="/use-cases">
            Use cases
          </a>
          <a className="hover:text-slate-900 transition-colors" href="/integrations">
            Integraties
          </a>
          <a className="hover:text-slate-900 transition-colors" href="/pricing">
            Prijzen
          </a>
          <a className="hover:text-slate-900 transition-colors" href="/contact">
            Contact
          </a>
          <a className="hover:text-slate-900 transition-colors" href="/security">
            Beveiliging
          </a>
          <a
            className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 transition-colors"
            href="/contact"
          >
            Plan intake
          </a>
        </nav>
      </div>
    </header>
  )
}

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/70 bg-slate-50/80">
      <div className="mx-auto max-w-6xl px-4 py-12 text-sm text-slate-600">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="text-base font-semibold text-slate-900">Your AI Worker</p>
            <p className="mt-2 max-w-sm leading-relaxed">
              Production-ready AI-agents voor Nederlandse bedrijven. Maatwerk automatisering,
              veilig ingericht en snel live.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Navigatie
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a className="transition-colors hover:text-slate-900" href="/use-cases">
                Use cases
              </a>
              <a className="transition-colors hover:text-slate-900" href="/integrations">
                Integraties
              </a>
              <a className="transition-colors hover:text-slate-900" href="/pricing">
                Prijzen
              </a>
              <a className="transition-colors hover:text-slate-900" href="/contact">
                Contact
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Bedrijf
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a className="transition-colors hover:text-slate-900" href="/security">
                Beveiliging
              </a>
              <a className="transition-colors hover:text-slate-900" href="/privacy">
                Privacy
              </a>
              <a className="transition-colors hover:text-slate-900" href="/guides">
                Guides
              </a>
              <a className="transition-colors hover:text-slate-900" href="/contact">
                Plan intake
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Your AI Worker. Alle rechten voorbehouden.</p>
          <p>AI agents die werk uit handen nemen - netjes in productie.</p>
        </div>
      </div>
    </footer>
  )
}

export default RootLayout
