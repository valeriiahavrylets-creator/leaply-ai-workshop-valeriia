import { create } from "zustand"

import type { Hypothesis, Segment, Verdict } from "@/lib/schemas/court"

export type CourtStep = 1 | 2 | 3 | 4 | 5

export type LoadingStage = null | "clarify" | "hypothesis" | "verdict"

type CourtState = {
  segment: Segment | null
  step: CourtStep

  rawIdea: string
  currentContent: string

  clarifyingQuestions: string[]
  clarifyingAnswers: string[]

  hypothesis: Hypothesis | null

  verdict: Verdict | null

  loading: LoadingStage
  error: string | null
}

type CourtActions = {
  setSegment: (segment: Segment) => void
  setStep: (step: CourtStep) => void

  setRawIdea: (value: string) => void
  setCurrentContent: (value: string) => void

  setClarifyingQuestions: (questions: string[]) => void
  setClarifyingAnswer: (index: number, value: string) => void

  setHypothesis: (hypothesis: Hypothesis) => void
  patchHypothesis: (patch: Partial<Hypothesis>) => void

  setVerdict: (verdict: Verdict) => void

  setLoading: (stage: LoadingStage) => void
  setError: (message: string | null) => void

  reset: () => void
}

const INITIAL: CourtState = {
  segment: null,
  step: 1,
  rawIdea: "",
  currentContent: "",
  clarifyingQuestions: [],
  clarifyingAnswers: ["", "", ""],
  hypothesis: null,
  verdict: null,
  loading: null,
  error: null,
}

export const useCourtStore = create<CourtState & CourtActions>()((set) => ({
  ...INITIAL,

  setSegment: (segment) => set({ segment }),
  setStep: (step) => set({ step }),

  setRawIdea: (rawIdea) => set({ rawIdea }),
  setCurrentContent: (currentContent) => set({ currentContent }),

  setClarifyingQuestions: (clarifyingQuestions) =>
    set({
      clarifyingQuestions,
      clarifyingAnswers: clarifyingQuestions.map(() => ""),
      step: 2,
    }),
  setClarifyingAnswer: (index, value) =>
    set((state) => {
      const next = [...state.clarifyingAnswers]
      next[index] = value
      return { clarifyingAnswers: next }
    }),

  setHypothesis: (hypothesis) => set({ hypothesis, step: 3 }),
  patchHypothesis: (patch) =>
    set((state) => ({
      hypothesis: state.hypothesis ? { ...state.hypothesis, ...patch } : null,
    })),

  setVerdict: (verdict) => set({ verdict, step: 5, loading: null }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  reset: () => set(INITIAL),
}))
