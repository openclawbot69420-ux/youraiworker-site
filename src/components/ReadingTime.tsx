import { Clock } from "lucide-react"

interface ReadingTimeProps {
  steps: string[]
  checklist: string[]
}

export const ReadingTime: React.FC<ReadingTimeProps> = ({ steps, checklist }) => {
  const wordCount = [...steps, ...checklist].join(" ").split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500" title="Geschatte leestijd">
      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{minutes} min leestijd</span>
    </span>
  )
}

export default ReadingTime
