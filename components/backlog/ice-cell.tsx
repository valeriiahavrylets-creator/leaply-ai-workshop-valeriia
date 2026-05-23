import type { Ice } from "@/lib/schemas/backlog"
import { cn } from "@/lib/utils"

export function IceCell({
  ice,
  compact = false,
}: {
  ice: Ice
  compact?: boolean
}) {
  return (
    <div
      className={cn("grid grid-cols-4 gap-3", compact ? "text-xs" : "text-sm")}
    >
      <IceStat label="Impact" value={ice.impact} />
      <IceStat label="Confidence" value={ice.confidence} />
      <IceStat label="Ease" value={ice.ease} />
      <IceStat label="ICE" value={ice.score} highlight />
    </div>
  )
}

function IceStat({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: number
  highlight?: boolean
}) {
  return (
    <div>
      <p
        className={cn(
          "text-[0.6rem] tracking-[0.2em] uppercase",
          highlight ? "text-primary/80" : "text-muted-foreground/70"
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-mono font-semibold tabular-nums",
          highlight ? "text-xl text-primary" : "text-foreground/90"
        )}
      >
        {value}
      </p>
    </div>
  )
}
