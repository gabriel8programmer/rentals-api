import { SwaggerOptions } from '@fastify/swagger'
import { jsonSchemaTransform, jsonSchemaTransformObject } from 'fastify-type-provider-zod'

export const swaggerConfig: SwaggerOptions = {
  openapi: {
    info: {
      version: '1.0.0',
      title: 'Api de aluguel de imóveis',
      description: 'Api de aluguel de imóveis feita com nodejs, fastify e postgresql',
    },
    components: {
      securitySchemes: {
        refreshAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
  transformObject: jsonSchemaTransformObject,
}
