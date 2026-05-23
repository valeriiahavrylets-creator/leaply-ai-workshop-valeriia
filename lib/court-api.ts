import {
  ClarifyingQuestionsSchema,
  HypothesisSchema,
  VerdictSchema,
  type Hypothesis,
  type Segment,
  type Verdict,
} from "@/lib/schemas/court"
import { useSettingsStore } from "@/lib/stores/settings-store"

async function postJSON<T>(
  url: string,
  body: unknown,
  schema: { parse: (v: unknown) => T }
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    let detail = `HTTP ${res.status}`
    try {
      const data = (await res.json()) as { error?: string }
      if (data?.error) detail = data.error
    } catch {
      // ignore — fall back to status code message
    }
    throw new Error(detail)
  }

  const data = (await res.json()) as unknown
  return schema.parse(data)
}

function currentProductContext(): string {
  return useSettingsStore.getState().productContext
}

// Trim and only send if non-empty; lets the backend omit the field cleanly.
function optionalContent(raw: string): string | undefined {
  const trimmed = raw.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

export async function fetchClarifyingQuestions(
  segment: Segment,
  rawIdea: string,
  currentContent: string
): Promise<string[]> {
  const parsed = await postJSON(
    "/api/clarify",
    {
      segment,
      rawIdea,
      currentContent: optionalContent(currentContent),
      productContext: currentProductContext(),
    },
    ClarifyingQuestionsSchema
  )
  return parsed.questions
}

export async function fetchHypothesis(
  segment: Segment,
  rawIdea: string,
  questions: string[],
  answers: string[],
  currentContent: string
): Promise<Hypothesis> {
  return postJSON(
    "/api/hypothesis",
    {
      segment,
      rawIdea,
      questions,
      answers,
      currentContent: optionalContent(currentContent),
      productContext: currentProductContext(),
    },
    HypothesisSchema
  )
}

export async function fetchVerdict(
  segment: Segment,
  hypothesis: Hypothesis,
  currentContent: string
): Promise<Verdict> {
  return postJSON(
    "/api/verdict",
    {
      segment,
      hypothesis,
      currentContent: optionalContent(currentContent),
      productContext: currentProductContext(),
    },
    VerdictSchema
  )
}
