import Link from "next/link"
import { RiArrowLeftLine, RiSettings4Line } from "@remixicon/react"

import { BacklogNavLink } from "@/components/backlog/backlog-nav-link"
import { SEGMENT_LABELS, SEGMENT_TAGLINES } from "@/lib/court-data"
import type { Segment } from "@/lib/schemas/court"

export function CourtHeader({ segment }: { segment: Segment }) {
  return (
    <header className="mb-12 flex items-center justify-between gap-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
      >
        <RiArrowLeftLine className="size-3.5" />
        До головної
      </Link>

      <div className="flex items-center gap-2 rounded-full border border-border/40 bg-card/60 px-3 py-1.5 backdrop-blur-sm">
        <span className="text-[0.65rem] tracking-[0.3em] text-primary/80 uppercase">
          Справа
        </span>
        <span className="h-3 w-px bg-border/50" />
        <span className="font-heading text-sm font-semibold text-foreground">
          {SEGMENT_LABELS[segment]}
        </span>
        <span className="hidden text-xs text-muted-foreground sm:inline">
          · {SEGMENT_TAGLINES[segment]}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <BacklogNavLink variant="icon" />
        <Link
          href="/settings"
          aria-label="Налаштування контексту продукту"
          className="inline-flex size-8 items-center justify-center rounded-full border border-border/40 bg-card/60 text-primary/70 backdrop-blur-sm transition-colors hover:text-primary"
        >
          <RiSettings4Line className="size-4" />
        </Link>
      </div>
    </header>
  )
}
