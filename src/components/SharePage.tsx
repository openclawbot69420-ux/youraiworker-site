"use client"

import { useState } from "react"
import { Share2, Link2, Check, Linkedin, Twitter, Mail } from "lucide-react"

interface SharePageProps {
  title?: string
  className?: string
}

export const SharePage: React.FC<SharePageProps> = ({
  title = "Deel deze pagina",
  className = "",
}) => {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""
  const pageTitle = typeof document !== "undefined" ? document.title : "Your AI Worker"

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = currentUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(pageTitle)}`,
      color: "hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300",
    },
    {
      name: "E-mail",
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(`Bekijk dit: ${currentUrl}`)}`,
      color: "hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300",
    },
  ]

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={title}
      >
        <Share2 className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">{title}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Popup */}
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              Delen via
            </p>

            {/* Copy link button */}
            <button
              onClick={handleCopyLink}
              className="mb-2 flex w-full items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              {copied ? (
                <>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-medium text-emerald-700">Link gekopieerd</p>
                    <p className="text-xs text-slate-500">Plakken maar</p>
                  </div>
                </>
              ) : (
                <>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <Link2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-medium">Link kopiëren</p>
                    <p className="text-xs text-slate-500">Klik om te kopiëren</p>
                  </div>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="my-2 border-t border-slate-100" />

            {/* Social links */}
            <div className="flex justify-around">
              {shareLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex flex-col items-center gap-1 rounded-lg border border-slate-200 p-2 transition-all hover:shadow-sm ${link.color}`}
                    title={`Delen via ${link.name}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="text-[10px] font-medium">{link.name}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
