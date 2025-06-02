import { z } from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().optional(),
    DB_NAME: z.string().optional(),
    DB_USER: z.string().optional(),
    DB_PASS: z.string().optional(),
    DB_HOST: z.string().optional()
})