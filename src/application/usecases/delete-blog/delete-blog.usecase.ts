import { BlogRepository } from '~/domain/repositories/blog.repository'
import { BadRequestException } from '~/infrastructure/exceptions/exceptions'

import { IUseCase } from '../usecase.interface'

export type DeleteBlogInputDto = {
  id: string
}

export type DeleteBlogOutputDto = void

export class DeleteBlogUseCase implements IUseCase<DeleteBlogInputDto, DeleteBlogOutputDto> {
  private constructor(private readonly blogRepository: BlogRepository) {}

  public static create(blogRepository: BlogRepository): DeleteBlogUseCase {
    return new DeleteBlogUseCase(blogRepository)
  }

  async execute(input: DeleteBlogInputDto): Promise<DeleteBlogOutputDto> {
    const blog = await this.blogRepository.findById(input.id)

    if (!blog) {
      throw new BadRequestException('Blog not found')
    }

    await this.blogRepository.delete(blog.id)

    return this.presentOutput()
  }

  private presentOutput(): DeleteBlogOutputDto {}
}
