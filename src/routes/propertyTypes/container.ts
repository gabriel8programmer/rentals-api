import { RouteShorthandOptions } from 'fastify'
import { z } from 'zod/v4'
import { setErrorResponses } from '../../schemas/errors'

const ShowPropertyTypesErrorResponses = setErrorResponses(400, 401, 500)
const SavePropertyTypesErrorResponses = setErrorResponses(400, 401, 500)
const UpdatePropertyTypesErrorResponses = setErrorResponses(400, 401, 404, 500)
const DeletePropertyTypesErrorResponses = setErrorResponses(400, 401, 404, 500)

export const ShowPropertyTypesOptions: RouteShorthandOptions = {
  schema: {
    description: 'List property types',
    tags: ['Property types'],
    response: {
      200: z
        .array(
          z.object({
            id: z.string(),
            name: z.string(),
          }),
        )
        .describe('OK'),
      ...ShowPropertyTypesErrorResponses,
    },
    security: [{ bearerAuth: [] }],
  },
}

export const SavePropertyTypeOptions: RouteShorthandOptions = {
  schema: {
    description: 'Create new property type',
    tags: ['Property types'],
    body: z.object({
      name: z.string(),
    }),
    response: {
      204: z.undefined().describe('No Content'),
      ...SavePropertyTypesErrorResponses,
    },
    security: [{ bearerAuth: [] }],
  },
}

export const UpdateNamePropertyTypeOptions: RouteShorthandOptions = {
  schema: {
    description: 'Update property type by id',
    tags: ['Property types'],
    body: z.object({
      name: z.string(),
    }),
    params: z.object({
      id: z.string().describe('Property type Id'),
    }),
    response: {
      204: z.undefined().describe('No Content'),
      ...UpdatePropertyTypesErrorResponses,
    },
    security: [{ bearerAuth: [] }],
  },
}

export const DeletePropertyTypeOptions: RouteShorthandOptions = {
  schema: {
    description: 'Delete property type by id',
    tags: ['Property types'],
    params: z.object({
      id: z.string().describe('Property type Id'),
    }),
    response: {
      204: z.undefined().describe('No Content'),
      ...DeletePropertyTypesErrorResponses,
    },
    security: [{ bearerAuth: [] }],
  },
}
