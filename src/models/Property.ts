import { prisma } from "../config/prisma"
import { Property, PropertyImage } from "@prisma/client"
import { ICreateImageParams, ICreatePropertyParams, IPropertiesRepository } from "../repositories/PropertiesRepository"

export class PropertiesModel implements IPropertiesRepository { 
    find = async (): Promise<Property[]> => {
        return prisma.property.findMany({})
    }

    findById = async (id: string): Promise<Property | null> => {
        return prisma.property.findUnique({ where: { id }})
    }

    create = async (data: ICreatePropertyParams): Promise<Property> => {
        return prisma.property.create({ data })
    }

    updateById = async (id: string, data: Partial<ICreatePropertyParams>): Promise<Property | null> => {
        return prisma.property.update({where: { id }, data})
    }

    deleteById = async (id: string): Promise<void> => {
        await prisma.property.delete({where: {id} })
    }

    findImagesFromProperty = async (id: string): Promise<PropertyImage[]> => {
        return prisma.propertyImage.findMany({where: {propertyId: id} })
    }

    findImageByIdFromProperty = async (id: string, imageId: string): Promise<PropertyImage | null> => {
        return prisma.propertyImage.findUnique({where: { propertyId: id, id: imageId } })
    }

    addImageInProperty = async (id: string, data: ICreateImageParams): Promise<void> => {
        await prisma.propertyImage.create({ data: {propertyId: id, ...data} })
    }

    removeImageByIdFromProperty = async (id: string, imageId: string): Promise<void> => {
        await prisma.propertyImage.delete({where: { propertyId: id, id: imageId } })
    }
}