import 'dotenv/config'
import { z } from 'zod'

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']),
  API_URL: z.string().url().default('http://localhost/v1'),
  TELEGRAM_BOT_API_KEY: z.string(),
  APP_PORT: z.number({coerce: true}).default(3000),
  TELEGRAM_BOT_TOKEN: z.string(),
})

export type Env = z.infer<typeof EnvSchema>

const envObj = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  API_URL: process.env.API_URL ?? 'http://localhost/v1',
  TELEGRAM_BOT_API_KEY: process.env.TELEGRAM_BOT_API_KEY,
  APP_PORT: process.env.APP_PORT ?? '3000',
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
}

export const env = EnvSchema.parse(envObj)