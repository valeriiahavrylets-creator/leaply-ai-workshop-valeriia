import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type StepCardProps = {
  step: number
  title: string
  subtitle?: string
  active?: boolean
  done?: boolean
  children: ReactNode
}

export function StepCard({
  step,
  title,
  subtitle,
  active = false,
  done = false,
  children,
}: StepCardProps) {
  return (
    <section
      className={cn(
        "relative rounded-2xl border p-7 transition-all duration-300 sm:p-8",
        active
          ? "border-primary/50 bg-card/70 shadow-[0_0_48px_-12px_oklch(0.78_0.13_82/0.35)]"
          : done
            ? "border-border/40 bg-card/40"
            : "border-border/20 bg-card/20 opacity-70"
      )}
    >
      <header className="mb-6 flex items-start gap-4">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full font-heading text-base font-bold tracking-tight ring-1",
            done
              ? "bg-primary text-primary-foreground ring-primary/40"
              : active
                ? "bg-primary/15 text-primary ring-primary/40"
                : "bg-muted/40 text-muted-foreground ring-border/30"
          )}
        >
          {done ? "✓" : step}
        </span>
        <div className="flex-1 pt-1">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </header>
      <div className="pl-0 sm:pl-14">{children}</div>
    </section>
  )
}
