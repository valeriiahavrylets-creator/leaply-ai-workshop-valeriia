"use client"

import { RiArrowRightLine, RiLoader4Line } from "@remixicon/react"

import { fetchHypothesis } from "@/lib/court-api"
import { useCourtStore } from "@/lib/stores/court-store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { ErrorBanner } from "./error-banner"
import { StepCard } from "./step-card"

export function StepClarifying() {
  const segment = useCourtStore((s) => s.segment)
  const step = useCourtStore((s) => s.step)
  const rawIdea = useCourtStore((s) => s.rawIdea)
  const currentContent = useCourtStore((s) => s.currentContent)
  const questions = useCourtStore((s) => s.clarifyingQuestions)
  const answers = useCourtStore((s) => s.clarifyingAnswers)
  const loading = useCourtStore((s) => s.loading)
  const error = useCourtStore((s) => s.error)
  const setClarifyingAnswer = useCourtStore((s) => s.setClarifyingAnswer)
  const setHypothesis = useCourtStore((s) => s.setHypothesis)
  const setLoading = useCourtStore((s) => s.setLoading)
  const setError = useCourtStore((s) => s.setError)

  if (step < 2) return null

  const isActive = step === 2
  const isDone = step > 2
  const isLoading = loading === "hypothesis"
  const showError = isActive && !!error && !isLoading

  const allFilled = answers.every((a) => a.trim().length > 0)

  async function handleSubmit() {
    if (!segment || !allFilled) return
    setError(null)
    setLoading("hypothesis")
    try {
      const hypothesis = await fetchHypothesis(
        segment,
        rawIdea,
        questions,
        answers.map((a) => a.trim()),
        currentContent
      )
      setHypothesis(hypothesis)
      setLoading(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Невідома помилка")
      setLoading(null)
    }
  }

  return (
    <StepCard
      step={2}
      title="Уточнення від суду"
      subtitle="AI хоче знати кілька деталей, щоб точно сформулювати твою гіпотезу."
      active={isActive}
      done={isDone}
    >
      <div className="space-y-5">
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <p className="flex gap-2 text-sm leading-snug font-medium text-primary/80">
              <span className="font-mono text-xs text-primary/50">
                Q{index + 1}.
              </span>
              <span className="flex-1">{question}</span>
            </p>
            {isDone ? (
              <p className="rounded-md border border-border/20 bg-muted/20 px-3 py-2 text-sm leading-relaxed text-foreground/90">
                {answers[index]}
              </p>
            ) : (
              <Textarea
                value={answers[index]}
                onChange={(e) => setClarifyingAnswer(index, e.target.value)}
                rows={2}
                disabled={isLoading}
                placeholder="Твоя відповідь…"
                className="resize-none border-border/40 bg-background/60 text-sm placeholder:text-muted-foreground/50 focus-visible:border-primary/50 focus-visible:ring-primary/20"
              />
            )}
          </div>
        ))}

        {!isDone ? (
          <>
            {showError ? <ErrorBanner message={error} /> : null}
            <div className="flex justify-end pt-2">
              <Button
                onClick={handleSubmit}
                disabled={!allFilled || isLoading}
                size="lg"
                className="h-11 gap-2 bg-primary px-5 text-sm font-semibold tracking-wide text-primary-foreground hover:bg-primary/90"
              >
                {isLoading ? (
                  <>
                    <RiLoader4Line className="size-4 animate-spin" />
                    AI формулює…
                  </>
                ) : (
                  <>
                    Згенерувати гіпотезу
                    <RiArrowRightLine className="size-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </StepCard>
  )
}
