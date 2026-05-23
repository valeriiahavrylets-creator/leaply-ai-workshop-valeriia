"use client"

import { useState } from "react"
import {
  RiArrowLeftLine,
  RiCheckLine,
  RiRefreshLine,
  RiSaveLine,
} from "@remixicon/react"
import Link from "next/link"

import { PRODUCT_CONTEXT } from "@/lib/product-context"
import { useSettingsStore } from "@/lib/stores/settings-store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function SettingsForm() {
  const productContext = useSettingsStore((s) => s.productContext)
  const setProductContext = useSettingsStore((s) => s.setProductContext)
  const resetProductContext = useSettingsStore((s) => s.resetProductContext)

  // Track the productContext we last synced from. When the store changes
  // (e.g., after localStorage hydration or reset), sync draft during render —
  // the React 19 idiomatic alternative to syncing in useEffect.
  const [draft, setDraft] = useState(productContext)
  const [syncedFrom, setSyncedFrom] = useState(productContext)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  if (syncedFrom !== productContext) {
    setSyncedFrom(productContext)
    setDraft(productContext)
  }

  const isDirty = draft !== productContext
  const isDefault = productContext === PRODUCT_CONTEXT

  function handleSave() {
    setProductContext(draft.trim())
    setSavedAt(Date.now())
    window.setTimeout(() => setSavedAt(null), 2000)
  }

  function handleReset() {
    resetProductContext()
    setDraft(PRODUCT_CONTEXT)
  }

  return (
    <main className="relative min-h-svh overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 0%, oklch(0.3 0.05 285), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 pt-10 pb-24 sm:px-6 sm:pt-14">
        <header className="mb-10 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            <RiArrowLeftLine className="size-3.5" />
            До головної
          </Link>
        </header>

        <div className="mb-10">
          <p className="text-[0.7rem] tracking-[0.4em] text-primary/70 uppercase">
            Налаштування
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Контекст продукту
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Цей текст AI використовує як фоновий контекст для всіх суддів. Чим
            точніше опишеш свій продукт, тим релевантніша критика. Можеш
            переключатись між продуктами, редагуючи це поле.
          </p>
        </div>

        <div className="space-y-4">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={24}
            className="min-h-[480px] resize-y border-border/40 bg-background/60 font-mono text-[0.8rem] leading-relaxed placeholder:text-muted-foreground/40 focus-visible:border-primary/50 focus-visible:ring-primary/20"
            placeholder="Опиши свій продукт — що це, для кого, ціна, головні USP, аудиторія, типовий формат гіпотез…"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground/60">
            <span>
              {draft.length} символів{" "}
              {isDefault ? "· дефолтний контекст BAE" : "· кастомний"}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
                disabled={isDefault && !isDirty}
                className="h-10 gap-2 border-border/40 px-4 text-sm"
              >
                <RiRefreshLine className="size-4" />
                Скинути до BAE
              </Button>
              <Button
                size="lg"
                onClick={handleSave}
                disabled={!isDirty}
                className="h-10 gap-2 bg-primary px-4 text-sm font-semibold tracking-wide text-primary-foreground hover:bg-primary/90"
              >
                {savedAt ? (
                  <>
                    <RiCheckLine className="size-4" />
                    Збережено
                  </>
                ) : (
                  <>
                    <RiSaveLine className="size-4" />
                    Зберегти
                  </>
                )}
              </Button>
            </div>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted-foreground/50">
            Контекст зберігається у браузері (localStorage). Перезавантаження
            сторінки і нові сесії його памʼятатимуть. Очищення кешу браузера
            скине до дефолту.
          </p>
        </div>
      </div>
    </main>
  )
}
