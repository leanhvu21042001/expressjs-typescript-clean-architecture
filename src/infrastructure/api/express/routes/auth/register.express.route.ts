import { RegisterInputDto, RegisterUseCase } from '~/application/usecases/register/register.usecase'

import { HttpMethod, IRouteExpress, TExpressRequest, TExpressResponse } from '../route.express.interface'

export type RegisterResponseDto = {
  accessToken: string
  refreshToken: string
}

export class RegisterRouteExpress implements IRouteExpress {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly registerService: RegisterUseCase,
  ) {}

  public static create(registerService: RegisterUseCase) {
    return new RegisterRouteExpress('/auth/register', HttpMethod.POST, registerService)
  }
  public getHandler(): (request: TExpressRequest, response: TExpressResponse) => Promise<void> {
    return async (request: TExpressRequest, response: TExpressResponse) => {
      console.log({
        requestBody: request.body,
      })
      const { name, age, phone, email, gender, username, password } = request.body

      const input: RegisterInputDto = {
        name,
        age,
        phone,
        email,
        gender,
        username,
        password,
      }

      const output: RegisterResponseDto = await this.registerService.execute(input)
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

  private present(input: RegisterResponseDto): RegisterResponseDto {
    const response = {
      accessToken: input.accessToken,
      refreshToken: input.refreshToken,
    }
    return response
  }
}
