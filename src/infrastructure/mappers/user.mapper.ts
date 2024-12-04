import { Address as AddressPrisma, User as PrismaUser } from '@prisma/client'

import { UserEntity } from '~/domain/entities/user.entity'
import { EmailValueObject } from '~/domain/value-objects/email.value-object'
import { PhoneValueObject } from '~/domain/value-objects/phone.value-object'

import { AddressMapper } from './address.mapper'

export class UserMapper {
  static toDomain(prismaUser: PrismaUser & { address?: AddressPrisma }): UserEntity {
    const id = prismaUser.id.toString()
    const phoneValue = PhoneValueObject.create(prismaUser.phone)
    const emailValue = EmailValueObject.create(prismaUser.email)

    return UserEntity.with({
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      deletedAt: prismaUser.deletedAt,
      id,
      age: prismaUser.age,
      name: prismaUser.name,
      phone: phoneValue,
      email: emailValue,
      gender: prismaUser.gender,
      address: prismaUser.address ? AddressMapper.toDomain(prismaUser.address) : null,
      username: prismaUser.username,
      password: prismaUser.password,
      roles: [],
    })
  }

  static toPersistent(user: UserEntity): PrismaUser {
    const id = Number(user.id)

    const addressId = user.address ? AddressMapper.toPersistent(user.address).id : null

    console.log({
      phone: user.phone,
      email: user.email,
    })
    return {
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
      id,
      name: user.name,
      age: user.age,
      phone: user.phone?.toString() || '',
      email: user.email?.toString() || '',
      gender: user.gender,
      addressId,
      username: user.username,
      password: user.password,
    }
  }
}
