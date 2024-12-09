import { TagEntity } from '~/domain/entities/tag.entity'
import { TagRepository } from '~/domain/repositories/tag.repository'
import { BadRequestException } from '~/infrastructure/exceptions/exceptions'

import { IUseCase } from '../usecase.interface'

export type GetTagUseCaseInputDto = {
  id: string
}
export type GetTagUseCaseOutputDto = {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export class GetTagUseCase implements IUseCase<GetTagUseCaseInputDto, GetTagUseCaseOutputDto> {
  private constructor(private readonly tagRepository: TagRepository) {}

  static create(tagRepository: TagRepository): GetTagUseCase {
    return new GetTagUseCase(tagRepository)
  }

  async execute(input: GetTagUseCaseInputDto): Promise<GetTagUseCaseOutputDto> {
    const tag = await this.tagRepository.findById(input.id)

    if (!tag) {
      throw new BadRequestException('Tag not found')
    }

    const output = this.presentOutput(tag)

    return output
  }

  private presentOutput(tag: TagEntity): GetTagUseCaseOutputDto {
    return {
      id: tag.id,
      title: tag.title,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
      deletedAt: tag.deletedAt,
    }
  }
}
