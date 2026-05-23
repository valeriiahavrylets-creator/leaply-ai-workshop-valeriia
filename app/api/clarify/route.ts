import { generateObject } from "ai"
import { NextResponse } from "next/server"
import { z } from "zod"

import { withModelFallback } from "@/lib/llm"
import { clarifySystemPrompt, clarifyUserPrompt } from "@/lib/prompts/court"
import { PRODUCT_CONTEXT } from "@/lib/product-context"
import { ClarifyingQuestionsSchema, SegmentSchema } from "@/lib/schemas/court"

export const runtime = "nodejs"
export const maxDuration = 60

const RequestSchema = z.object({
  segment: SegmentSchema,
  rawIdea: z.string().min(10).max(4000),
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
        schema: ClarifyingQuestionsSchema,
        system: clarifySystemPrompt(productContext),
        prompt: clarifyUserPrompt(
          parsed.data.segment,
          parsed.data.rawIdea,
          parsed.data.currentContent
        ),
      })
    )
    return NextResponse.json(object)
  } catch (error) {
    console.error("[api/clarify] error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "AI request failed",
      },
      { status: 502 }
    )
  }
}
