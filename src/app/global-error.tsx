"use client"

import { useEffect } from "react"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global application error:", error)
  }, [error])

  return (
    <html lang="nl">
      <head>
        <title>Technisch probleem | Your AI Worker</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`body { font-family: 'Inter', system-ui, sans-serif; }
          .container { max-width: 42rem; margin: 0 auto; padding: 1rem; }
          .card { background: white; border-radius: 1.5rem; border: 1px solid #e2e8f0; padding: 2rem; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
          .icon-box { width: 4rem; height: 4rem; border-radius: 1rem; background: #fef3c7; border: 1px solid #fde68a; display: flex; align-items: center; justify-content: center; margin: 0 auto; }
          .icon { width: 2rem; height: 2rem; color: #d97706; }
          .label { margin-top: 1.5rem; font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; }
          .title { margin-top: 0.75rem; font-size: 1.5rem; font-weight: 700; color: #0f172a; }
          .desc { margin-top: 0.75rem; color: #475569; line-height: 1.5; }
          .ref { margin-top: 1rem; font-size: 0.75rem; font-family: monospace; color: #94a3b8; }
          .btn-row { margin-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; justify-content: center; }
          @media (min-width: 640px) { .btn-row { flex-direction: row; } }
          .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-size: 0.875rem; font-weight: 600; cursor: pointer; text-decoration: none; transition: all 0.2s; }
          .btn-primary { background: #0f172a; color: white; border: none; }
          .btn-primary:hover { background: #1e293b; }
          .btn-secondary { background: white; color: #0f172a; border: 1px solid #cbd5e1; }
          .btn-secondary:hover { background: #f8fafc; }
          .support { margin-top: 2.5rem; padding: 1.5rem; background: linear-gradient(to bottom right, #f8fafc, #f1f5f9); border-radius: 1rem; border: 1px solid #e2e8f0; }
          .support-title { font-weight: 600; color: #0f172a; }
          .support-text { margin-top: 0.25rem; color: #475569; font-size: 0.875rem; }
          .links { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e2e8f0; }
          .links-title { text-align: center; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
          .link-grid { margin-top: 1rem; display: grid; gap: 0.75rem; }
          @media (min-width: 640px) { .link-grid { grid-template-columns: repeat(2, 1fr); } }
          .link-item { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; text-decoration: none; transition: all 0.2s; }
          .link-item:hover { background: white; border-color: #cbd5e1; }
          .link-label { font-weight: 600; color: #0f172a; }
          .link-desc { font-size: 0.75rem; color: #64748b; }
          .arrow { color: #94a3b8; }
        `}</style>
      </head>
      <body className="min-h-screen bg-slate-50/50 py-16 sm:py-24">
        <div className="container">
          <div className="card">
            <div className="text-center">
              <div className="icon-box">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                  <path d="M12 9v4"/><path d="M12 17h.01"/>
                </svg>
              </div>
              <p className="label">Er is iets misgegaan</p>
              <h1 className="title">Technisch probleem</h1>
              <p className="desc">
                Er is een onverwachte fout opgetreden bij het laden van de applicatie.
                Dit is waarschijnlijk een tijdelijk technisch issue.
              </p>
              {error.digest && <p className="ref">Referentie: {error.digest}</p>}
            </div>

            <div className="btn-row">
              <button onClick={reset} className="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M8 16H3v5"/>
                </svg>
                Probeer opnieuw
              </button>
              <a href="/" className="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Terug naar home
              </a>
            </div>

            <div className="support">
              <p className="support-title">Blijft dit probleem aan?</p>
              <p className="support-text">
                Mail ons op <a href="mailto:info@youraiworker.nl" style={{color: '#0f172a', fontWeight: 500}}>info@youraiworker.nl</a> of <a href="/contact" style={{color: '#0f172a', fontWeight: 500}}>plan een intake</a>. Vermeld eventueel de referentiecode.
              </p>
            </div>

            <div className="links">
              <p className="links-title">Wellicht relevant</p>
              <nav className="link-grid">
                <a href="/pricing" className="link-item">
                  <div><div className="link-label">Prijzen</div><div className="link-desc">Bekijk tarieven</div></div>
                  <span className="arrow">→</span>
                </a>
                <a href="/use-cases" className="link-item">
                  <div><div className="link-label">Toepassingen</div><div className="link-desc">Voorbeelden</div></div>
                  <span className="arrow">→</span>
                </a>
                <a href="/faq" className="link-item">
                  <div><div className="link-label">FAQ</div><div className="link-desc">Veelgestelde vragen</div></div>
                  <span className="arrow">→</span>
                </a>
                <a href="/contact" className="link-item">
                  <div><div className="link-label">Contact</div><div className="link-desc">Direct contact</div></div>
                  <span className="arrow">→</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
