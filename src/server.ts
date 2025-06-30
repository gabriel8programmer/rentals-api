import { app } from './app'
import { EnvSchema } from './schemas/env'

const port = EnvSchema.parse(process.env).PORT || 3000
const host = '0.0.0.0'

// create server
app
  .listen({ port, host })
  .then(() => console.log(`Http Server running!`))
  .catch(error => {
    console.error(`Failed to start server ${error.message}`)
    process.exit(1)
  })
