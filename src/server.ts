
import "dotenv/config"
import Fastify from "fastify";
import { envSchema } from "./types/env";

// routers
import propertiesRouter from "./routes/properties"
import propertyTypesRouter from "./routes/property-types"

const app = Fastify()

const port = envSchema.parse(process.env).PORT || 3000
const host = "0.0.0.0"

// register plugins

// register endpoints
app.register(propertiesRouter, {prefix: "/api"})
app.register(propertyTypesRouter, {prefix: "/api"})

app.listen({port, host})
.then(()=> console.log(`Server running on http://${host}:${port}`))
.catch((error) => {
    console.error(`Failed to start server ${error.message}`)
    process.exit(1)
})