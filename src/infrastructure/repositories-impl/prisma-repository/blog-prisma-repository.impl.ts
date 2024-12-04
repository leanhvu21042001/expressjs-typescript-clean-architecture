import { PrismaClient } from '@prisma/client'

import { BlogEntity } from '~/domain/entities/blog.entity'
import { BlogRepository } from '~/domain/repositories/blog.repository'
import { BlogMapper } from '~/infrastructure/mappers/blog.mapper'

export class BlogPrismaRepositoryImpl implements BlogRepository {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new BlogPrismaRepositoryImpl(prismaClient)
  }

  async save(blog: BlogEntity): Promise<void> {
    const saved = await this.prismaClient.blog.create({
      data: {
        title: blog.title,
        content: blog.content,
        draft: blog.draft,
        summary: blog.summary,
      },
    })

    return BlogMapper.toDomain(saved)
  }

  async findById(id: BlogEntity['id']): Promise<BlogEntity | undefined> {
    const blogFound = await this.prismaClient.blog.findFirst({
      where: {
        id: Number(id),
      },
    })
  }
  list(): Promise<BlogEntity[]> {
    throw new Error('Method not implemented.')
  }
  delete(id: BlogEntity['id']): Promise<void> {
    throw new Error('Method not implemented.')
  }
  update(blog: BlogEntity): Promise<BlogEntity> {
    throw new Error('Method not implemented.')
  }
}
