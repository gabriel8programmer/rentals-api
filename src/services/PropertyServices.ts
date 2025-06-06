import { HttpError } from "../errors/HttpError";
import { PropertiesModel } from "../models/Property";
import { ICreateImageParams, ICreatePropertyParams } from "../repositories/PropertiesRepository";

export class PropertyServices {

    constructor(private readonly propertiesModel: PropertiesModel){}

    private validatePropertyId = async (id: string)=> {
        const property = await this.propertiesModel.findById(id)
        
        if (!property) throw new HttpError(404, "Property not found!")

        return
    }

    private validateImageId = async (id: string, imageId: string)=> {
        const image = await this.propertiesModel.findImageByIdFromProperty(id, imageId)

        if (!image) throw new HttpError(404, "Image not found!")

        return
    }

    getAllProperties = async () => {
        const properties = await this.propertiesModel.find()
        return properties
    }

    getPropertyById = async (id: string)=> {
        const property = await this.propertiesModel.findById(id)

        // validate property id
        await this.validatePropertyId(id)

        return property
    }

    createProperty = async (params: ICreatePropertyParams)=> {
        const property = await this.propertiesModel.create(params)
        return property
    }

    udpatePropertyById = async (id: string, params: Partial<ICreatePropertyParams>)=> {
        // validate property id
        await this.validatePropertyId(id)

        const property = await this.propertiesModel.updateById(id, params)
        return property
    }

    deletePropertyById = async (id: string)=> {
        // validate property id
        await this.validatePropertyId(id)

        await this.propertiesModel.deleteById(id)        
    }

    getImagesFromProperty = async (id: string)=> {
        // validate property id
        await this.validatePropertyId(id)

        const images = await this.propertiesModel.findImagesFromProperty(id)
        return images
    }

    addImageFromProperty = async (id: string, params: ICreateImageParams)=> {
        // validate property id
        await this.validatePropertyId(id)

        await this.propertiesModel.addImageInProperty(id, params)
    }

    removeImageByIdFromProperty = async (id: string, imageId: string)=> {
        // validate property id
        await this.validatePropertyId(id)

        // validate property id and imageId
        await this.validateImageId(id, imageId)

        await this.propertiesModel.removeImageByIdFromProperty(id, imageId)
    }
}