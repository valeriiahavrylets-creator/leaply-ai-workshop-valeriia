"use client"

import { useMemo, useState } from "react"
import { RiBookmarkFill, RiBookmarkLine, RiCheckLine } from "@remixicon/react"

import { deriveIce, type BacklogEntry } from "@/lib/schemas/backlog"
import type { Hypothesis, Segment, Verdict } from "@/lib/schemas/court"
import { useBacklogStore } from "@/lib/stores/backlog-store"
import { Button } from "@/components/ui/button"

type Props = {
  segment: Segment
  rawIdea: string
  currentContent: string
  hypothesis: Hypothesis
  verdict: Verdict
}

export function SaveToBacklogButton({
  segment,
  rawIdea,
  currentContent,
  hypothesis,
  verdict,
}: Props) {
  const entries = useBacklogStore((s) => s.entries)
  const add = useBacklogStore((s) => s.add)

  // Treat "same hypothesis+segment" as already saved — prevents duplicates on
  // accidental double-click but allows saving a re-judged version.
  const existingId = useMemo(() => {
    return entries.find(
      (e) =>
        e.segment === segment &&
        e.hypothesis.statement.trim() === hypothesis.statement.trim()
    )?.id
  }, [entries, segment, hypothesis.statement])

  const [justSaved, setJustSaved] = useState(false)

  function handleSave() {
    const entry: BacklogEntry = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      segment,
      rawIdea,
      currentContent:
        currentContent.trim().length > 0 ? currentContent : undefined,
      hypothesis,
      verdict,
      ice: deriveIce(verdict),
    }
    add(entry)
    setJustSaved(true)
    window.setTimeout(() => setJustSaved(false), 2000)
  }

  const saved = justSaved || !!existingId

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleSave}
      disabled={saved && !justSaved}
      className="h-11 gap-2 border-border/40 px-5 text-sm font-medium"
    >
      {saved ? (
        <>
          {justSaved ? (
            <RiCheckLine className="size-4 text-emerald-400" />
          ) : (
            <RiBookmarkFill className="size-4 text-primary" />
          )}
          {justSaved ? "Збережено у беклог" : "Вже у беклозі"}
        </>
      ) : (
        <>
          <RiBookmarkLine className="size-4" />
          Зберегти у беклог
        </>
      )}
    </Button>
  )
}
