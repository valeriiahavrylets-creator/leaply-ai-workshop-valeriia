"use client"

import { useEffect } from "react"

import { CourtHeader } from "@/components/court/segment-pill"
import { StepClarifying } from "@/components/court/step-clarifying"
import { StepHypothesis } from "@/components/court/step-hypothesis"
import { StepRoughIdea } from "@/components/court/step-rough-idea"
import { StepVerdict } from "@/components/court/step-verdict"
import { useCourtStore } from "@/lib/stores/court-store"
import type { Segment } from "@/lib/schemas/court"

export function CourtFlow({ segment }: { segment: Segment }) {
  const setSegment = useCourtStore((s) => s.setSegment)
  const reset = useCourtStore((s) => s.reset)

  useEffect(() => {
    // Fresh flow whenever segment changes — avoid stale state from a prior run.
    reset()
    setSegment(segment)
  }, [segment, setSegment, reset])

  return (
    <main className="relative min-h-svh overflow-hidden">
      <BackgroundLayers />

      <div className="relative mx-auto max-w-3xl px-5 pt-10 pb-32 sm:px-6 sm:pt-14">
        <CourtHeader segment={segment} />

        <div className="space-y-6">
          <StepRoughIdea />
          <StepClarifying />
          <StepHypothesis />
          <StepVerdict />
        </div>
      </div>
    </main>
  )
}

function BackgroundLayers() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 0%, oklch(0.3 0.05 285), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-24 left-1/2 h-64 w-[28rem] -translate-x-1/2 opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.78 0.13 82), transparent 70%)",
        }}
      />
    </>
  )
}
