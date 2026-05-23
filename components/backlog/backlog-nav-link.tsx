"use client"

import { RiBookmarkLine } from "@remixicon/react"
import Link from "next/link"

import { useBacklogStore } from "@/lib/stores/backlog-store"
import { cn } from "@/lib/utils"

type Variant = "pill" | "icon"

export function BacklogNavLink({
  variant = "pill",
  className,
}: {
  variant?: Variant
  className?: string
}) {
  const count = useBacklogStore((s) => s.entries.length)
  const hydrated = useBacklogStore((s) => s.hydrated)

  if (variant === "icon") {
    return (
      <Link
        href="/backlog"
        aria-label="Беклог гіпотез"
        className={cn(
          "relative inline-flex size-8 items-center justify-center rounded-full border border-border/40 bg-card/60 text-primary/70 backdrop-blur-sm transition-colors hover:text-primary",
          className
        )}
      >
        <RiBookmarkLine className="size-4" />
        {hydrated && count > 0 ? (
          <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-mono text-[0.6rem] font-bold text-primary-foreground">
            {count}
          </span>
        ) : null}
      </Link>
    )
  }

  return (
    <Link
      href="/backlog"
      aria-label="Беклог гіпотез"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border/30 bg-card/40 px-3 py-1.5 text-xs tracking-widest text-primary/60 uppercase backdrop-blur-sm transition-colors hover:text-primary",
        className
      )}
    >
      <RiBookmarkLine className="size-3.5" />
      <span>Беклог</span>
      {hydrated && count > 0 ? (
        <span className="-mr-1 inline-flex min-w-4 items-center justify-center rounded-full bg-primary/15 px-1.5 font-mono text-[0.6rem] font-bold text-primary">
          {count}
        </span>
      ) : null}
    </Link>
  )
}
