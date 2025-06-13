import { RouteShorthandOptions } from 'fastify'
import { setErrorResponses } from '../../schemas/errors'

const ShowUsersErrorResponses = setErrorResponses(400, 401, 500)
const ShowSingleUserErrorResponses = setErrorResponses(400, 401, 404, 500)
const SaveUserErrorResponses = setErrorResponses(400, 401, 500)
const UpdateUserErrorResponses = setErrorResponses(400, 401, 404, 500)
const DeleteUserErrorResponses = setErrorResponses(400, 401, 404, 500)

export const ShowUsersOptions: RouteShorthandOptions = {
  schema: {
    tags: ['Users'],
    description: 'List users',
    response: {
      ...ShowUsersErrorResponses,
    },
    security: [{ bearerAuth: [] }],
  },
}

export const ShowSingleUserOptions: RouteShorthandOptions = {
  schema: {
    tags: ['Users'],
    description: 'Get a single user',
    response: {
      ...ShowSingleUserErrorResponses,
    },
    security: [{ bearerAuth: [] }],
  },
}

export const SaveUserOptions: RouteShorthandOptions = {
  schema: {
    tags: ['Users'],
    description: 'Create a new user',
    response: {
      ...SaveUserErrorResponses,
    },
    security: [{ bearerAuth: [] }],
  },
}

export const UpdateUserOptions: RouteShorthandOptions = {
  schema: {
    tags: ['Users'],
    description: 'Update a user by id',
    response: {
      ...UpdateUserErrorResponses,
    },
    security: [{ bearerAuth: [] }],
  },
}

export const DeleteUserOptions: RouteShorthandOptions = {
  schema: {
    tags: ['Users'],
    description: 'Delete a user by id',
    response: {
      ...DeleteUserErrorResponses,
    },
    security: [{ bearerAuth: [] }],
  },
}
