"use client"

import { useState } from "react"
import { RiDeleteBinLine, RiExpandUpDownLine } from "@remixicon/react"

import { RECOMMENDATION_META, SEGMENT_LABELS } from "@/lib/court-data"
import { JUDGES } from "@/lib/court-data"
import type { BacklogEntry } from "@/lib/schemas/backlog"
import { useBacklogStore } from "@/lib/stores/backlog-store"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { IceCell } from "./ice-cell"

export function BacklogEntryCard({ entry }: { entry: BacklogEntry }) {
  const remove = useBacklogStore((s) => s.remove)
  const [open, setOpen] = useState(false)

  const recommendationMeta = RECOMMENDATION_META[entry.verdict.recommendation]
  const segmentLabel = SEGMENT_LABELS[entry.segment]

  function handleDelete() {
    if (window.confirm("Видалити гіпотезу з беклогу?")) {
      remove(entry.id)
    }
  }

  const dateLabel = new Date(entry.createdAt).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <article className="rounded-2xl border border-border/30 bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-primary/30 sm:p-6">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wider text-primary uppercase">
            {segmentLabel}
          </span>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wider uppercase ring-1",
              recommendationMeta.tone
            )}
          >
            {recommendationMeta.label}
          </span>
          <span className="text-[0.65rem] tracking-widest text-muted-foreground/60 uppercase">
            {dateLabel}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleDelete}
          aria-label="Видалити з беклогу"
          className="text-muted-foreground hover:text-destructive"
        >
          <RiDeleteBinLine className="size-4" />
        </Button>
      </header>

      <h3 className="mb-3 text-base leading-snug font-medium text-foreground/95">
        {entry.hypothesis.statement}
      </h3>

      <div className="mb-4 rounded-lg bg-background/40 p-3">
        <IceCell ice={entry.ice} />
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs tracking-wide text-muted-foreground uppercase transition-colors hover:text-primary"
      >
        <RiExpandUpDownLine className="size-3.5" />
        {open ? "Згорнути деталі" : "Розгорнути деталі"}
      </button>

      {open ? (
        <div className="mt-4 space-y-4 border-t border-border/30 pt-4">
          <DetailRow
            label="Проблема / інсайт"
            text={entry.hypothesis.problemInsight}
          />
          <DetailRow label="Метрика" text={entry.hypothesis.primaryMetric} />
          {entry.hypothesis.guardrailMetrics.length > 0 ? (
            <DetailRow
              label="Guardrails"
              text={entry.hypothesis.guardrailMetrics.join(", ")}
            />
          ) : null}
          {entry.hypothesis.concerns.trim().length > 0 ? (
            <DetailRow
              label="Концерни автора"
              text={entry.hypothesis.concerns}
            />
          ) : null}

          <div className="border-t border-border/30 pt-4">
            <p className="mb-2 text-[0.6rem] tracking-[0.25em] text-primary/70 uppercase">
              Підсумок суду
            </p>
            <p className="text-sm leading-relaxed text-foreground/85 italic">
              «{entry.verdict.summary}»
            </p>
          </div>

          <details className="rounded-md border border-border/20 bg-background/30 p-3 text-sm">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
              Критика суддів
            </summary>
            <div className="mt-3 space-y-3">
              {entry.verdict.judges.map((j) => {
                const meta = JUDGES[j.role]
                return (
                  <div key={j.role}>
                    <p className="font-heading text-sm font-semibold text-primary/80">
                      {meta.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                      {j.critique}
                    </p>
                  </div>
                )
              })}
            </div>
          </details>
        </div>
      ) : null}
    </article>
  )
}

function DetailRow({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="mb-1 text-[0.6rem] tracking-[0.2em] text-primary/70 uppercase">
        {label}
      </p>
      <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/85">
        {text}
      </p>
    </div>
  )
}
