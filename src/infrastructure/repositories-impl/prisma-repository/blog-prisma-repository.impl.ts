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
    // const saved =
    await this.prismaClient.blog.create({
      data: {
        title: blog.title,
        content: blog.content,
        draft: blog.draft,
        summary: blog.summary,
      },
    })
    // return BlogMapper.toDomain(saved)
  }

  async findById(id: BlogEntity['id']): Promise<BlogEntity | undefined> {
    const blogFound = await this.prismaClient.blog.findFirst({
      where: {
        id: Number(id),
      },
    })

    if (!blogFound) return undefined

    return BlogMapper.toDomain(blogFound)
  }

  async list(): Promise<BlogEntity[]> {
    const blogs = await this.prismaClient.blog.findMany({})

    return blogs.map(BlogMapper.toDomain)
  }

  async delete(id: BlogEntity['id']): Promise<void> {
    await this.prismaClient.blog.delete({
      where: {
        id: Number(id),
      },
    })
  }
  async update(blog: BlogEntity): Promise<BlogEntity> {
    const updated = await this.prismaClient.blog.update({
      data: {
        title: blog.title,
        content: blog.content,
        draft: blog.draft,
        summary: blog.summary,
      },
      where: {
        id: Number(blog.id),
      },
    })

    return BlogMapper.toDomain(updated)
  }
}
