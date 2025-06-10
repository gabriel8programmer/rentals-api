import { SwaggerOptions } from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const swaggerConfig: SwaggerOptions = {
    openapi: {
        info: {
            version: "1.0.0",
            title: "Api de aluguel de imóveis",
        },
    },
    transform: jsonSchemaTransform
}