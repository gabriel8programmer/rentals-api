import { PropertyType } from '@prisma/client'
import { IPropertyTypesRepository } from '../PropertyTypesRepository'
import { prisma } from '../../config/prisma'

export class PrismaPropertyTypesRepository implements IPropertyTypesRepository {
  find = async (): Promise<PropertyType[]> => {
    return prisma.propertyType.findMany()
  }

  findById = async (id: string): Promise<PropertyType | null> => {
    return prisma.propertyType.findUnique({ where: { id } })
  }

  create = (params: { name: string }): Promise<PropertyType> => {
    return prisma.propertyType.create({ data: params })
  }

  updateById = (id: string, params: { name: string }): Promise<PropertyType | null> => {
    return prisma.propertyType.update({ where: { id }, data: params })
  }

  deleteById = (id: string): Promise<PropertyType | null> => {
    return prisma.propertyType.delete({ where: { id } })
  }
}
