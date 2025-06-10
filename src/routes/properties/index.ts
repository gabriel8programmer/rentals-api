
import { FastifyInstance } from "fastify";
import { PropertiesController } from "../../controllers/PropertiesController";
import { PropertiesModel } from "../../models/Property";
import { PropertyServices } from "../../services/PropertyServices";

export async function propertiesRouter(app: FastifyInstance){
    // get instances
    const model = new PropertiesModel()
    const service = new PropertyServices(model)
    const controller = new PropertiesController(service)
    
    app.get("/properties", {schema: {tags: ["Properties"]} }, controller.index)
    app.get("/properties/:id", {schema: {tags: ["Properties"]} }, controller.show)
    app.post("/properties", {schema: {tags: ["Properties"]} }, controller.save)
    app.put("/properties/:id", {schema: {tags: ["Properties"]} }, controller.update)
    app.delete("/properties/:id", {schema: {tags: ["Properties"]} }, controller.delete)
    
    app.get("/properties/:id/images", {schema: {tags: ["Properties"]} }, controller.images)
    app.post("/properties/:id/images", {schema: {tags: ["Properties"]} }, controller.addImage)
    app.delete("/properties/:id/images/:imageId", {schema: {tags: ["Properties"]} }, controller.removeImage)
}