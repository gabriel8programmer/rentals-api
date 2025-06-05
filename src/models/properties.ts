import prisma from "../database"
import { Property } from "@prisma/client"

interface IProperty {
    title: string
    description?: string
    price: number
    status?: "Available" | "Rented" | "Under_maintenance"
    size?: number
    bedrooms?: number
    bathrooms?: number
    parkingSpaces?: number
    propertyTypeId: string
    location?: {
        city?: string
        state?: string
        locality?: string
        country?: string
        street?: string
        addressNumber?: string
        latitude?: string
        longitude?: string
        location?: string
        postalCode?: string
    }
}

export class PropertiesModel { 
    find = async (): Promise<Property[]> => {
        return prisma.property.findMany({})
    }

    findById = async (id: string): Promise<Property | null> => {
        return prisma.property.findUnique({ where: { id }})
    }

    create = async (data: IProperty): Promise<Property> => {
        return prisma.property.create({ data })
    }

    update = async (id: string, data: Partial<IProperty>): Promise<Property | null> => {
        return prisma.property.update({where: { id }, data})
    }

    delete = async (id: string): Promise<Property | null> => {
        return prisma.property.delete({where: {id} })
    }
}