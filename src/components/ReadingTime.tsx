import { Clock, Type } from "lucide-react"

interface ReadingTimeProps {
  steps: string[]
  checklist: string[]
  showWordCount?: boolean
}

export const ReadingTime: React.FC<ReadingTimeProps> = ({ steps, checklist, showWordCount = true }) => {
  const wordCount = [...steps, ...checklist].join(" ").split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / 200))
  return (
    <span className="inline-flex items-center gap-3 text-xs text-slate-500" title={`Geschatte leestijd: ${minutes} minuten (${wordCount} woorden)`}>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{minutes} min</span>
      </span>
      {showWordCount && (
        <>
          <span className="text-slate-300" aria-hidden="true">|</span>
          <span className="inline-flex items-center gap-1.5" title={`${wordCount} woorden`}>
            <Type className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{wordCount.toLocaleString("nl-NL")} woorden</span>
          </span>
        </>
      )}
    </span>
  )
}

export default ReadingTime
