import { z } from "zod/v4";

export const DefaultErrorResponseSchema = z.object({
    statusCode: z.coerce.number(),
    error: z.string(),
    message: z.string()
})
