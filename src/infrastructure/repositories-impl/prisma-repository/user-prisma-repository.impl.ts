import { PrismaClient } from '@prisma/client'

import { UserEntity } from '~/domain/entities/user.entity'
import { UserRepository } from '~/domain/repositories/user.repository'
import { UserMapper } from '~/infrastructure/mappers/user.mapper'

export class UserPrismaRepositoryImpl implements UserRepository {
  private constructor(private readonly prismaClient: PrismaClient) {}

  async findByUsername(username: UserEntity['username']): Promise<UserEntity | undefined> {
    const output = await this.prismaClient.user.findFirst({
      include: {
        address: true,
      },
      where: {
        username,
      },
    })

    return output ? UserMapper.toDomain({ ...output, address: output.address ?? undefined }) : undefined
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const dataSave = UserMapper.toPersistent(user)

    const output = await this.prismaClient.user.create({
      include: {
        address: true,
      },
      data: {
        age: dataSave.age,
        email: dataSave.email,
        name: dataSave.name,
        password: dataSave.password,
        username: dataSave.username,
        gender: dataSave.gender,
        phone: dataSave.phone,
      },
    })

    return UserMapper.toDomain({ ...output, address: output.address ?? undefined })
  }
  async findById(id: string): Promise<UserEntity | undefined> {
    const output = await this.prismaClient.user.findUnique({
      include: {
        address: true,
      },
      where: { id: Number(id) },
    })

    return output ? UserMapper.toDomain({ ...output, address: output.address ?? undefined }) : undefined
  }
  async findAll(): Promise<UserEntity[]> {
    const output = await this.prismaClient.user.findMany({
      include: {
        address: true,
      },
    })

    return output.length
      ? output.map((userItem) => UserMapper.toDomain({ ...userItem, address: userItem.address ?? undefined }))
      : []
  }
  async delete(id: string): Promise<void> {
    await this.prismaClient.user.delete({
      where: { id: Number(id) },
    })
  }
  async update(user: UserEntity): Promise<void> {
    await this.prismaClient.user.update({
      data: UserMapper.toPersistent(user),
      where: { id: Number(user.id) },
    })
  }

  public static create(prismaClient: PrismaClient) {
    return new UserPrismaRepositoryImpl(prismaClient)
  }
}
