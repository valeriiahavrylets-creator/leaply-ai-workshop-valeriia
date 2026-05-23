import { z } from "zod"

// Parse and validate environment variables once at startup.
// Add a field here whenever you reference a new process.env.X in code.
// Required vars use .min(1) / .url() etc; optional vars use .optional().
const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Google AI Studio API key for Gemini. Server-only.
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),

  // Optional comma-separated pool of additional keys used as fallbacks
  // when the primary fails (rate limit, revoked, etc).
  GOOGLE_GENERATIVE_AI_API_KEYS: z.string().optional(),
})

export const env = EnvSchema.parse(process.env)
export type Env = z.infer<typeof EnvSchema>
