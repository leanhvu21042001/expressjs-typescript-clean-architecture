import { TagRepository } from '~/domain/repositories/tag.repository'
import { BadRequestException } from '~/infrastructure/exceptions/exceptions'

import { IUseCase } from '../usecase.interface'

export type DeleteTagInputDto = {
  id: string
}

export type DeleteTagOutputDto = void

export class DeleteTagUseCase implements IUseCase<DeleteTagInputDto, DeleteTagOutputDto> {
  private constructor(private readonly tagRepository: TagRepository) {}

  public static create(tagRepository: TagRepository): DeleteTagUseCase {
    return new DeleteTagUseCase(tagRepository)
  }

  async execute(input: DeleteTagInputDto): Promise<DeleteTagOutputDto> {
    const tag = await this.tagRepository.findById(input.id)

    if (!tag) {
      throw new BadRequestException('Tag not found')
    }

    await this.tagRepository.delete(tag.id)

    return this.presentOutput()
  }

  private presentOutput(): DeleteTagOutputDto {}
}
