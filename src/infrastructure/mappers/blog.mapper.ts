import { Blog as PrismaBlog } from '@prisma/client'

import { BlogEntity } from '~/domain/entities/blog.entity'

export class BlogMapper {
  public static toDomain(prismaBlog: PrismaBlog): BlogEntity {
    const id = String(prismaBlog.id)

    return BlogEntity.with({
      createdAt: prismaBlog.createdAt,
      updatedAt: prismaBlog.updatedAt,
      deletedAt: prismaBlog.deletedAt,
      id,
      title: prismaBlog.title,
      summary: prismaBlog.summary,
      content: prismaBlog.content,
      draft: prismaBlog.draft,
      tags: [],
    })
  }

  public static toPersistence(blogEntity: BlogEntity): PrismaBlog {
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
    }
  }
}
