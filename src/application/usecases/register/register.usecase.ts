import { AddressEntity } from '~/domain/address/entity/address'
import { UserEntity } from '~/domain/user/entity/user.entity'
import { UserGateway } from '~/domain/user/gateway/user.gateway'
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
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway): RegisterUseCase {
    return new RegisterUseCase(userGateway)
  }

  async execute(input: RegisterInputDto): Promise<RegisterOutputDto> {
    const userFound = await this.userGateway.findByUsername(input.username)

    if (userFound) {
      throw new BadRequestException('User already exists')
    }

    const passwordHashed = await hashPassword(input.password)

    const addressEntity = AddressEntity.create({
      country: input.country,
      city: input.city,
      state: input.state,
      street: input.street,
      zip: input.zip,
    })

    const userEntity = UserEntity.create({
      name: input.name,
      email: input.email,
      address: addressEntity,
      phone: input.phone,
      age: input.age,
      gender: input.gender,
      username: input.username,
      password: passwordHashed,
    })
    const userSaved = await this.userGateway.save(userEntity)

    const payload = {
      id: String(userSaved.id),
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
