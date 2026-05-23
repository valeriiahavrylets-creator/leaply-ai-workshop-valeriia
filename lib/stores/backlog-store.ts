import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { BacklogEntry } from "@/lib/schemas/backlog"

type BacklogState = {
  entries: BacklogEntry[]
  hydrated: boolean
}

type BacklogActions = {
  add: (entry: BacklogEntry) => void
  remove: (id: string) => void
  clear: () => void
  _setHydrated: () => void
}

export const useBacklogStore = create<BacklogState & BacklogActions>()(
  persist(
    (set) => ({
      entries: [],
      hydrated: false,
      add: (entry) =>
        set((state) => ({
          // Newest first, dedupe by id.
          entries: [entry, ...state.entries.filter((e) => e.id !== entry.id)],
        })),
      remove: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        })),
      clear: () => set({ entries: [] }),
      _setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "leaply-court-backlog",
      partialize: (state) => ({ entries: state.entries }),
      onRehydrateStorage: () => (state) => {
        state?._setHydrated()
      },
    }
  )
)
