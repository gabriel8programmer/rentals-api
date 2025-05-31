
import Fastify from "fastify";

const fastify = Fastify({logger: true})

const port = process.env.PORT || 3000
const host = "0.0.0.0" 