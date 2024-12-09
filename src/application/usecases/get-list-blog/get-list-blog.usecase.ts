import { BlogEntity } from '~/domain/entities/blog.entity'
import { TagEntity } from '~/domain/entities/tag.entity'
import { BlogRepository } from '~/domain/repositories/blog.repository'

import { IUseCase } from '../usecase.interface'

export type GetListBlogInputDto = void

export type GetListBlogOutputDto = {
  blogs: Array<{
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    id: string
    title: string
    summary: string
    content: string
    draft: boolean
    tags: TagEntity[]
  }>
}

export class GetListBlogUseCase implements IUseCase<GetListBlogInputDto, GetListBlogOutputDto> {
  private constructor(private readonly blogRepository: BlogRepository) {}

  public static create(productRepository: BlogRepository): GetListBlogUseCase {
    return new GetListBlogUseCase(productRepository)
  }

  async execute(): Promise<GetListBlogOutputDto> {
    const blogs = await this.blogRepository.findMany()

    const output = this.presentOutput(blogs)

    return output
  }

  private presentOutput(blogs: BlogEntity[]): GetListBlogOutputDto {
    return {
      blogs: blogs.map((blog) => ({
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        deletedAt: blog.deletedAt,
        id: blog.id,
        title: blog.title,
        summary: blog.summary,
        content: blog.content,
        draft: blog.draft,
        tags: blog.tags,
      })),
    }
  }
}
