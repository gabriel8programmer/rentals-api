import { HttpError } from '../errors/HttpError'
import { PrismaPropertyTypesRepository } from '../repositories/prisma/PrismaPropertyTypesRepository'

export class PropertyTypeServices {
  constructor(private readonly propertyTypesRepository: PrismaPropertyTypesRepository) {}

  private async validatePropertyTypeById(id: string) {
    const propertyType = await this.propertyTypesRepository.findById(id)

    if (!propertyType) throw new HttpError(404, 'Property type not found!')

    return propertyType
  }

  async getAll() {
    return this.propertyTypesRepository.find()
  }

  async create(params: { name: string }) {
    return this.propertyTypesRepository.create(params)
  }

  async update(id: string, params: { name: string }) {
    // validate property type
    await this.validatePropertyTypeById(id)
    return this.propertyTypesRepository.updateById(id, params)
  }

  async delete(id: string) {
    // validate property type
    await this.validatePropertyTypeById(id)
    return this.propertyTypesRepository.deleteById(id)
  }
}
