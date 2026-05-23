import {
  RiBugLine,
  RiCoinLine,
  RiShieldLine,
  RiZzzLine,
  type RemixiconComponentType,
} from "@remixicon/react"

import { JUDGES } from "@/lib/court-data"
import type { JudgeCritique, JudgeRole } from "@/lib/schemas/court"

const JUDGE_ICONS: Record<JudgeRole, RemixiconComponentType> = {
  toxic_analyst: RiBugLine,
  lazy_user: RiZzzLine,
  roi_hunter: RiCoinLine,
  paranoid_legal: RiShieldLine,
}

export function JudgeCard({ judge }: { judge: JudgeCritique }) {
  const meta = JUDGES[judge.role]
  const Icon = JUDGE_ICONS[judge.role]

  return (
    <article className="relative rounded-xl border border-border/30 bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-primary/30 sm:p-6">
      <header className="mb-3 flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
          <Icon className="size-5 text-primary" />
        </span>
        <div className="flex-1">
          <h3 className="font-heading text-lg leading-tight font-bold text-foreground">
            {meta.name}
          </h3>
          <p className="mt-0.5 text-[0.7rem] tracking-[0.15em] text-primary/60 uppercase italic">
            «{meta.motto}»
          </p>
        </div>
      </header>
      <p className="text-sm leading-relaxed text-foreground/85">
        {judge.critique}
      </p>
    </article>
  )
}
