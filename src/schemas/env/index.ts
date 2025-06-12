import { z } from 'zod'

export const EnvSchema = z
  .object({
    PORT: z.coerce.number(),
    JWT_SECRET_KEY: z.string(),
    DATABASE_URL: z.string(),
    REDIS_URL: z.string(),
    NODEMAILER_PORT: z.coerce.number(),
    NODEMAILER_HOST: z.string(),
    NODEMAILER_USER: z.string(),
    NODEMAILER_PASS: z.string(),
  })
  .partial()
