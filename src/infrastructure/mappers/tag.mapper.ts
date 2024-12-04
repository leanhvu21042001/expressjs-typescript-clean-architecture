import { Tag as PrismaTag } from '@prisma/client'

import { TagEntity } from '~/domain/entities/tag.entity'

export class TagMapper {
  public static toDomain(prismaProduct: PrismaTag): TagEntity {
    const id = String(prismaProduct.id)
    return TagEntity.with({
      createdAt: prismaProduct.createdAt,
      updatedAt: prismaProduct.updatedAt,
      deletedAt: prismaProduct.deletedAt,
      id,
      title: prismaProduct.title,
    })
  }

  public static toPersistence(tagEntity: TagEntity): PrismaTag {
    const id = Number(tagEntity.id)
    return {
      id,
      createdAt: tagEntity.createdAt,
      updatedAt: tagEntity.updatedAt,
      deletedAt: tagEntity.deletedAt ? new Date(tagEntity.deletedAt) : null,
      title: tagEntity.title,
    }
  }
}
