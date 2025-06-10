import { FastifyError, FastifyInstance } from "fastify";

export async function ErrorsHandlerPlugin(app: FastifyInstance){
    app.addHook("onError", async (request, reply, error: FastifyError)=> {
        return reply.status(error.statusCode as number).send({
            message: error.message,
            code: error.code
        })
    })
}