import { create } from "zustand"
import { persist } from "zustand/middleware"

import { PRODUCT_CONTEXT } from "@/lib/product-context"

type SettingsState = {
  productContext: string
  setProductContext: (text: string) => void
  resetProductContext: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      productContext: PRODUCT_CONTEXT,
      setProductContext: (productContext) => set({ productContext }),
      resetProductContext: () => set({ productContext: PRODUCT_CONTEXT }),
    }),
    {
      name: "leaply-court-settings",
      // Only persist productContext — other slices can be added without re-hydration headaches.
      partialize: (state) => ({ productContext: state.productContext }),
    }
  )
)
