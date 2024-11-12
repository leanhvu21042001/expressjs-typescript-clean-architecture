import { PrismaClient } from '@prisma/client'

import { UserEntity } from '~/domain/user/entity/user.entity'
import { UserGateway } from '~/domain/user/gateway/user.gateway'
import { UserMapper } from '~/infrastructure/mappers/user/user.mapper'

export class UserRepositoryPrisma implements UserGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new UserRepositoryPrisma(prismaClient)
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const dataSave = UserMapper.toPersistent(user)
    const output = await this.prismaClient.user.create({
      include: {
        address: true
      },
      data: dataSave
    })

    return UserMapper.toDomain({ ...output, address: output.address ?? undefined })
  }
  async findById(id: string): Promise<UserEntity | undefined> {
    const output = await this.prismaClient.user.findUnique({
      include: {
        address: true
      },
      where: { id }
    })

    return output ? UserMapper.toDomain({ ...output, address: output.address ?? undefined }) : undefined
  }
  async findAll(): Promise<UserEntity[]> {
    const output = await this.prismaClient.user.findMany({
      include: {
        address: true
      }
    })

    return output.length
      ? output.map((userItem) => UserMapper.toDomain({ ...userItem, address: userItem.address ?? undefined }))
      : []
  }
  async delete(id: string): Promise<void> {
    await this.prismaClient.user.delete({
      where: { id }
    })
  }
  async update(user: UserEntity): Promise<void> {
    await this.prismaClient.user.update({
      data: UserMapper.toPersistent(user),
      where: { id: user.id }
    })
  }
}
