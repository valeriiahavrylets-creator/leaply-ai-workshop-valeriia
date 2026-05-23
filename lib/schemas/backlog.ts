import { z } from "zod"

import {
  HypothesisSchema,
  SegmentSchema,
  VerdictSchema,
} from "@/lib/schemas/court"

// ICE breakdown (each 0-100), with the multiplicative score normalised back to 0-100.
// score = impact * confidence * ease / 10000.
// Mapping from verdict.scores:
//   impact     ← verdict.scores.impact
//   confidence ← verdict.confidenceScore
//   ease       ← verdict.scores.feasibility
export const IceSchema = z.object({
  impact: z.number().int().min(0).max(100),
  confidence: z.number().int().min(0).max(100),
  ease: z.number().int().min(0).max(100),
  score: z.number().int().min(0).max(100),
})
export type Ice = z.infer<typeof IceSchema>

export const BacklogEntrySchema = z.object({
  id: z.string().min(1),
  createdAt: z.number().int().nonnegative(),
  segment: SegmentSchema,
  rawIdea: z.string(),
  currentContent: z.string().optional(),
  hypothesis: HypothesisSchema,
  verdict: VerdictSchema,
  ice: IceSchema,
})
export type BacklogEntry = z.infer<typeof BacklogEntrySchema>

// Helper: derive ICE block from a verdict.
export function deriveIce(verdict: z.infer<typeof VerdictSchema>): Ice {
  const impact = verdict.scores.impact
  const confidence = verdict.confidenceScore
  const ease = verdict.scores.feasibility
  const score = Math.round((impact * confidence * ease) / 10_000)
  return { impact, confidence, ease, score }
}
