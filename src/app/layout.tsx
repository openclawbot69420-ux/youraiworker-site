import type { Metadata } from "next"
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
    <footer className="border-t border-slate-200/70 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-900">Your AI Worker</p>
            <p className="mt-1">Production-ready AI-agents voor Nederlandse bedrijven.</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a className="hover:text-slate-900 transition-colors" href="/use-cases">Use cases</a>
            <a className="hover:text-slate-900 transition-colors" href="/integrations">Integraties</a>
            <a className="hover:text-slate-900 transition-colors" href="/pricing">Prijzen</a>
            <a className="hover:text-slate-900 transition-colors" href="/security">Beveiliging</a>
            <a className="hover:text-slate-900 transition-colors" href="/privacy">Privacy</a>
            <a className="hover:text-slate-900 transition-colors" href="/contact">Contact</a>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} Your AI Worker. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  )
}

export default RootLayout
