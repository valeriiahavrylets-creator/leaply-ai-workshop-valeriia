import type {
  Hypothesis,
  JudgeRole,
  Recommendation,
  Segment,
  Verdict,
} from "@/lib/schemas/court"

export const SEGMENT_LABELS: Record<Segment, string> = {
  growth: "Growth",
  email: "Email",
  product: "Product",
}

export const SEGMENT_TAGLINES: Record<Segment, string> = {
  growth: "Квіз · апсейли · сегментація",
  email: "Тема · CTA · контент",
  product: "Onboarding · фічі · retention",
}

export const ROUGH_IDEA_PLACEHOLDERS: Record<Segment, string> = {
  growth:
    "Наприклад: хочу замість поточного апсейл-екрана показувати екран із порівнянням планів і виділяти економію за рік...",
  email:
    "Наприклад: хочу протестувати subject line з emoji vs без, або замінити CTA у welcome-листі на більш персоналізований...",
  product:
    "Наприклад: хочу додати inline-tooltip на 3-му кроці onboarding, або переробити paywall-екран після квізу...",
}

export type JudgeMeta = {
  name: string
  motto: string
  focus: string
}

export const JUDGES: Record<JudgeRole, JudgeMeta> = {
  toxic_analyst: {
    name: "Токсичний Аналітик",
    motto: "Покажіть дані або йдіть геть",
    focus: "Статистика, baseline, sample size, методологія",
  },
  lazy_user: {
    name: "Лінивий Юзер",
    motto: "Я б цього не помітив",
    focus: "Когнітивне навантаження, прозорість UX, мобільний досвід",
  },
  roi_hunter: {
    name: "ROI Hunter",
    motto: "Скільки воно принесе на гривню витрат?",
    focus: "Очікуваний приріст ARPU, окупність, opportunity cost",
  },
  paranoid_legal: {
    name: "Параноїдальний Legal",
    motto: "Це судовий ризик чи просто погана ідея?",
    focus: "Compliance, edge-кейси, відповідальність, GDPR",
  },
}

export const JUDGE_ORDER: JudgeRole[] = [
  "toxic_analyst",
  "lazy_user",
  "roi_hunter",
  "paranoid_legal",
]

export const RECOMMENDATION_META: Record<
  Recommendation,
  { label: string; subline: string; tone: string }
> = {
  red: {
    label: "Не запускати",
    subline: "Гіпотеза має критичні слабкі місця",
    tone: "text-red-300 ring-red-400/40 bg-red-500/10",
  },
  yellow: {
    label: "Доопрацювати",
    subline: "Є потенціал, але потрібні зміни",
    tone: "text-amber-300 ring-amber-400/40 bg-amber-500/10",
  },
  green: {
    label: "Запускати",
    subline: "Гіпотеза готова до тесту",
    tone: "text-emerald-300 ring-emerald-400/40 bg-emerald-500/10",
  },
}

// Mock data used until AI is wired. Replace once API routes are live.

export const MOCK_QUESTIONS: Record<Segment, string[]> = {
  growth: [
    "Який інсайт / проблема стоїть за ідеєю? Що ти спостерігаєш у даних, поведінці юзерів, юзер-фідбеку?",
    "Яка цільова метрика і які другорядні (guardrails) треба не похитнути?",
    "Які концерни — у чому ти сама сумніваєшся? Що може піти не так?",
  ],
  email: [
    "Який інсайт стоїть за ідеєю? (поточний open rate / CTR, сегмент, попередні спостереження)",
    "Яка цільова метрика і які другорядні треба зберегти (deliverability, unsubscribe rate)?",
    "Які концерни — у чому ти сама сумніваєшся щодо цієї теми / CTA / формату?",
  ],
  product: [
    "Який інсайт від юзерів або з аналітики спонукав цю ідею?",
    "Яка primary-метрика покращується і що не зачепити (activation, retention, NPS)?",
    "Які концерни — технічні, UX або поведінкові ризики, у яких ти сама сумніваєшся?",
  ],
}

export const MOCK_HYPOTHESIS: Hypothesis = {
  problemInsight:
    "На поточному варіанті апсейл-екрана конверсія в платіж нижча за бенчмарк конкурентів — припускаємо, що ціна виглядає як «загальна сума», а не як щоденна / щомісячна цінність.",
  statement:
    "Якщо на апсейл-екрані одразу після завершення квізу зробити акцент на щомісячній економії (а не на загальній ціні), conversion to paid зросте на 10-15% серед користувачів зі score > 60, бо frame «економія» знижує сприйняття ціни як великого зобовʼязання.",
  primaryMetric: "Conversion to paid (per quiz completion)",
  guardrailMetrics: [
    "Quiz completion rate",
    "Refund rate (D7)",
    "Cancellation rate",
  ],
  concerns:
    "Не впевнена, що формат «щомісячна економія» не виглядатиме як ховання реальної ціни — це може зашкодити довірі і вирости refund-и. Також — чи вистачить трафіку, щоб упіймати ефект у статистично значущий термін.",
}

export const MOCK_VERDICT: Verdict = {
  judges: [
    {
      role: "toxic_analyst",
      critique:
        "Baseline не вказано. Без цифр поточної конверсії гіпотезу неможливо валідно перевірити — будь-який результат буде шумом. Sample size також не оцінений: на твоєму трафіку це 3 тижні мінімум, щоб досягти 95% довірчого інтервалу.",
    },
    {
      role: "lazy_user",
      critique:
        "Я зайшов і нічого не помітив. Якщо зміна не очевидна за 2 секунди, юзер просто проскролить. Зроби її помітнішою — або не варто й починати.",
    },
    {
      role: "roi_hunter",
      critique:
        "Гіпотетичний приріст 5–10% — це менше 0.3 грн ARPU на користувача. Окупиться лише на масштабі 50k+ юзерів. Є ідеї з вищим upside.",
    },
    {
      role: "paranoid_legal",
      critique:
        "Чи буде нова формула чітко комунікована до згоди користувача? Якщо ні — потенційний conflict з consumer protection. Окремо: переклад потребує юр. перевірки кожної локалі.",
    },
  ],
  scores: {
    clarity: 65,
    impact: 45,
    feasibility: 70,
    safety: 55,
  },
  confidenceScore: 59,
  recommendation: "yellow",
  summary:
    "Гіпотеза життєздатна, але без baseline і виміру impact'у запуск передчасний. Спочатку зафіксуй поточні цифри і оціни мінімальний детектабельний ефект.",
  alternatives: [
    {
      title: "Винесення апсейлу на крок раніше",
      statement:
        "Якщо показати апсейл після 3-го питання квізу (а не в кінці), conversion to paid зросте, бо юзер ще в потоці уваги.",
      whyBetter:
        "Той самий апсейл, але +30% потенціал по revenue без додаткової розробки — лише зміна позиції екрана.",
    },
    {
      title: "Сегментований апсейл за рівнем інтересу",
      statement:
        "Показуй апсейл лише користувачам із score > 70 у квізі — вони з вищою probability купляють.",
      whyBetter:
        "Меншому проценту юзерів — кращий offer. Очікуваний ARPU на показ виросте в 2–3 рази.",
    },
    {
      title: "A/B на пропозиції, не на форматі",
      statement:
        "Замість зміни формату — тестуй дві різні цінові пропозиції (дешевший базовий vs. преміум-бандл).",
      whyBetter:
        "Цінові тести дають у 3–5 разів більший лифт за UI-зміни, при тих самих ресурсах.",
    },
  ],
  spec: {
    variant:
      "Новий формат апсейл-екрана з акцентом на щомісячну економію (замість загальної ціни). Bold-цифра «$1.66/тиждень» + микро-копі «менше за каву».",
    estimatedDuration: "14 днів за поточного трафіку (~25k проходжень квізу)",
    risks: [
      "Низька статистична потужність на поточному трафіку — sample size під 95% CI може не зібратись за 14 днів",
      "Refund rate може зрости, якщо «економія» сприймається як ховання реальної ціни",
      "Negative carry-over на retention D30 для юзерів, які купили через price-anchoring (не цінність)",
    ],
  },
}
