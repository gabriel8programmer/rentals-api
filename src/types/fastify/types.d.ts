import {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export type FastifyTypedInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>

// types/fastify.d.ts
import 'fastify'
import { User } from '@prisma/client'

type RequestUser = Pick<User, 'id' | 'email' | 'role'>

declare module 'fastify' {
  interface FastifyRequest {
    user?: RequestUser
  }
}
