// Static product context that gets injected into AI prompts.
// Edit here when product positioning / pricing / target market changes.
// The user can also override this at runtime via /settings (stored in localStorage).

export const PRODUCT_CONTEXT = `# Brain Activation Exercises (BAE) — Leaply

## What it is
- Day-by-day brain activation exercise plan for kids 3-10
- App with daily 7-min exercises that parent + child do together
- Target market: moms worldwide (primarily US, UK, AU, CA)
- Branded as "originating from Harvard University and Liberty University research"
- 250,000+ users to date

## Pricing model (CRITICAL — judges should know this exactly)
On the offer page user sees THREE plan options:
- **1-Month** — $19.99 first month, then $39.99/month recurring (auto-renews)
- **4-Week** — $19.99 (non-recurring per the funnel doc)
- **12-Week** — $34.99
Plus a $1 test charge to verify card. 30-day money-back guarantee.

On checkout modal, user sees bundled "modules added to ensure success" — all valued
at $19.99–$49.99 each but priced at $0 with the plan. These are NOT a separate
upsell, they are part of the value stack.

## Real funnel metrics
- **Quiz-to-purchase conversion: 1.6%** — this is the baseline. Any hypothesis must consider
  whether the change can move this needle.
- **Quiz completion rate: 1.6%** (same number per the doc — likely the same metric)
- **45 questions** total in the quiz across 13 steps
- **Monthly ad spend: ~$1M** on Meta (FB + Instagram). Video / static / carousel.
- This means: even a 0.1pp absolute improvement in CR = significant revenue. But also:
  the funnel is LONG (45 questions). Big drop-offs are baked in.

## Known funnel bottlenecks (the team's identified pain points)
1. **Quiz drop-off at question 5** — concentrated abandonment at Step 4 (Behavior Patterns)
2. **Results page → checkout** — users finish quiz but don't pay
3. (More to be filled in)

## Currently NO post-purchase upsell. Email sequence exists.

# Full funnel structure (THE KEY CONTEXT — use this to ground every critique)

The acquisition is a mobile web quiz funnel (~380px iOS-style) at tryleaply.com/en/kds.

### Step 0: Intro (gender selection)
- Headline: "Brain Activation Exercises for Kids"
- Subtitle: "A playful plan to develop a flexible mind for your child and rediscover the joy of parenting"
- Question: "Who are you raising?" — answers: Boy / Girl
- This is the highest-traffic screen. Drop-off here = "start quiz rate"

### Step 1: Age
- "How old is your child?" — 3-4 / 5-6 / 7-9 / 9+

### Step 2: Primary challenge
- "What feels hardest with your child right now?"
- Answers: Emotional meltdowns / Excessive screen time / Difficulty focusing / Impulsive behavior
- This answer drives downstream personalization via {primaryChallenge}

### Step 3: Info Block — Empathy
- "You're not alone"
- Personalized: "Many parents face {primaryChallenge} at {age} years old..."

### Step 4: Behavior Patterns (Agree/Disagree) — 12 statements
This is where **drop-off at Q5** happens (the team's known bottleneck).
Statements include "I've become the 'yelling parent'", "loses focus after a few minutes",
"interrupts conversations", "struggles with waiting their turn", "tantrums when screen time ends",
"intense anger during meltdowns", "makes me question if I'm doing enough".

### Step 5: Info Block — Brain Flexibility framing
- "The missing piece isn't your effort"
- Reframes meltdowns as brain-development issue, not parenting failure.

### Step 6: Hidden Signals (Frequency questions) — 9 items
"How often does your child..." fidget / chew / compulsive habits / closed posture /
avoid eye contact / resist touch / use stomachache excuses / fight sleep / meltdowns.

### Step 7: Info Block — Potential
- "These patterns are common in gifted children"
- Reframes difficulty as future leadership potential.

### Step 8: Parenting Experience — 6 questions
What you've tried / how you deal with big emotions / how challenging this is / satisfaction /
what's holding you back / worry about teenage years.

### Step 9: Info Block — Why behavior tools fail
- "Why nothing has worked so far..."
- Sets up Brain Agility concept.

### Step 10: Science Concept
- "Have you ever heard of Brain Agility?"
- Quick science moment defining Brain Agility.

### Step 11: Final Commitment
- "The windows of opportunity"
- CTA: "Unlock my child potential"
- Two final questions: main goal + time investment (5/10/15/20+ min/day)

### Step 12: Name & Email capture
- "What is your child's name?"
- "Enter your email to get your personal Brain Activation Exercises"

### Loader screen (between email and result)
- Headline: "Creating Brain Activation Exercises for Your Child"
- 4 progress phases shown sequentially:
  1. "Analyzing your answers" — 24%
  2. "Assessing Brain Agility"
  3. "Selecting personalized brain exercises"
  4. "Creating your personal plan"
- Social proof badge: "250,000+ people have trusted Leaply"
- Reviews carousel with 5-star testimonials (e.g., S. Bowdens: "I didn't expect results so fast. Fewer meltdowns, less arguing...")
- Purpose: build trust + frame personalization as deep work, not lookup.

### Step 13: Summary Report
- Headline: "Your Child's Summary Report"
- Brain agility scale: **RIGID — DEVELOPING — FLEXIBLE** (most users land at DEVELOPING)
- Yellow alert box: "Brain agility: Developing. This explains {primaryChallenge}..."
- Details: Main challenge / Thinking type ("Potential leader") / Best approach (Brain Activation Exercises)
- Photo of an upset child

### Goal-date chart page
- Headline: "The last plan you'll ever need"
- "Based on your answers, we expect your child to develop a flexible mind by... [date 4 weeks out]"
- Growth chart Week 1 (red "Now") → Week 4 (green "Goal")
- CTA: Continue

### Step 14: Offer / Paywall page
- Side-by-side BEFORE/AFTER photos: "Now" (crying child) vs "Goal" (calm smiling child)
- 3 metric bars: Brain agility (Developing → Flexible), Emotional regulation (Reactive → Adaptive), Focus Capacity (Scattered → Sharpened)
- Heading: "Your child's Brain Activation Exercises is ready!"
- Top-left: **10-minute discount timer** with "50% discount reserved for"
- Plans: 1-Month / 4-Week / 12-Week
- "GET MY PLAN" sticky button (top-right + bottom)
- 30-day money-back guarantee
- Highlights of plan (5 bullets about personal exercises, brain-body connection, science-based, routine optimization, no equipment)
- University proof (Harvard + Liberty)
- Reviews section
- FAQ section

### Checkout modal ("Your personal plan")
- Reused 10-minute discount timer
- Plan badge (e.g., "Brain Activation Exercises · 4-Week Plan Full Access")
- "Based on your profile, we've added these modules to your plan to ensure success:"
  - Instant Self-Regulation Toolkit ($19.99 → $0)
  - Focus Capacity Booster ($19.99 → $0)
  - Screen Dependency Exit Strategy ($49.99 → $0)
  - Energy Level Stabilizer ($29.99 → $0)
  - Cognitive Impulse Control ($39.99 → $0)
  - Balance Mastery ($39.99 → $0)
- "Continue" → Stripe checkout
- Renewal terms at bottom: "First subscription 1 month for $19.99, then $39.99/1 month (incl. taxes). Cancel in Membership info or by emailing support@theleaply.com."

# Common terminology in the team
- "Воронка / funnel" = the full quiz → paywall journey
- "Старт квіз" = the intro screen (gender selection)
- "Лоадер" = the 4-phase loading screen between email entry and summary
- "Апсейл" = often used interchangeably for the offer/paywall page (Step 14)
- "Апка на воронці" = previews of the app embedded as screenshots/videos in the funnel
- "Персона" = the human face/character used in funnel imagery (currently main female "Yana" in some flows)
- "Score" / "Brain agility" = the personalized output (RIGID / DEVELOPING / FLEXIBLE)
- "Перебивки" = info-block / interstitial screens between groups of questions (Steps 3, 5, 7, 9, 10)
- "CR" / "Conversion rate" = quiz-to-purchase (currently 1.6%)
- "ARPU" = average revenue per user
- "AOV" = average order value
- "ROAS" = return on ad spend
- "Кенсела" = subscription cancellations (post-purchase)
- "Рефаунди" = refund requests within 30-day return window
- "Когорти" = traffic segments (geo, device, child age, ad creative source)

# Common hypothesis format the team uses
- **Проблема / інсайт** — observation or data point that sparked the idea
- **Гіпотеза** — if/then/because statement
- **Що тестуємо (варіанти)** — concrete variants (screenshots, video, copy)
- **Цільова метрика** — primary metric (CR, ARPU, retention)
- **Другорядні метрики** — guardrails (start quiz rate, refund rate, cancellation rate, AOV)
- **Консьорни** — author's own doubts
- **To discuss** — open questions, often parallel tests / cohort overlap concerns

# Customer signal (use when judging if a hypothesis matches real user behavior)
- 70+ reviews, ~90% positive
- Top themes: fun/play, parent-child connection, calm, quick/easy
- Risk themes: 3yo kids get frustrated, novelty wears off, login UX issues
- Audience: impatient moms with crying kids on mobile. Anything adding friction or
  perceived wait time is high-risk. The product itself relies on parent commitment —
  if intro promise is over-sold, refund rate goes up.

# Ad acquisition angles in use
Pattern Interrupt ("Stop doing X..."), Revealing ("5 signs..."), Success Story ("My daughter is 7..."),
Urgent Appeal ("Start this today..."), Kids View ("Mom please stop calling me..."),
Dev. Window (critical brain period), Asian Approach ("Why Asian kids can..."),
FOMO, Stoic Kid (resilience as a skill), Parenting Approach (Gentle Parenting / Montessori comparison),
Story Base Movie (emotional desperate-mom narrative).

# Operational constraints (CRITICAL for ROI Hunter and recommendations)
- Solo operator workflow: one person owns research, design, copy, analytics.
  ONLY implementation goes to a developer. NEVER recommend "find a designer",
  "hire a copywriter", "engage an analyst" — those ARE the user.
- Mobile-first by default (~380px width).
- Quiz funnel is the highest-leverage surface — most Growth experiments live here,
  NOT on landing pages.
- At 1.6% CR and $1M/mo spend, statistical power for sub-0.2pp absolute lift
  reaches significance in ~7-10 days. For sub-0.05pp lifts, more like 3+ weeks.
- 45 questions is LONG for a quiz funnel; trimming questions is a recurring tension
  (more questions = better personalization signal & higher commitment bias, but more drop-off).

# OPEN QUESTIONS — context the AI does NOT have yet

When critiquing a hypothesis, if your judgement depends on any of the data below,
DO NOT invent numbers. Either:
  (a) explicitly flag that this data is needed for a confident verdict, or
  (b) state your assumption clearly ("assuming refund rate is in the 3-7% industry range...").

The user can fill any of these in via /settings — once provided, treat them as ground truth.

## Funnel step-level conversion (currently unknown, only overall 1.6% known)
- Intro → Q1 (gender + first age question) — ___%
- Q1 → Q5 (the known Behavior Patterns drop-off) — ___%
- Q5 → Q12 (end of quiz, email capture) — ___%
- Email capture → loader → summary report — ___%
- Summary → goal-date page → offer page — ___%
- Offer page → checkout modal — ___%
- Checkout modal → completed purchase (Stripe) — ___%
- The 1.6% overall is the multiplication of all above. Without per-step rates we cannot
  attribute lift to a specific surface accurately.

## Plan distribution (which plan converts users into?)
- 1-Month ($19.99 → $39.99 recurring): ___% of purchases
- 4-Week ($19.99): ___% of purchases
- 12-Week ($34.99): ___% of purchases
This matters for ARPU and LTV math.

## Per-user economics (unknown — affects every ROI Hunter argument)
- ARPU (average revenue per purchasing user): $___
- LTV (lifetime value across renewals): $___
- AOV (avg order value at checkout incl. modules): $___
- CPA / CAC: $___
- ROAS: ___x
- Refund rate within 30-day window: ___%
- Monthly churn / cancellation rate for 1-Month plan: ___%

## Past A/B test history (CRITICAL — without this AI may suggest already-failed tests)
- What's been tested in the funnel in the last 6 months? Results?
- What "moved the needle" historically?
- What "did not move the needle" historically?
- Were any persona / "apka na voronci" / start-quiz tests run? Outcomes?
- Were any pricing / plan-positioning tests run? Outcomes?

## Email sequence (exists, but details unknown)
- How many emails post-quiz? Pre-purchase vs post-purchase?
- What's the email→purchase conversion contribution?
- Sequence triggers (cart abandonment, post-purchase, re-engagement)?

## Device & geo breakdown
- % mobile vs desktop traffic? (assumed mobile-first, but not confirmed)
- Top 5 countries by share of purchases?
- Conversion rate by country (US vs UK vs AU vs CA — same? very different?)

## Ad creative performance (by angle)
- Which of the 10+ messaging angles (Pattern Interrupt, Success Story, Asian Approach...)
  has highest CTR? Highest purchase CR? Highest ROAS?
- Which has worst CPA?

## Persona usage rules
- Where does "Yana" appear in the funnel exactly? In which screens?
- Is there a brand consistency rule between ad creatives, funnel, and the app product?

## Tech / implementation constraints
- Quiz framework — proprietary / Funnel-builder / custom React? (affects test velocity)
- A/B test framework — Statsig / GrowthBook / proprietary?
- How long does it typically take to ship a test from approved hypothesis to live traffic?

## Seasonality / current trends
- Are there current campaigns running that would confound test results?
- Holiday / school-year seasonality?
- Recent meaningful events (e.g., big creative refresh, new offer)?

When judges critique a hypothesis, they should NAME these gaps where relevant.
Toxic Analyst especially: if baseline / sample math depends on missing data, demand it
before greenlighting. ROI Hunter: do not invent ARPU or LTV — flag the unknown and
either give conditional analysis ("if ARPU is ~$25, then...") or refuse to score impact.`
