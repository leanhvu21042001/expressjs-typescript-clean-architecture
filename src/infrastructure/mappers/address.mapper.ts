import { Address as PrimaAddress } from '@prisma/client'

import { AddressEntity } from '~/domain/entities/address.entity'

export class AddressMapper {
  public static toDomain(prismaAddress: PrimaAddress): AddressEntity {
    const id = String(prismaAddress.id)
    return AddressEntity.with({
      createdAt: prismaAddress.createdAt,
      updatedAt: prismaAddress.updatedAt,
      deletedAt: prismaAddress.deletedAt,
      id,
      street: prismaAddress.street,
      city: prismaAddress.city,
      state: prismaAddress.state,
      zip: prismaAddress.zip,
      country: prismaAddress.country,
    })
  }
  public static toPersistent(addressEntity: AddressEntity): PrimaAddress {
    const id = Number(addressEntity.id)

    return {
      id,
      createdAt: addressEntity.createdAt,
      updatedAt: addressEntity.updatedAt,
      deletedAt: addressEntity.deletedAt ? new Date(addressEntity.deletedAt) : null,
      country: addressEntity.country,
      street: addressEntity.street,
      city: addressEntity.city,
      state: addressEntity.state,
      zip: addressEntity.zip,
    }
  }
}
