import { Address as AddressPrisma, User as PrismaUser } from '@prisma/client'

import { UserEntity } from '~/domain/user/entity/user.entity'

import { AddressMapper } from '../address/address.mapper'

export class UserMapper {
  static toDomain(prismaUser: PrismaUser & { address?: AddressPrisma }): UserEntity {
    return UserEntity.with({
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      deletedAt: prismaUser.deletedAt,
      id: prismaUser.id,
      age: prismaUser.age,
      name: prismaUser.name,
      phone: prismaUser.phone,
      email: prismaUser.email,
      gender: prismaUser.gender,
      address: prismaUser.address ? AddressMapper.toDomain(prismaUser.address) : null,
    })
  }

  static toPersistent(user: UserEntity): PrismaUser {
    return {
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
      id: user.id,
      name: user.name,
      age: user.age,
      phone: user.phone,
      email: user.email,
      gender: user.gender,
      addressId: user?.address?.id || null,
    }
  }
}
