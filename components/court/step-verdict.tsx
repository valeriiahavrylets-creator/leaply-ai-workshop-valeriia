"use client"

import { RiScales3Line } from "@remixicon/react"

import { JUDGE_ORDER } from "@/lib/court-data"
import { useCourtStore } from "@/lib/stores/court-store"

import { JudgeCard } from "./judge-card"
import { SaveToBacklogButton } from "./save-to-backlog-button"
import { StepCard } from "./step-card"
import { VerdictSummary } from "./verdict-summary"
import { AlternativesBlock, ExportButtons, SpecBlock } from "./verdict-extras"

export function StepVerdict() {
  const step = useCourtStore((s) => s.step)
  const loading = useCourtStore((s) => s.loading)
  const verdict = useCourtStore((s) => s.verdict)
  const hypothesis = useCourtStore((s) => s.hypothesis)
  const segment = useCourtStore((s) => s.segment)
  const rawIdea = useCourtStore((s) => s.rawIdea)
  const currentContent = useCourtStore((s) => s.currentContent)

  if (step < 4) return null

  if (loading === "verdict" || !verdict) {
    return (
      <StepCard step={4} title="Судді радяться…" active>
        <DeliberatingState />
      </StepCard>
    )
  }

  // Sort judges into the canonical order so layout stays stable
  const sortedJudges = JUDGE_ORDER.map((role) =>
    verdict.judges.find((j) => j.role === role)
  ).filter((j): j is NonNullable<typeof j> => j !== undefined)

  return (
    <StepCard
      step={4}
      title="Вердикт"
      subtitle="Чотири експерти розібрали твою гіпотезу. Нижче — підсумок, альтернативи і ТЗ."
      active
    >
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {sortedJudges.map((judge) => (
            <JudgeCard key={judge.role} judge={judge} />
          ))}
        </div>

        <VerdictSummary
          recommendation={verdict.recommendation}
          confidenceScore={verdict.confidenceScore}
          scores={verdict.scores}
          summary={verdict.summary}
        />

        <AlternativesBlock alternatives={verdict.alternatives} />

        <SpecBlock spec={verdict.spec} />

        {hypothesis && segment ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <SaveToBacklogButton
              segment={segment}
              rawIdea={rawIdea}
              currentContent={currentContent}
              hypothesis={hypothesis}
              verdict={verdict}
            />
            <ExportButtons hypothesis={hypothesis} verdict={verdict} />
          </div>
        ) : null}
      </div>
    </StepCard>
  )
}

function DeliberatingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <RiScales3Line className="size-12 animate-pulse text-primary" />
      <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
        Гіпотезу зачитано · Очікуйте вироку…
      </p>
      <div className="flex gap-1.5">
        <span className="size-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.3s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.15s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-primary/60" />
      </div>
    </div>
  )
}
