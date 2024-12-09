import { TagEntity } from '~/domain/entities/tag.entity'
import { TagRepository } from '~/domain/repositories/tag.repository'

import { IUseCase } from '../usecase.interface'

export type CreateTagInputDto = {
  title: string
}

export type CreateTagOutputDto = {
  id: string
}

export class CreateTagUseCase implements IUseCase<CreateTagInputDto, CreateTagOutputDto> {
  private constructor(private readonly tagRepository: TagRepository) {}

  public static create(tagRepository: TagRepository): CreateTagUseCase {
    return new CreateTagUseCase(tagRepository)
  }

  async execute(input: CreateTagInputDto): Promise<CreateTagOutputDto> {
    const tagEntity = TagEntity.create({
      title: input.title,
    })

    await this.tagRepository.save(tagEntity)

    const output = this.presentOutput(tagEntity)

    return output
  }

  private presentOutput(tag: TagEntity): CreateTagOutputDto {
    const output = {
      id: tag.id,
    }

    return output
  }
}
