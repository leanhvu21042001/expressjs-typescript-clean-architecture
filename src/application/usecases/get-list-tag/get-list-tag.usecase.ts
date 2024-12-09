import { TagEntity } from '~/domain/entities/tag.entity'
import { TagRepository } from '~/domain/repositories/tag.repository'
import { BadRequestException } from '~/infrastructure/exceptions/exceptions'

import { IUseCase } from '../usecase.interface'

export type GetListTagUseCaseInputDto = void
export type GetListTagUseCaseOutputDto = {
  tags: Array<{
    id: string
    title: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }>
}

export class GetListTagUseCase implements IUseCase<GetListTagUseCaseInputDto, GetListTagUseCaseOutputDto> {
  private constructor(private readonly tagRepository: TagRepository) {}

  static create(tagRepository: TagRepository): GetListTagUseCase {
    return new GetListTagUseCase(tagRepository)
  }

  async execute(): Promise<GetListTagUseCaseOutputDto> {
    const tags = await this.tagRepository.list()

    const output = this.presentOutput(tags)

    return output
  }

  private presentOutput(tags: TagEntity[]): GetListTagUseCaseOutputDto {
    return {
      tags: tags.map((tag) => ({
        id: tag.id,
        title: tag.title,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
        deletedAt: tag.deletedAt,
      })),
    }
  }
}
