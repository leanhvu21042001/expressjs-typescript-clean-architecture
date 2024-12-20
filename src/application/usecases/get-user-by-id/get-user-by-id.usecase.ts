import { UserEntity } from '~/domain/entities/user.entity'
import { UserRepository } from '~/domain/repositories/user.repository'

import { IUseCase } from '../usecase.interface'

export type GetUserByIdInputDto = {
  id: string
}

export type GetUserByIdOutputDto = {
  id: string
  name: string
  email: string
  address: {
    street: string
    city: string
    state: string
  }
  createdAt: Date
  updatedAt: Date
}

export class GetUserByIdUseCase implements IUseCase<GetUserByIdInputDto, GetUserByIdOutputDto> {
  constructor(private readonly userRepository: UserRepository) {}

  public static create(userRepository: UserRepository): GetUserByIdUseCase {
    return new GetUserByIdUseCase(userRepository)
  }

  async execute(input: GetUserByIdInputDto): Promise<GetUserByIdOutputDto> {
    const user = await this.userRepository.findById(input.id)
    if (!user) throw new Error('User not found')

    console.log(user)
    const output = this.presentOutput(user)

    return output
  }

  private presentOutput(user: UserEntity): GetUserByIdOutputDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email.toString(),
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
