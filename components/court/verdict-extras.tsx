"use client"

import { useState } from "react"
import {
  RiCheckLine,
  RiDownloadLine,
  RiFileCopy2Line,
  RiLightbulbFlashLine,
  RiToolsLine,
} from "@remixicon/react"

import { JUDGES, RECOMMENDATION_META } from "@/lib/court-data"
import type {
  Alternative,
  Hypothesis,
  Spec,
  Verdict,
} from "@/lib/schemas/court"
import { Button } from "@/components/ui/button"

export function AlternativesBlock({
  alternatives,
}: {
  alternatives: Alternative[]
}) {
  return (
    <div className="rounded-2xl border border-border/30 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
      <header className="mb-5 flex items-center gap-3">
        <RiLightbulbFlashLine className="size-6 text-primary" />
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            Альтернативи
          </h3>
          <p className="text-sm text-muted-foreground">
            Гіпотези з вищим очікуваним impact на дохід.
          </p>
        </div>
      </header>

      <div className="space-y-4">
        {alternatives.map((alt, i) => (
          <article
            key={i}
            className="rounded-xl border border-border/30 bg-background/40 p-4 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 font-heading font-bold text-primary/60 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 space-y-2">
                <h4 className="font-heading text-base leading-snug font-bold text-foreground">
                  {alt.title}
                </h4>
                <p className="text-sm leading-relaxed text-foreground/85">
                  {alt.statement}
                </p>
                <p className="border-l-2 border-primary/40 pl-3 text-xs leading-relaxed text-muted-foreground">
                  <span className="tracking-wide text-primary/80 uppercase">
                    Чому краща:
                  </span>{" "}
                  {alt.whyBetter}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export function SpecBlock({ spec }: { spec: Spec }) {
  return (
    <div className="rounded-2xl border border-border/30 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
      <header className="mb-5 flex items-center gap-3">
        <RiToolsLine className="size-6 text-primary" />
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            ТЗ для розробника
          </h3>
          <p className="text-sm text-muted-foreground">
            Що саме реалізувати і за який час.
          </p>
        </div>
      </header>

      <div className="space-y-3">
        <div className="rounded-lg bg-background/40 p-3">
          <p className="text-[0.6rem] tracking-[0.2em] text-primary/70 uppercase">
            Варіант
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/90">
            {spec.variant}
          </p>
        </div>
        <div className="rounded-lg bg-background/40 p-3">
          <p className="text-[0.6rem] tracking-[0.2em] text-primary/70 uppercase">
            Тривалість
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/90">
            {spec.estimatedDuration}
          </p>
        </div>
      </div>

      <ChipList
        title="Ризики, які підсвітив суд"
        items={spec.risks}
        tone="warn"
        className="mt-5"
      />
    </div>
  )
}

function ChipList({
  title,
  items,
  tone = "neutral",
  className,
}: {
  title: string
  items: string[]
  tone?: "neutral" | "warn"
  className?: string
}) {
  if (items.length === 0) return null
  const chipTone =
    tone === "warn"
      ? "bg-amber-500/10 text-amber-200 ring-amber-400/30"
      : "bg-primary/10 text-primary/90 ring-primary/30"

  return (
    <div className={className}>
      <p className="mb-2 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
        {title}
      </p>
      <ul className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li
            key={i}
            className={`rounded-full px-3 py-1 text-xs ring-1 ${chipTone}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ExportButtons({
  hypothesis,
  verdict,
}: {
  hypothesis: Hypothesis
  verdict: Verdict
}) {
  const [copied, setCopied] = useState(false)

  const markdown = buildMarkdown(hypothesis, verdict)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard may be unavailable in some contexts; fall through silently.
    }
  }

  function handleDownload() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `hypothesis-verdict-${Date.now()}.md`
    document.body.append(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
      <Button
        variant="outline"
        size="lg"
        onClick={handleCopy}
        className="h-11 gap-2 border-border/40 px-5 text-sm font-medium"
      >
        {copied ? (
          <>
            <RiCheckLine className="size-4 text-emerald-400" />
            Скопійовано
          </>
        ) : (
          <>
            <RiFileCopy2Line className="size-4" />
            Копіювати як markdown
          </>
        )}
      </Button>
      <Button
        size="lg"
        onClick={handleDownload}
        className="h-11 gap-2 bg-primary px-5 text-sm font-semibold tracking-wide text-primary-foreground hover:bg-primary/90"
      >
        <RiDownloadLine className="size-4" />
        Завантажити .md
      </Button>
    </div>
  )
}

function buildMarkdown(hypothesis: Hypothesis, verdict: Verdict): string {
  const recMeta = RECOMMENDATION_META[verdict.recommendation]
  const lines: string[] = []

  lines.push(`# Вердикт суду`, ``)

  lines.push(`## Гіпотеза`, ``)
  lines.push(`### Проблема / інсайт`, ``, hypothesis.problemInsight, ``)
  lines.push(`### Формулювання`, ``, hypothesis.statement, ``)
  lines.push(`- **Цільова метрика:** ${hypothesis.primaryMetric}`)
  lines.push(
    `- **Другорядні (guardrails):** ${hypothesis.guardrailMetrics.join(", ") || "—"}`,
    ``
  )
  if (hypothesis.concerns.trim().length > 0) {
    lines.push(`### Концерни автора`, ``, hypothesis.concerns, ``)
  }

  lines.push(
    `## Рекомендація: ${recMeta.label.toUpperCase()} (${verdict.confidenceScore}/100)`,
    ``,
    verdict.summary,
    ``,
    `### Скоринг`,
    `- Ясність: ${verdict.scores.clarity}/100`,
    `- Impact: ${verdict.scores.impact}/100`,
    `- Здійсненність: ${verdict.scores.feasibility}/100`,
    `- Безпечність: ${verdict.scores.safety}/100`,
    ``
  )

  lines.push(`## Судді`, ``)
  for (const j of verdict.judges) {
    const meta = JUDGES[j.role]
    lines.push(`### ${meta.name}`, `_«${meta.motto}»_`, ``, j.critique, ``)
  }

  lines.push(`## Альтернативи`, ``)
  for (const [i, alt] of verdict.alternatives.entries()) {
    lines.push(
      `### ${i + 1}. ${alt.title}`,
      ``,
      alt.statement,
      ``,
      `**Чому краща:** ${alt.whyBetter}`,
      ``
    )
  }

  lines.push(
    `## ТЗ для розробника`,
    ``,
    `- **Варіант:** ${verdict.spec.variant}`,
    `- **Тривалість:** ${verdict.spec.estimatedDuration}`,
    `- **Ризики:**${verdict.spec.risks.map((r) => `\n  - ${r}`).join("")}`,
    ``
  )

  return lines.join("\n")
}
