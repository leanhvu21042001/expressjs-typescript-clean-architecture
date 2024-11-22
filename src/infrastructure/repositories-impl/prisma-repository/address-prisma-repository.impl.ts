import { PrismaClient } from '@prisma/client'

import { AddressEntity } from '~/domain/entities/address.entity'
import { AddressGateway } from '~/domain/repositories/address.repository'
import { AddressMapper } from '~/infrastructure/mappers/address.mapper'

export class AddressPrismaRepositoryImpl implements AddressGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new AddressPrismaRepositoryImpl(prismaClient)
  }

  async save(address: AddressEntity): Promise<AddressEntity> {
    const addressPersistent = AddressMapper.toPersistent(address)
    const output = await this.prismaClient.address.create({
      data: addressPersistent,
    })

    return AddressMapper.toDomain(output)
  }
  async findById(id: string): Promise<AddressEntity | undefined> {
    const output = await this.prismaClient.address.findUnique({
      where: { id },
    })

    return output ? AddressMapper.toDomain(output) : undefined
  }
  async findAll(): Promise<AddressEntity[]> {
    const output = await this.prismaClient.address.findMany()

    return output.length ? output.map((addressItem) => AddressMapper.toDomain(addressItem)) : []
  }
  async delete(id: string): Promise<void> {
    await this.prismaClient.address.delete({
      where: { id },
    })
  }
  async update(id: string, address: AddressEntity): Promise<void> {
    await this.prismaClient.address.update({
      data: AddressMapper.toPersistent(address),
      where: { id },
    })
  }
}
