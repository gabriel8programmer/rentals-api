
import "dotenv/config"
import Fastify from "fastify";
import { envSchema } from "./types/env";

// routers
import propertiesRouter from "./routes/properties"
import propertyTypesRouter from "./routes/property-types"
import fastifyCors from "fastify-cors";

const app = Fastify()

const port = envSchema.parse(process.env).PORT || 3000
const host = "0.0.0.0"

// register plugins
app.register(fastifyCors)

// register endpoints
app.register(propertiesRouter)
app.register(propertyTypesRouter)

app.listen({port, host})
.then(()=> console.log(`Server running on http://${host}:${port}!`))
.catch((error) => {
    console.error(`Failed to start server ${error.message}`)
    process.exit(1)
})