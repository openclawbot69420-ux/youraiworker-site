"use client"

import { useState } from "react"
import { Share2, Link2, Check, Linkedin, Twitter, Mail } from "lucide-react"
import { useSuccessToast } from "./Toast"

interface ShareButtonProps {
  url?: string
  title?: string
  description?: string
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url: propUrl,
  title = "Your AI Worker",
  description = "Bekijk de prijzen voor done-for-you AI-agent implementatie.",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const showSuccess = useSuccessToast()

  const url = propUrl || (typeof window !== "undefined" ? window.location.href : "")
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
    },
    {
      name: "X / Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedDescription}`,
      color: "hover:bg-black hover:text-white hover:border-black",
    },
    {
      name: "E-mail",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: "hover:bg-slate-900 hover:text-white hover:border-slate-900",
    },
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      showSuccess("Link gekopieerd naar klembord")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Silently fail
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Share2 className="h-4 w-4" aria-hidden="true" />
        <span>Delen</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Deel deze pagina
            </p>

            <div className="mt-4 flex gap-2">
              {shareLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all ${link.color}`}
                    title={`Delen via ${link.name}`}
                    aria-label={`Delen via ${link.name}`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                )
              })}
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100"
              >
                <span className="flex items-center gap-2">
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <Link2 className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>{copied ? "Gekopieerd!" : "Link kopiëren"}</span>
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ShareButton
