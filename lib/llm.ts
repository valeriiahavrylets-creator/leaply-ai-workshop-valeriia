import { createGoogleGenerativeAI } from "@ai-sdk/google"

import { env } from "@/lib/env"

// Model used for all text/logic calls. Swap if your org adopts a newer model id.
const MODEL_ID = "gemini-2.5-flash"

// Allow generous output room — the full verdict object is large.
export const VERDICT_MAX_OUTPUT_TOKENS = 4096

// Collect every available key, primary first.
const API_KEYS: string[] = (() => {
  const fromPool =
    env.GOOGLE_GENERATIVE_AI_API_KEYS?.split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0) ?? []
  const all = [env.GOOGLE_GENERATIVE_AI_API_KEY, ...fromPool]
  return Array.from(new Set(all))
})()

function modelFor(apiKey: string) {
  return createGoogleGenerativeAI({ apiKey })(MODEL_ID)
}

export type GeminiModel = ReturnType<typeof modelFor>

/**
 * Run an AI call against each configured Gemini key in order, returning
 * the first success. If every key fails, throws the last error so the
 * caller can surface it.
 */
export async function withModelFallback<T>(
  call: (model: GeminiModel) => Promise<T>
): Promise<T> {
  if (API_KEYS.length === 0) {
    throw new Error("No Gemini API keys configured")
  }

  let lastError: unknown
  for (const key of API_KEYS) {
    try {
      return await call(modelFor(key))
    } catch (error) {
      const tail = key.slice(-6)
      const message = error instanceof Error ? error.message : String(error)
      console.warn(`[llm] key …${tail} failed: ${message}`)
      lastError = error
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("All Gemini keys failed")
}
