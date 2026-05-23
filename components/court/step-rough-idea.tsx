"use client"

import { RiLoader4Line, RiMailLine, RiQuillPenLine } from "@remixicon/react"

import { ROUGH_IDEA_PLACEHOLDERS } from "@/lib/court-data"
import { fetchClarifyingQuestions } from "@/lib/court-api"
import { useCourtStore } from "@/lib/stores/court-store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { ErrorBanner } from "./error-banner"
import { StepCard } from "./step-card"

export function StepRoughIdea() {
  const segment = useCourtStore((s) => s.segment)
  const step = useCourtStore((s) => s.step)
  const rawIdea = useCourtStore((s) => s.rawIdea)
  const currentContent = useCourtStore((s) => s.currentContent)
  const loading = useCourtStore((s) => s.loading)
  const error = useCourtStore((s) => s.error)
  const setRawIdea = useCourtStore((s) => s.setRawIdea)
  const setCurrentContent = useCourtStore((s) => s.setCurrentContent)
  const setClarifyingQuestions = useCourtStore((s) => s.setClarifyingQuestions)
  const setLoading = useCourtStore((s) => s.setLoading)
  const setError = useCourtStore((s) => s.setError)

  const isActive = step === 1
  const isDone = step > 1
  const isLoading = loading === "clarify"
  const showError = isActive && !!error && !isLoading
  const showCurrentContent = segment === "email"
  const placeholder = segment ? ROUGH_IDEA_PLACEHOLDERS[segment] : ""

  async function handleSubmit() {
    if (!segment || rawIdea.trim().length < 10) return
    setError(null)
    setLoading("clarify")
    try {
      const questions = await fetchClarifyingQuestions(
        segment,
        rawIdea.trim(),
        currentContent
      )
      setClarifyingQuestions(questions)
      setLoading(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Невідома помилка")
      setLoading(null)
    }
  }

  return (
    <StepCard
      step={1}
      title="Опиши сиру ідею"
      subtitle="Не парся за форматом — пиши як думаєш. Далі AI допоможе її структурувати."
      active={isActive}
      done={isDone}
    >
      {isDone ? (
        <div className="space-y-3">
          <div className="rounded-lg border border-border/30 bg-muted/20 p-4 text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
            {rawIdea}
          </div>
          {currentContent.trim().length > 0 ? (
            <div className="rounded-lg border border-border/20 bg-muted/10 p-4">
              <p className="mb-2 text-[0.65rem] tracking-[0.25em] text-primary/60 uppercase">
                Поточний контент
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/80">
                {currentContent}
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="space-y-4">
          <Textarea
            value={rawIdea}
            onChange={(e) => setRawIdea(e.target.value)}
            placeholder={placeholder}
            rows={5}
            disabled={isLoading}
            className="resize-none border-border/40 bg-background/60 text-base leading-relaxed placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
          />

          {showCurrentContent ? (
            <details className="group rounded-lg border border-border/30 bg-background/40">
              <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
                <RiMailLine className="size-4 text-primary/70" />
                <span>Додати поточний контент листа (опційно)</span>
                <span className="ml-auto text-xs text-muted-foreground/60 group-open:hidden">
                  розгорнути
                </span>
                <span className="ml-auto hidden text-xs text-muted-foreground/60 group-open:inline">
                  згорнути
                </span>
              </summary>
              <div className="space-y-2 border-t border-border/20 p-4">
                <p className="text-xs leading-relaxed text-muted-foreground/80">
                  Якщо в тебе вже є тема / CTA / тіло листа — постав сюди. Судді
                  покритикують з прив&apos;язкою до твого фактичного тексту.
                </p>
                <Textarea
                  value={currentContent}
                  onChange={(e) => setCurrentContent(e.target.value)}
                  placeholder={
                    "Subject: 'Try our app today'\n\nBody: ...\n\nCTA: 'Get my plan'"
                  }
                  rows={6}
                  disabled={isLoading}
                  className="resize-none border-border/40 bg-background/60 font-mono text-[0.8rem] leading-relaxed placeholder:text-muted-foreground/40 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                />
              </div>
            </details>
          ) : null}

          {showError ? <ErrorBanner message={error} /> : null}
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground/60">
              {rawIdea.trim().length}/10 мінімум символів
            </p>
            <Button
              onClick={handleSubmit}
              disabled={rawIdea.trim().length < 10 || isLoading}
              size="lg"
              className="h-11 gap-2 bg-primary px-5 text-sm font-semibold tracking-wide text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <RiLoader4Line className="size-4 animate-spin" />
                  AI читає…
                </>
              ) : (
                <>
                  <RiQuillPenLine className="size-4" />
                  Сформулювати гіпотезу
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </StepCard>
  )
}
