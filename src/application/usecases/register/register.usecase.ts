import { UserEntity } from '~/domain/entities/user.entity'
import { UserRepository } from '~/domain/repositories/user.repository'
import { EmailValueObject } from '~/domain/value-objects/email.value-object'
import { PhoneValueObject } from '~/domain/value-objects/phone.value-object'
import { BadRequestException } from '~/infrastructure/exceptions/exceptions'
import { hashPassword } from '~/shared/hash-password'
import { generateToken } from '~/shared/jwt-auth.shared'

import { IUseCase } from '../usecase.interface'

export type RegisterInputDto = {
  name: string
  age: number
  phone: string
  email: string
  gender: string
  username: string
  password: string
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

    const phoneValueObject = PhoneValueObject.create(input.phone)
    const emailValueObject = EmailValueObject.create(input.email)

    const userEntity = UserEntity.create({
      name: input.name,
      age: input.age,
      phone: phoneValueObject,
      email: emailValueObject,
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
