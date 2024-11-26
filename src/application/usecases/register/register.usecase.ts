import { UserEntity } from '~/domain/entities/user.entity'
import { UserRepository } from '~/domain/repositories/user.repository'
import { BadRequestException } from '~/infrastructure/exceptions/exceptions'
import { hashPassword } from '~/shared/hash-password'
import { generateToken } from '~/shared/jwt-auth.shared'

import { IUseCase } from '../usecase.interface'

export type RegisterInputDto = {
  name: string
  email: string
  address: string
  phone: string
  age: number
  gender: string
  username: string
  password: string
  country: string
  city: string
  state: string
  street: string
  zip: string
}

export type RegisterOutputDto = {
  accessToken: string
  refreshToken: string
}

export class RegisterUseCase implements IUseCase<RegisterInputDto, RegisterOutputDto> {
  private constructor(private readonly userRepository: UserRepository) {}

  public static create(userRepository: UserRepository): RegisterUseCase {
    return new RegisterUseCase(userRepository)
  }

  async execute(input: RegisterInputDto): Promise<RegisterOutputDto> {
    const userFound = await this.userRepository.findByUsername(input.username)

    if (userFound) {
      throw new BadRequestException('User already exists')
    }

    const passwordHashed = await hashPassword(input.password)

    const userEntity = UserEntity.create({
      name: input.name,
      age: input.age,
      gender: input.gender,
      username: input.username,
      password: passwordHashed,
    })

    const userSaved = await this.userRepository.save(userEntity)

    const payload = {
      id: userSaved.id,
    }
    const accessToken = generateToken(payload, 'access')
    const refreshToken = generateToken(payload, 'refresh')

    const output = this.presentOutput({
      accessToken,
      refreshToken,
    })

    return output
  }

  private presentOutput(output: RegisterOutputDto): RegisterOutputDto {
    return output
  }
}
