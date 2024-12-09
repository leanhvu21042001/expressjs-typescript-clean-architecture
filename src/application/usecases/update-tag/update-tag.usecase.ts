import { TagEntity } from '~/domain/entities/tag.entity'
import { TagRepository } from '~/domain/repositories/tag.repository'

import { IUseCase } from '../usecase.interface'

export type UpdateTagInputDto = {
  id: string
  title: string
}

export type UpdateTagOutputDto = {
  id: string
  updatedAt: Date
}

export class UpdateTagUseCase implements IUseCase<UpdateTagInputDto, UpdateTagOutputDto> {
  private constructor(private readonly tagRepository: TagRepository) {}

  public static create(tagRepository: TagRepository): UpdateTagUseCase {
    return new UpdateTagUseCase(tagRepository)
  }

  async execute(input: UpdateTagInputDto): Promise<UpdateTagOutputDto> {
    const tag = await this.tagRepository.findById(input.id)

    if (!tag) {
      throw new Error('Tag not found')
    }

    const tagEntity = TagEntity.with({
      title: input.title,
      id: input.id,
      createdAt: tag.createdAt,
      updatedAt: new Date(),
      deletedAt: tag.deletedAt,
    })

    await this.tagRepository.update(tagEntity)

    const output = this.presentOutput(tagEntity)

    return output
  }

  private presentOutput(tag: TagEntity): UpdateTagOutputDto {
    const output = {
      id: tag.id,
      updatedAt: tag.updatedAt,
    }

    return output
  }
}
