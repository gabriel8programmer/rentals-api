import { z } from "zod/v4";

export const UserRequestParamsSchema = z.object({
    id: z.string()
})

export const SaveUserBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    role: z.enum(["ADMIN", "AGENT", "CLIENT"]).optional(),
    emailVerified: z.boolean()
})

export const UpdateUserBodySchema = SaveUserBodySchema.partial()