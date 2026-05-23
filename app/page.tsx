import Link from "next/link"
import {
  RiCompassLine,
  RiFilter2Line,
  RiMailSendLine,
  RiScales3Line,
  RiSettings4Line,
  type RemixiconComponentType,
} from "@remixicon/react"

import { BacklogNavLink } from "@/components/backlog/backlog-nav-link"
import { Card } from "@/components/ui/card"

type Segment = {
  id: "growth" | "email" | "product"
  label: string
  tagline: string
  description: string
  Icon: RemixiconComponentType
}

const SEGMENTS: Segment[] = [
  {
    id: "growth",
    label: "Growth",
    tagline: "Квіз · апсейли · сегментація",
    description:
      "Тестуєш апсейл, локалізацію, сегментацію аудиторії або новий вхід у квіз?",
    Icon: RiFilter2Line,
  },
  {
    id: "email",
    label: "Email",
    tagline: "Тема · CTA · контент",
    description:
      "Перевіряєш тему листа, заклик до дії або новий формат розсилки?",
    Icon: RiMailSendLine,
  },
  {
    id: "product",
    label: "Product",
    tagline: "Onboarding · фічі · retention",
    description:
      "Запускаєш нову фічу, переробляєш onboarding або тестуєш retention?",
    Icon: RiCompassLine,
  },
]

export default function HomePage() {
  return (
    <main className="relative min-h-svh overflow-hidden">
      <SpotlightBackground />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <SettingsLink />
        <Hero />
        <AboutBrief />
        <Divider label="Оберіть свою справу" />
        <SegmentGrid />
        <Footer />
      </div>
    </main>
  )
}

function AboutBrief() {
  return (
    <details className="group mx-auto mt-12 max-w-2xl">
      <summary className="mx-auto flex w-fit cursor-pointer items-center gap-2 rounded-full border border-border/30 bg-card/30 px-4 py-1.5 text-xs tracking-[0.25em] text-muted-foreground uppercase backdrop-blur-sm transition-colors hover:text-primary">
        <span>Як це працює</span>
        <span className="text-primary/70 transition-transform group-open:rotate-90">
          →
        </span>
      </summary>
      <div className="mt-6 rounded-2xl border border-border/30 bg-card/30 p-6 backdrop-blur-sm sm:p-7">
        <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
          Інструмент для краш-тесту гіпотез у Growth, Email і Product командах.
          Кидаєш сиру ідею — AI перетворює її на тестовану гіпотезу і прожарює
          чотирма експертами до того, як ти витратиш дні дизайнера і dev.
        </p>

        <ol className="mt-5 space-y-2 text-sm leading-relaxed text-foreground/85">
          {STEPS.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 inline-block w-5 shrink-0 text-right font-heading font-bold text-primary/70 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-5 grid gap-2 border-t border-border/30 pt-4 sm:grid-cols-3">
          {EXTRAS.map((extra) => (
            <div key={extra.title}>
              <p className="text-[0.6rem] tracking-[0.2em] text-primary/70 uppercase">
                {extra.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {extra.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </details>
  )
}

const STEPS: string[] = [
  "Опиши ідею своїми словами (можна додати поточний контент і скріншоти)",
  "AI ставить 3 уточнюючих питання — інсайт, метрики, концерни",
  "AI генерує тестовану гіпотезу у форматі «Якщо…, то…, тому що…»",
  "4 експерти-судді розбирають: Токсичний Аналітик, Лінивий Юзер, ROI Hunter, Параноїдальний Legal",
  "На виході: скоринг, рекомендація 🔴🟡🟢, альтернативи з вищим impact, ТЗ для розробника",
]

const EXTRAS: { title: string; body: string }[] = [
  {
    title: "Беклог + ICE",
    body: "Зберігай гіпотези, сортуй за Impact × Confidence × Ease.",
  },
  {
    title: "Контекст продукту",
    body: "Налаштовуй під свій продукт — AI критикує з прив’язкою до твоєї воронки.",
  },
  {
    title: "Експорт",
    body: "Markdown або .md файл — копіюй у Notion / GitHub / куди завгодно.",
  },
]

function SettingsLink() {
  return (
    <div className="absolute top-6 right-6 flex items-center gap-2 sm:top-8 sm:right-8">
      <BacklogNavLink />
      <Link
        href="/settings"
        aria-label="Налаштування контексту продукту"
        className="inline-flex items-center gap-1.5 rounded-full border border-border/30 bg-card/40 px-3 py-1.5 text-xs tracking-widest text-primary/60 uppercase backdrop-blur-sm transition-colors hover:text-primary"
      >
        <RiSettings4Line className="size-3.5" />
        Контекст продукту
      </Link>
    </div>
  )
}

function SpotlightBackground() {
  return (
    <>
      {/* Theatrical spotlight from top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(0.32 0.05 285), transparent 70%)",
        }}
      />
      {/* Gold vignette glow behind hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.78 0.13 82), transparent 70%)",
        }}
      />
    </>
  )
}

function Hero() {
  return (
    <header className="relative text-center">
      <div className="mb-7 flex items-center justify-center gap-4">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
        <RiScales3Line className="size-12 text-primary drop-shadow-[0_0_24px_oklch(0.78_0.13_82/0.35)]" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
      </div>

      <h1 className="font-heading text-5xl leading-[0.95] font-black tracking-tight text-foreground sm:text-7xl">
        Hypothesis
        <br />
        <span className="text-primary italic">Court</span>
      </h1>

      <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        Чотири експерти розіб&apos;ють твою гіпотезу швидше за ринок.
      </p>

      <p className="mt-3 text-xs tracking-wider text-muted-foreground/70 uppercase">
        Токсичний Аналітик · Лінивий Юзер · ROI Hunter · Параноїдальний Legal
      </p>
    </header>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="my-16 flex items-center gap-5 sm:my-20">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-primary/60" />
      <span className="font-heading text-xs tracking-[0.35em] text-primary/80 uppercase">
        {label}
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/40 to-primary/60" />
    </div>
  )
}

function SegmentGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {SEGMENTS.map((segment) => (
        <SegmentCard key={segment.id} segment={segment} />
      ))}
    </div>
  )
}

function SegmentCard({ segment }: { segment: Segment }) {
  const { id, label, tagline, description, Icon } = segment
  return (
    <Link
      href={{ pathname: "/court", query: { segment: id } }}
      className="group block"
    >
      <Card className="relative h-full border border-border/40 bg-card/50 p-7 ring-0 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:bg-card/80 hover:shadow-[0_0_32px_-8px_oklch(0.78_0.13_82/0.4)]">
        {/* Corner ornaments — gilt-frame feel */}
        <CornerOrnament className="absolute top-2 left-2" />
        <CornerOrnament className="absolute top-2 right-2 rotate-90" />
        <CornerOrnament className="absolute bottom-2 left-2 -rotate-90" />
        <CornerOrnament className="absolute right-2 bottom-2 rotate-180" />

        <div className="flex h-full flex-col gap-5">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20 transition-all group-hover:bg-primary/15 group-hover:ring-primary/40">
            <Icon className="size-6 text-primary" />
          </div>

          <div>
            <h3 className="font-heading text-2xl font-bold tracking-wide text-foreground">
              {label}
            </h3>
            <p className="mt-1 text-xs tracking-[0.2em] text-primary/70 uppercase">
              {tagline}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-border/30 pt-4 text-sm font-medium text-primary/80 group-hover:text-primary">
            <span>Подати позов</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
    >
      <path
        d="M1 14V4a3 3 0 0 1 3-3h10"
        stroke="currentColor"
        strokeWidth="1"
        className="text-primary/50"
      />
    </svg>
  )
}

function Footer() {
  return (
    <p className="mt-20 text-center font-mono text-[0.65rem] tracking-[0.4em] text-muted-foreground/40 uppercase sm:mt-28">
      Veritas in disputatione nascitur
    </p>
  )
}
