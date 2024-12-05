import { PrismaClient } from '@prisma/client'

import { TagEntity } from '~/domain/entities/tag.entity'
import { TagRepository } from '~/domain/repositories/tag.repository'
import { TagMapper } from '~/infrastructure/mappers/tag.mapper'

export class TagPrismaRepositoryImpl implements TagRepository {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient): TagPrismaRepositoryImpl {
    return new TagPrismaRepositoryImpl(prismaClient)
  }

  async save(tag: TagEntity): Promise<void> {
    await this.prismaClient.tag.create({
      data: {
        title: tag.title,
      },
    })
  }

  async findById(id: TagEntity['id']): Promise<TagEntity | undefined> {
    const tagFound = await this.prismaClient.tag.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!tagFound) return undefined

    return TagMapper.toDomain(tagFound)
  }

  async list(): Promise<TagEntity[]> {
    const tagsFound = await this.prismaClient.tag.findMany()

    return tagsFound.map(TagMapper.toDomain)
  }

  async delete(id: TagEntity['id']): Promise<void> {
    await this.prismaClient.tag.delete({
      where: {
        id: Number(id),
      },
    })
  }

  async update(tag: TagEntity): Promise<TagEntity> {
    const updatedTag = await this.prismaClient.tag.update({
      where: {
        id: Number(tag.id),
      },
      data: {
        title: tag.title,
      },
    })

    return TagMapper.toDomain(updatedTag)
  }
}
