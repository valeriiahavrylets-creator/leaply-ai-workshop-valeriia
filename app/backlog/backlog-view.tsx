"use client"

import { useMemo, useState } from "react"
import { RiArrowLeftLine, RiInboxLine } from "@remixicon/react"
import Link from "next/link"

import { BacklogEntryCard } from "@/components/backlog/backlog-entry-card"
import { SEGMENT_LABELS } from "@/lib/court-data"
import type { Segment } from "@/lib/schemas/court"
import { useBacklogStore } from "@/lib/stores/backlog-store"
import { cn } from "@/lib/utils"

type SortKey = "ice" | "impact" | "newest"
type SegmentFilter = Segment | "all"

const SORTS: { id: SortKey; label: string }[] = [
  { id: "ice", label: "ICE score" },
  { id: "impact", label: "Impact" },
  { id: "newest", label: "Найновіші" },
]

const SEGMENT_FILTERS: { id: SegmentFilter; label: string }[] = [
  { id: "all", label: "Усі" },
  { id: "growth", label: SEGMENT_LABELS.growth },
  { id: "email", label: SEGMENT_LABELS.email },
  { id: "product", label: SEGMENT_LABELS.product },
]

export function BacklogView() {
  const entries = useBacklogStore((s) => s.entries)
  const hydrated = useBacklogStore((s) => s.hydrated)

  const [sort, setSort] = useState<SortKey>("ice")
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>("all")

  const visibleEntries = useMemo(() => {
    const filtered =
      segmentFilter === "all"
        ? entries
        : entries.filter((e) => e.segment === segmentFilter)

    const sorted = [...filtered].sort((a, b) => {
      if (sort === "ice") return b.ice.score - a.ice.score
      if (sort === "impact") return b.ice.impact - a.ice.impact
      return b.createdAt - a.createdAt
    })

    return sorted
  }, [entries, segmentFilter, sort])

  return (
    <main className="relative min-h-svh overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 0%, oklch(0.3 0.05 285), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 pt-10 pb-24 sm:px-6 sm:pt-14">
        <header className="mb-10 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            <RiArrowLeftLine className="size-3.5" />
            До головної
          </Link>
        </header>

        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.7rem] tracking-[0.4em] text-primary/70 uppercase">
              Беклог гіпотез
            </p>
            <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Пріоритезація
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Усі гіпотези, які пройшли суд. Сортуй за ICE (Impact × Confidence
              × Ease) — нагорі ті, які варто тестити першими.
            </p>
          </div>
          <p className="text-xs text-muted-foreground/60">
            {entries.length} {pluralize(entries.length)}
          </p>
        </div>

        {!hydrated ? (
          <SkeletonState />
        ) : entries.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <Toolbar
              sort={sort}
              setSort={setSort}
              segmentFilter={segmentFilter}
              setSegmentFilter={setSegmentFilter}
            />
            <div className="space-y-4">
              {visibleEntries.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  За цим фільтром нічого не знайшлось.
                </p>
              ) : (
                visibleEntries.map((entry) => (
                  <BacklogEntryCard key={entry.id} entry={entry} />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

function Toolbar({
  sort,
  setSort,
  segmentFilter,
  setSegmentFilter,
}: {
  sort: SortKey
  setSort: (k: SortKey) => void
  segmentFilter: SegmentFilter
  setSegmentFilter: (s: SegmentFilter) => void
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <ChipGroup
        label="Сегмент"
        items={SEGMENT_FILTERS}
        value={segmentFilter}
        onChange={setSegmentFilter}
      />
      <ChipGroup
        label="Сортування"
        items={SORTS}
        value={sort}
        onChange={setSort}
      />
    </div>
  )
}

function ChipGroup<T extends string>({
  label,
  items,
  value,
  onChange,
}: {
  label: string
  items: { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[0.65rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
        {label}
      </span>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs ring-1 transition-colors",
            value === item.id
              ? "bg-primary text-primary-foreground ring-primary"
              : "bg-card/40 text-muted-foreground ring-border/40 hover:text-foreground"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border/40 bg-card/20 p-12 text-center">
      <RiInboxLine className="mx-auto mb-3 size-10 text-muted-foreground/50" />
      <p className="font-medium text-foreground/80">Беклог поки порожній</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Прожени гіпотезу через суд, а потім натисни{" "}
        <span className="text-primary">«Зберегти у беклог»</span> на вердикті.
        Вона зʼявиться тут разом з ICE-скорингом.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold tracking-wide text-primary-foreground hover:bg-primary/90"
      >
        До головної
      </Link>
    </div>
  )
}

function SkeletonState() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-32 animate-pulse rounded-2xl border border-border/20 bg-card/20"
        />
      ))}
    </div>
  )
}

function pluralize(n: number): string {
  // Ukrainian-style plural for "гіпотеза"
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return "гіпотеза"
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return "гіпотези"
  return "гіпотез"
}
