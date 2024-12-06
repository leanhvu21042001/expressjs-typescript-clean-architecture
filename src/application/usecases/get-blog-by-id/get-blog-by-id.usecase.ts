import { BlogEntity } from '~/domain/entities/blog.entity'
import { TagEntity } from '~/domain/entities/tag.entity'
import { BlogRepository } from '~/domain/repositories/blog.repository'
import { NotFoundException } from '~/infrastructure/exceptions/exceptions'

import { IUseCase } from '../usecase.interface'

export type GetBlogByIdInputDto = {
  id: string
}

export type GetBlogByIdOutputDto = {
  blogs: {
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    id: string
    title: string
    summary: string
    content: string
    draft: boolean
    tags: TagEntity[]
  }
}

export class GetBlogByIdUseCase implements IUseCase<GetBlogByIdInputDto, GetBlogByIdOutputDto> {
  private constructor(private readonly blogRepository: BlogRepository) {}

  public static create(productRepository: BlogRepository): GetBlogByIdUseCase {
    return new GetBlogByIdUseCase(productRepository)
  }

  async execute(input: GetBlogByIdInputDto): Promise<GetBlogByIdOutputDto> {
    const blog = await this.blogRepository.findById(input.id)

    if (!blog) {
      throw new NotFoundException('Blog not found')
    }

    const output = this.presentOutput(blog)

    return output
  }

  private presentOutput(blog: BlogEntity): GetBlogByIdOutputDto {
    return {
      blogs: {
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        deletedAt: blog.deletedAt,
        id: blog.id,
        title: blog.title,
        summary: blog.summary,
        content: blog.content,
        draft: blog.draft,
        tags: blog.tags,
      },
    }
  }
}
