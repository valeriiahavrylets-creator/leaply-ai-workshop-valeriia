import { generateObject } from "ai"
import { NextResponse } from "next/server"
import { z } from "zod"

import { VERDICT_MAX_OUTPUT_TOKENS, withModelFallback } from "@/lib/llm"
import { verdictSystemPrompt, verdictUserPrompt } from "@/lib/prompts/court"
import { PRODUCT_CONTEXT } from "@/lib/product-context"
import {
  HypothesisSchema,
  SegmentSchema,
  VerdictSchema,
} from "@/lib/schemas/court"

export const runtime = "nodejs"
export const maxDuration = 120

const RequestSchema = z.object({
  segment: SegmentSchema,
  hypothesis: HypothesisSchema,
  currentContent: z.string().max(8000).optional(),
  productContext: z.string().min(1).max(20_000).optional(),
})

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = RequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const productContext = parsed.data.productContext ?? PRODUCT_CONTEXT

  try {
    const { object } = await withModelFallback((model) =>
      generateObject({
        model,
        schema: VerdictSchema,
        system: verdictSystemPrompt(productContext),
        prompt: verdictUserPrompt(
          parsed.data.segment,
          parsed.data.hypothesis,
          parsed.data.currentContent
        ),
        maxOutputTokens: VERDICT_MAX_OUTPUT_TOKENS,
      })
    )
    return NextResponse.json(object)
  } catch (error) {
    console.error("[api/verdict] error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "AI request failed",
      },
      { status: 502 }
    )
  }
}
