import { AddressEntity } from '~/domain/entities/address.entity'
import { UserEntity } from '~/domain/entities/user.entity'
import { UserRepository } from '~/domain/repositories/user.repository'
import { EmailValueObject } from '~/domain/value-objects/email.value-object'
import { PhoneValueObject } from '~/domain/value-objects/phone.value-object'

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
  private constructor(private readonly userRepository: UserRepository) {}

  public static create(userRepository: UserRepository): CreateUserUseCase {
    return new CreateUserUseCase(userRepository)
  }

  async execute(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const addressEntity = AddressEntity.create({
      country: input.country,
      city: input.city,
      state: input.state,
      street: input.street,
      zip: input.zip,
    })

    const emailValueObject = EmailValueObject.create(input.email)
    const phoneValueObject = PhoneValueObject.create(input.phone)

    const userEntity = UserEntity.create({
      name: input.name,
      email: emailValueObject,
      phone: phoneValueObject,
      age: input.age,
      gender: input.gender,
      username: input.username,
      password: input.password,
    })
    userEntity.setAddress(addressEntity)

    await this.userRepository.save(userEntity)

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
