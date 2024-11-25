import { UserGateway } from '~/domain/repositories/user.repository'
import { BadRequestException } from '~/infrastructure/exceptions/exceptions'
import { comparePassword } from '~/shared/hash-password'
import { generateToken } from '~/shared/jwt-auth.shared'

import { IUseCase } from '../usecase.interface'

export type LoginInputDto = {
  username: string
  password: string
}

export type LoginOutputDto = {
  accessToken: string
  refreshToken: string
}

export class LoginUseCase implements IUseCase<LoginInputDto, LoginOutputDto> {
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway): LoginUseCase {
    return new LoginUseCase(userGateway)
  }

  async execute(input: LoginInputDto): Promise<LoginOutputDto> {
    const userFound = await this.userGateway.findByUsername(input.username)

    if (!userFound) {
      throw new BadRequestException('Invalid username or password')
    }

    const match = await comparePassword(input.password, userFound.password)

    if (!match) {
      throw new BadRequestException('Invalid username or password')
    }

    const payload = {
      id: String(userFound.id),
    }
    const accessToken = generateToken(payload, 'access')
    const refreshToken = generateToken(payload, 'refresh')

    const output = this.presentOutput({
      accessToken,
      refreshToken,
    })

    return output
  }

  private presentOutput(output: LoginOutputDto): LoginOutputDto {
    return output
  }
}
