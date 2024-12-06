import { BlogEntity } from '~/domain/entities/blog.entity'
import { TagEntity } from '~/domain/entities/tag.entity'
import { BlogRepository } from '~/domain/repositories/blog.repository'

import { IUseCase } from '../usecase.interface'

export type UpdateBlogInputDto = {
  id: string
  title: string
  content: string
  summary: string
  draft: boolean
  tags: TagEntity['id']
}

export type UpdateBlogOutputDto = {
  id: string
}

export class UpdateBlogUseCase implements IUseCase<UpdateBlogInputDto, UpdateBlogOutputDto> {
  private constructor(private readonly blogRepository: BlogRepository) {}

  // builder design pattern
  public static create(blogRepository: BlogRepository): UpdateBlogUseCase {
    return new UpdateBlogUseCase(blogRepository)
  }

  async execute(input: UpdateBlogInputDto): Promise<UpdateBlogOutputDto> {
    const blog = BlogEntity.with({
      id: input.id,
      title: input.title,
      content: input.content,
      summary: input.summary,
      draft: input.draft,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    await this.blogRepository.save(blog)

    const output = this.presentOutput(blog)
    return output
  }

  private presentOutput(blog: BlogEntity): UpdateBlogOutputDto {
    const output: UpdateBlogOutputDto = {
      id: blog.id,
    }

    return output
  }
}
