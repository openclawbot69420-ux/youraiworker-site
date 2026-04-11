"use client"

import { useState, useCallback } from "react"
import { Mail, Copy, Check } from "lucide-react"

// Email obfuscation: stored as array to prevent simple regex scraping
const EMAIL_PARTS = ["info", "@", "youraiworker", ".", "nl"]
const FULL_EMAIL = EMAIL_PARTS.join("")

 type EmailLinkProps = {
  showIcon?: boolean
  className?: string
  children?: React.ReactNode
  variant?: "default" | "button" | "inline"
}

export const EmailLink: React.FC<EmailLinkProps> = ({
  showIcon = true,
  className = "",
  children,
  variant = "default",
}) => {
  const [copied, setCopied] = useState(false)

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = `mailto:${FULL_EMAIL}`
  }, [])

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(FULL_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: do nothing on failure
    }
  }, [])

  // Render email by joining parts (prevents simple scraping)
  const renderEmail = () => (
    <>
      {EMAIL_PARTS[0]}
      <span style={{ display: "none" }}>&#64;</span>
      {EMAIL_PARTS[1]}
      {EMAIL_PARTS[2]}
      {EMAIL_PARTS[3]}
      {EMAIL_PARTS[4]}
    </>
  )

  if (variant === "button") {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <a
          href="#"
          onClick={handleClick}
          onContextMenu={(e) => e.preventDefault()}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
          title={`E-mail versturen naar ${FULL_EMAIL}`}
        >
          {showIcon && <Mail className="h-4 w-4" aria-hidden="true" />}
          {children || renderEmail()}
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
          title={copied ? "Gekopieerd!" : "E-mailadres kopiëren"}
          aria-label={copied ? "E-mailadres gekopieerd" : "E-mailadres kopiëren"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </span>
    )
  }

  if (variant === "inline") {
    return (
      <a
        href="#"
        onClick={handleClick}
        onContextMenu={(e) => e.preventDefault()}
        className={`font-medium text-slate-700 underline underline-offset-2 transition-colors hover:text-slate-900 ${className}`}
        title={`E-mail versturen naar ${FULL_EMAIL}`}
      >
        {children || renderEmail()}
      </a>
    )
  }

  return (
    <a
      href="#"
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
      className={`inline-flex items-center gap-1.5 transition-colors hover:text-slate-900 ${className}`}
      title={`E-mail versturen naar ${FULL_EMAIL}`}
    >
      {showIcon && <Mail className="h-3.5 w-3.5" aria-hidden="true" />}
      {children || renderEmail()}
    </a>
  )
}

export const EMAIL_ADDRESS = FULL_EMAIL
