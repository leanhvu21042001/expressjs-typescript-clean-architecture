import { AddressEntity } from '~/domain/address/entity/address'
import { UserEntity } from '~/domain/user/entity/user.entity'
import { UserGateway } from '~/domain/user/gateway/user.gateway'

import { IUseCase } from '../usecase.interface'

export type CreateUserInputDto = {
  country: string
  city: string
  state: string
  street: string
  zip: string
  name: string
  email: string
  address: string
  phone: string
  age: number
  gender: string
  username: string
  password: string
}
export type CreateUserOutputDto = {
  id: string
}

export class CreateUserUseCase implements IUseCase<CreateUserInputDto, CreateUserOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway): CreateUserUseCase {
    return new CreateUserUseCase(userGateway)
  }

  async execute(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
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
      password: input.password,
    })

    await this.userGateway.save(userEntity)

    const output = this.presentOutput(userEntity)
    return output
  }

  private presentOutput(user: UserEntity): CreateUserOutputDto {
    const output = {
      id: user.id,
    }

    return output
  }
}
