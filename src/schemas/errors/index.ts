import { z } from "zod/v4"

const errorStatus = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  500: "Internal Server Error"
} as const

type ErrorStatusCode = keyof typeof errorStatus

export const ErrorResponseSchema = z.null()

export const setErrorResponses = (...status: ErrorStatusCode[]) => {
  const responses: Record<number, z.ZodTypeAny> = {}
  status.forEach((code) => {
    responses[code] = ErrorResponseSchema.describe(errorStatus[code])
  })
  return responses
}
