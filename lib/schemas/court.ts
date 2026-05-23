import { z } from "zod"

export const SegmentSchema = z.enum(["growth", "email", "product"])
export type Segment = z.infer<typeof SegmentSchema>

export const JudgeRoleSchema = z.enum([
  "toxic_analyst",
  "lazy_user",
  "roi_hunter",
  "paranoid_legal",
])
export type JudgeRole = z.infer<typeof JudgeRoleSchema>

export const RecommendationSchema = z.enum(["red", "yellow", "green"])
export type Recommendation = z.infer<typeof RecommendationSchema>

export const ClarifyingQuestionsSchema = z.object({
  questions: z.array(z.string().min(1)).length(3),
})
export type ClarifyingQuestions = z.infer<typeof ClarifyingQuestionsSchema>

export const HypothesisSchema = z.object({
  problemInsight: z.string().min(1),
  statement: z.string().min(1),
  primaryMetric: z.string().min(1),
  guardrailMetrics: z.array(z.string()).min(0).max(6),
  concerns: z.string(),
})
export type Hypothesis = z.infer<typeof HypothesisSchema>

export const JudgeCritiqueSchema = z.object({
  role: JudgeRoleSchema,
  critique: z.string().min(1),
})
export type JudgeCritique = z.infer<typeof JudgeCritiqueSchema>

export const ScoresSchema = z.object({
  clarity: z.number().int().min(0).max(100),
  impact: z.number().int().min(0).max(100),
  feasibility: z.number().int().min(0).max(100),
  safety: z.number().int().min(0).max(100),
})
export type Scores = z.infer<typeof ScoresSchema>

export const AlternativeSchema = z.object({
  title: z.string().min(1),
  statement: z.string().min(1),
  whyBetter: z.string().min(1),
})
export type Alternative = z.infer<typeof AlternativeSchema>

export const SpecSchema = z.object({
  variant: z.string().min(1),
  estimatedDuration: z.string().min(1),
  risks: z.array(z.string()).min(1).max(5),
})
export type Spec = z.infer<typeof SpecSchema>

export const VerdictSchema = z.object({
  judges: z.array(JudgeCritiqueSchema).length(4),
  scores: ScoresSchema,
  confidenceScore: z.number().int().min(0).max(100),
  recommendation: RecommendationSchema,
  summary: z.string().min(1),
  alternatives: z.array(AlternativeSchema).min(2).max(3),
  spec: SpecSchema,
})
export type Verdict = z.infer<typeof VerdictSchema>
