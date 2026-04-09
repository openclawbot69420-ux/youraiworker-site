"use client"

import { useEffect, useState, useCallback } from "react"
import { Keyboard, X, ArrowUp, ArrowDown, Slash, CircleHelp } from "lucide-react"

interface ShortcutItem {
  keys: string[]
  description: string
  context?: string
}

const SHORTCUTS: ShortcutItem[] = [
  {
    keys: ["?"],
    description: "Toon deze sneltoetsen",
  },
  {
    keys: ["Esc"],
    description: "Sluit dialoog of menu",
  },
  {
    keys: ["/"],
    description: "Focus zoekveld (indien beschikbaar)",
  },
  {
    keys: ["g", "h"],
    description: "Ga naar home",
    context: "Algemeen",
  },
  {
    keys: ["g", "p"],
    description: "Ga naar prijzen",
    context: "Algemeen",
  },
  {
    keys: ["g", "c"],
    description: "Ga naar contact",
    context: "Algemeen",
  },
  {
    keys: ["g", "f"],
    description: "Ga naar FAQ",
    context: "Algemeen",
  },
]

export const KeyboardShortcuts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return
      }

      // Handle ? key to open shortcuts
      if (e.key === "?" && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault()
        setIsOpen(true)
        return
      }

      // Handle Escape to close
      if (e.key === "Escape" && isOpen) {
        e.preventDefault()
        setIsOpen(false)
        return
      }

      // Track key sequence for "g" shortcuts
      if (e.key === "g" && !isOpen) {
        setPressedKeys((prev) => new Set([...prev, "g"]))
        return
      }

      // Handle "g" followed by another key
      if (pressedKeys.has("g") && !isOpen) {
        e.preventDefault()
        const destination = getDestination(e.key)
        if (destination) {
          window.location.href = destination
        }
        setPressedKeys(new Set())
        return
      }

      // Clear sequence on other keys
      setPressedKeys(new Set())
    },
    [isOpen, pressedKeys]
  )

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "g") {
        // Clear "g" after a short delay if no follow-up key
        setTimeout(() => {
          setPressedKeys((prev) => {
            const next = new Set(prev)
            next.delete("g")
            return next.size === prev.size ? prev : next
          })
        }, 500)
      }
    },
    []
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (typeof document === "undefined") return

    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 hidden rounded-full border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition-all hover:border-slate-300 hover:text-slate-700 hover:shadow md:block"
        title="Toon sneltoetsen (druk ?)"
        aria-label="Toon sneltoetsen"
      >
        <Keyboard className="h-4 w-4" aria-hidden="true" />
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-[2px]"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
      >
        <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700">
                <Keyboard className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2
                id="shortcuts-title"
                className="text-base font-semibold text-slate-900"
              >
                Sneltoetsen
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Sluit sneltoetsen"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto p-5">
            <p className="text-sm text-slate-600">
              Gebruik deze sneltoetsen om sneller door de site te navigeren.
            </p>

            <div className="mt-5 space-y-1">
              {SHORTCUTS.map((shortcut) => (
                <div
                  key={shortcut.keys.join("")}
                  className="flex items-center justify-between gap-4 rounded-lg py-2.5"
                >
                  <span className="text-sm text-slate-700">
                    {shortcut.description}
                  </span>
                  <div className="flex shrink-0 items-center gap-1">
                    {shortcut.keys.map((key, index) => (
                      <kbd
                        key={key + index}
                        className="inline-flex min-w-[1.75rem] items-center justify-center rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-xs font-medium text-slate-700"
                      >
                        {key === "ArrowUp" ? (
                          <ArrowUp className="h-3 w-3" aria-hidden="true" />
                        ) : key === "ArrowDown" ? (
                          <ArrowDown className="h-3 w-3" aria-hidden="true" />
                        ) : key === "/" ? (
                          <Slash className="h-3 w-3" aria-hidden="true" />
                        ) : key === "?" ? (
                          <CircleHelp className="h-3 w-3" aria-hidden="true" />
                        ) : (
                          key
                        )}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600">
                <strong className="text-slate-900">Tip:</strong> Druk op{" "}
                <kbd className="rounded border border-slate-300 bg-white px-1 py-0.5 text-slate-700">
                  g
                </kbd>{" "}
                gevolgd door een letter om snel te navigeren.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-center">
            <p className="text-xs text-slate-500">
              Druk op{" "}
              <kbd className="rounded border border-slate-300 bg-white px-1 py-0.5 text-slate-700">
                Esc
              </kbd>{" "}
              om te sluiten
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

const getDestination = (key: string): string | null => {
  switch (key.toLowerCase()) {
    case "h":
      return "/"
    case "p":
      return "/pricing"
    case "c":
      return "/contact"
    case "f":
      return "/faq"
    default:
      return null
  }
}

export default KeyboardShortcuts
