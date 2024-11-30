import { LoginInputDto, LoginUseCase } from '~/application/usecases/login/login.usecase'

import { HttpMethod, IRouteExpress, TExpressRequest, TExpressResponse } from '../route.express.interface'

export type LoginResponseDto = {
  accessToken: string
  refreshToken: string
}

export class LoginRouteExpress implements IRouteExpress {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly loginService: LoginUseCase,
  ) {}

  public static create(loginService: LoginUseCase) {
    return new LoginRouteExpress('/auth/login', HttpMethod.POST, loginService)
  }
  public getHandler(): (request: TExpressRequest, response: TExpressResponse) => Promise<void> {
    return async (request: TExpressRequest, response: TExpressResponse) => {
      const { username, password } = request.body

      const input: LoginInputDto = {
        username,
        password,
      }

      const output: LoginResponseDto = await this.loginService.execute(input)
      const responseBody = this.present(output)
      response.status(201).json(responseBody).send()
    }
  }
  public getPath(): string {
    return this.path
  }
  public getMethod(): HttpMethod {
    return this.method
  }

  private present(input: LoginResponseDto): LoginResponseDto {
    const response = {
      accessToken: input.accessToken,
      refreshToken: input.refreshToken,
    }
    return response
  }
}
