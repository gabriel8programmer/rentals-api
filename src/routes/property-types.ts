import { FastifyInstance } from "fastify";
import { PropertyTypesController } from "../controllers/propertyTypesController";

export default async function router(app: FastifyInstance){
    const controller = new PropertyTypesController()

    app.get("/property-types", controller.index)
    app.post("/property-types", controller.save)
    app.patch("/property-types/:id", controller.update)
    app.delete("/property-types/:id", controller.delete)   
}