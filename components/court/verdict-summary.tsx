import { RECOMMENDATION_META } from "@/lib/court-data"
import type { Recommendation, Scores } from "@/lib/schemas/court"
import { cn } from "@/lib/utils"

type VerdictSummaryProps = {
  recommendation: Recommendation
  confidenceScore: number
  scores: Scores
  summary: string
}

const SCORE_LABELS: Record<keyof Scores, string> = {
  clarity: "Ясність",
  impact: "Impact",
  feasibility: "Здійсненність",
  safety: "Безпечність",
}

export function VerdictSummary({
  recommendation,
  confidenceScore,
  scores,
  summary,
}: VerdictSummaryProps) {
  const meta = RECOMMENDATION_META[recommendation]

  return (
    <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-card/80 to-card/40 p-6 backdrop-blur-sm sm:p-8">
      <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
        <ScoreRing score={confidenceScore} />

        <div className="space-y-5">
          <div>
            <p className="text-[0.65rem] tracking-[0.3em] text-primary/70 uppercase">
              Вердикт
            </p>
            <h3
              className={cn(
                "mt-1 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-heading text-base font-bold tracking-wide ring-1",
                meta.tone
              )}
            >
              <span className="size-2 rounded-full bg-current" />
              {meta.label}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{meta.subline}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.entries(scores) as [keyof Scores, number][]).map(
              ([key, value]) => (
                <ScoreBar key={key} label={SCORE_LABELS[key]} value={value} />
              )
            )}
          </div>

          <p className="border-t border-border/30 pt-4 text-sm leading-relaxed text-foreground/90 italic">
            «{summary}»
          </p>
        </div>
      </div>
    </div>
  )
}

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 42
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative mx-auto size-32 sm:size-36">
      <svg viewBox="0 0 100 100" className="-rotate-90">
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-border/40"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary drop-shadow-[0_0_8px_oklch(0.78_0.13_82/0.5)]"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-4xl font-black text-foreground sm:text-5xl">
          {score}
        </span>
        <span className="mt-1 text-[0.6rem] tracking-[0.25em] text-muted-foreground/70 uppercase">
          Confidence
        </span>
      </div>
    </div>
  )
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <span className="font-mono text-sm font-semibold text-foreground/90 tabular-nums">
          {value}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted/30">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
