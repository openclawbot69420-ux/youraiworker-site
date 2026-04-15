'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Check } from 'lucide-react'

type FeedbackState = 'idle' | 'helpful' | 'not-helpful' | 'submitted'

interface PageFeedbackProps {
  pageName: string
}

export const PageFeedback: React.FC<PageFeedbackProps> = ({ pageName }) => {
  const [state, setState] = useState<FeedbackState>('idle')
  const [message, setMessage] = useState('')

  const handleHelpful = () => {
    setState('submitted')
    // Log feedback (could be connected to analytics in future)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`feedback_${pageName}_${Date.now()}`, 'helpful')
      } catch {
        // Silent fail for localStorage
      }
    }
  }

  const handleNotHelpful = () => {
    setState('not-helpful')
  }

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault()
    setState('submitted')
    if (typeof window !== 'undefined' && message.trim()) {
      try {
        localStorage.setItem(`feedback_${pageName}_${Date.now()}_message`, message)
      } catch {
        // Silent fail for localStorage
      }
    }
  }

  if (state === 'submitted') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-emerald-900">Bedankt voor je feedback!</p>
            <p className="text-xs text-emerald-700/80">We gebruiken dit om de content te verbeteren.</p>
          </div>
        </div>
      </div>
    )
  }

  if (state === 'not-helpful') {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5">
        <p className="text-sm font-semibold text-slate-900">Waardoor was dit niet nuttig?</p>
        <p className="text-xs text-slate-600">Je antwoord helpt ons de content te verbeteren.</p>
        <form onSubmit={handleSubmitMessage} className="mt-4 space-y-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Bijvoorbeeld: miste uitleg over..."
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-100"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Verstuur feedback
            </button>
            <button
              type="button"
              onClick={() => setState('idle')}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Annuleer
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Was deze pagina nuttig?</p>
          <p className="text-xs text-slate-500">Je feedback helpt ons de content te verbeteren.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleHelpful}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-800"
            aria-label="Ja, deze pagina was nuttig"
          >
            <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
            Ja, nuttig
          </button>
          <button
            onClick={handleNotHelpful}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-rose-300 hover:bg-rose-50/50 hover:text-rose-800"
            aria-label="Nee, deze pagina was niet nuttig"
          >
            <ThumbsDown className="h-3.5 w-3.5" aria-hidden="true" />
            Niet nuttig
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageFeedback
