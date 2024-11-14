import { Address as PrimaAddress } from '@prisma/client'

import { AddressEntity } from '~/domain/address/entity/address'

export class AddressMapper {
  public static toDomain(prismaAddress: PrimaAddress): AddressEntity {
    return AddressEntity.with({
      createdAt: prismaAddress.createdAt,
      updatedAt: prismaAddress.updatedAt,
      deletedAt: prismaAddress.deletedAt,
      id: prismaAddress.id,
      street: prismaAddress.street,
      city: prismaAddress.city,
      state: prismaAddress.state,
      zip: prismaAddress.zip,
      country: prismaAddress.country
    })
  }
  public static toPersistent(addressEntity: AddressEntity): PrimaAddress {
    return {
      id: addressEntity.id,
      createdAt: addressEntity.createdAt,
      updatedAt: addressEntity.updatedAt,
      country: addressEntity.country,
      deletedAt: addressEntity.deletedAt ? new Date(addressEntity.deletedAt) : null,
      street: addressEntity.street,
      city: addressEntity.city,
      state: addressEntity.state,
      zip: addressEntity.zip
    }
  }
}
