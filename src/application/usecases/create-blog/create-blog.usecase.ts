import { BlogEntity } from '~/domain/entities/blog.entity'
import { TagEntity } from '~/domain/entities/tag.entity'
import { BlogRepository } from '~/domain/repositories/blog.repository'

import { IUseCase } from '../usecase.interface'

export type CreateBlogInputDto = {
  title: string
  content: string
  summary: string
  draft: boolean
  tags: TagEntity['id']
}

export type CreateBlogOutputDto = {
  id: string
}

export class CreateBlogUseCase implements IUseCase<CreateBlogInputDto, CreateBlogOutputDto> {
  private constructor(private readonly blogRepository: BlogRepository) {}

  // builder design pattern
  public static create(blogRepository: BlogRepository): CreateBlogUseCase {
    return new CreateBlogUseCase(blogRepository)
  }

  async execute(input: CreateBlogInputDto): Promise<CreateBlogOutputDto> {
    const product = BlogEntity.create({
      title: input.title,
      content: input.content,
      summary: input.summary,
      draft: input.draft,
      tags: [],
    })

    await this.blogRepository.save(product)

    const output = this.presentOutput(product)
    return output
  }

  private presentOutput(product: BlogEntity): CreateBlogOutputDto {
    const output: CreateBlogOutputDto = {
      id: product.id,
    }

    return output
  }
}
