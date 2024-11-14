import { UserGateway } from '~/domain/user/gateway/user.gateway'

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
    const outputDto = await this.userGateway.findById(input.username)
    // const output = this.presentOutput(outputDto)
    // return output

    const output = this.presentOutput({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    })

    return output
  }

  private presentOutput(output: LoginOutputDto): LoginOutputDto {
    return output
  }
}
