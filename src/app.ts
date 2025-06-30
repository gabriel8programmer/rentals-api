import 'dotenv/config'
import { fastify } from 'fastify'

// zod
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'

// error handler
import { ErrorsHandlerPlugin } from './plugins/errors'

// cors
import { fastifyCors } from '@fastify/cors'

// swagger
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { swaggerConfig } from './config/swagger'

// routes
import { routes } from './routes'

// initial config
const app = fastify().withTypeProvider<ZodTypeProvider>()

// register error handler plugin
app.register(ErrorsHandlerPlugin)

// Add schema validator and serializer
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

//config cors
app.register(fastifyCors, { origin: '*' })

// config swagger
app.register(fastifySwagger, swaggerConfig)
app.register(fastifySwaggerUi, { routePrefix: '/docs' })

// register endpoints
app.register(routes, { prefix: '/api' })

export { app }
