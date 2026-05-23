"use client"

import { RiHammerFill, RiLoader4Line } from "@remixicon/react"

import { fetchVerdict } from "@/lib/court-api"
import type { Hypothesis } from "@/lib/schemas/court"
import { useCourtStore } from "@/lib/stores/court-store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { ErrorBanner } from "./error-banner"
import { StepCard } from "./step-card"

export function StepHypothesis() {
  const segment = useCourtStore((s) => s.segment)
  const step = useCourtStore((s) => s.step)
  const hypothesis = useCourtStore((s) => s.hypothesis)
  const currentContent = useCourtStore((s) => s.currentContent)
  const loading = useCourtStore((s) => s.loading)
  const error = useCourtStore((s) => s.error)
  const patchHypothesis = useCourtStore((s) => s.patchHypothesis)
  const setStep = useCourtStore((s) => s.setStep)
  const setVerdict = useCourtStore((s) => s.setVerdict)
  const setLoading = useCourtStore((s) => s.setLoading)
  const setError = useCourtStore((s) => s.setError)

  if (step < 3 || !hypothesis) return null

  const isActive = step === 3
  const isDone = step > 3
  const isLoading = loading === "verdict"
  const showError = isActive && !!error && !isLoading

  async function handleSendToCourt() {
    if (!segment || !hypothesis || !isHypothesisReady(hypothesis)) return
    setError(null)
    setStep(4)
    setLoading("verdict")
    try {
      const verdict = await fetchVerdict(segment, hypothesis, currentContent)
      setVerdict(verdict)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Невідома помилка")
      setLoading(null)
      setStep(3)
    }
  }

  return (
    <StepCard
      step={3}
      title="Професійна гіпотеза"
      subtitle="AI переформулював твою ідею у тестовану гіпотезу. Перевір, відредагуй за потреби — і на суд."
      active={isActive}
      done={isDone}
    >
      <div className="space-y-5">
        <Field
          label="Проблема / інсайт"
          value={hypothesis.problemInsight}
          onChange={(v) => patchHypothesis({ problemInsight: v })}
          rows={3}
          readOnly={isDone}
        />
        <Field
          label="Гіпотеза"
          value={hypothesis.statement}
          onChange={(v) => patchHypothesis({ statement: v })}
          rows={4}
          readOnly={isDone}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Цільова метрика"
            value={hypothesis.primaryMetric}
            onChange={(v) => patchHypothesis({ primaryMetric: v })}
            rows={2}
            readOnly={isDone}
          />
          <ListField
            label="Другорядні метрики (guardrails)"
            value={hypothesis.guardrailMetrics}
            onChange={(items) => patchHypothesis({ guardrailMetrics: items })}
            readOnly={isDone}
          />
        </div>
        <Field
          label="Концерни"
          value={hypothesis.concerns}
          onChange={(v) => patchHypothesis({ concerns: v })}
          rows={3}
          readOnly={isDone}
          placeholder="У чому ти сама сумніваєшся? Що може піти не так?"
        />

        {!isDone ? (
          <>
            {showError ? <ErrorBanner message={error} /> : null}
            <div className="flex justify-end pt-2">
              <Button
                onClick={handleSendToCourt}
                disabled={!isHypothesisReady(hypothesis) || isLoading}
                size="lg"
                className="h-12 gap-2 bg-primary px-6 text-base font-semibold tracking-wide text-primary-foreground hover:bg-primary/90"
              >
                {isLoading ? (
                  <>
                    <RiLoader4Line className="size-4 animate-spin" />
                    Суд радиться…
                  </>
                ) : (
                  <>
                    <RiHammerFill className="size-4" />
                    На суд!
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

function isHypothesisReady(h: Hypothesis): boolean {
  return (
    h.problemInsight.trim().length > 0 &&
    h.statement.trim().length > 0 &&
    h.primaryMetric.trim().length > 0
  )
}

function Field({
  label,
  value,
  onChange,
  rows,
  readOnly,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  rows: number
  readOnly: boolean
  placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <FieldLabel>{label}</FieldLabel>
      {readOnly ? (
        <ReadOnlyValue value={value} />
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="resize-none border-border/40 bg-background/60 text-sm leading-relaxed placeholder:text-muted-foreground/50 focus-visible:border-primary/50 focus-visible:ring-primary/20"
        />
      )}
    </div>
  )
}

function ListField({
  label,
  value,
  onChange,
  readOnly,
}: {
  label: string
  value: string[]
  onChange: (value: string[]) => void
  readOnly: boolean
}) {
  if (readOnly) {
    return (
      <div className="space-y-1.5">
        <FieldLabel>{label}</FieldLabel>
        <div className="space-y-1 rounded-md border border-border/20 bg-muted/20 px-3 py-2 text-sm text-foreground/90">
          {value.length === 0
            ? "—"
            : value.map((item, i) => (
                <p key={i} className="leading-relaxed">
                  · {item}
                </p>
              ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      <FieldLabel>{label}</FieldLabel>
      <Textarea
        value={value.join("\n")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .map((s) => s.trim())
              .filter((s) => s.length > 0)
          )
        }
        rows={3}
        placeholder="По одному пункту на рядок"
        className="resize-none border-border/40 bg-background/60 text-sm leading-relaxed placeholder:text-muted-foreground/50 focus-visible:border-primary/50 focus-visible:ring-primary/20"
      />
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[0.65rem] tracking-[0.25em] text-primary/70 uppercase">
      {children}
    </label>
  )
}

function ReadOnlyValue({ value }: { value: string }) {
  return (
    <p className="rounded-md border border-border/20 bg-muted/20 px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
      {value || "—"}
    </p>
  )
}
