import { Blog as PrismaBlog, Tag as PrismaTag } from '@prisma/client'

import { BlogEntity } from '~/domain/entities/blog.entity'

import { TagMapper } from './tag.mapper'

export type PrismaBlogWithTags = PrismaBlog & { tags?: PrismaTag[] }

export class BlogMapper {
  public static toDomain(prismaBlog: PrismaBlogWithTags): BlogEntity {
    const id = String(prismaBlog.id)
    const tagsMapped = prismaBlog.tags?.map((tag) => TagMapper.toDomain(tag)) ?? []

    return BlogEntity.with({
      createdAt: prismaBlog.createdAt,
      updatedAt: prismaBlog.updatedAt,
      deletedAt: prismaBlog.deletedAt,
      id,
      title: prismaBlog.title,
      summary: prismaBlog.summary,
      content: prismaBlog.content,
      draft: prismaBlog.draft,
      tags: tagsMapped,
    })
  }

  public static toPersistence(blogEntity: BlogEntity): PrismaBlogWithTags {
    const id = Number(blogEntity.id)
    return {
      id,
      createdAt: blogEntity.createdAt,
      updatedAt: blogEntity.updatedAt,
      deletedAt: blogEntity.deletedAt ? new Date(blogEntity.deletedAt) : null,
      title: blogEntity.title,
      summary: blogEntity.summary,
      content: blogEntity.content,
      draft: blogEntity.draft,
      tags: blogEntity.tags.map((tag) => TagMapper.toPersistence(tag)),
    }
  }
}
