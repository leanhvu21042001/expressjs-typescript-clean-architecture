import { RefreshTokenInputDto, RefreshTokenUseCase } from '~/application/usecases/refresh-token/refresh-token.usecase'

import { HttpMethod, IRouteExpress, TExpressRequest, TExpressResponse } from '../route.express.interface'

export type RefreshResponseDto = {
  accessToken: string
  refreshToken: string
}

export class RefreshRouteExpress implements IRouteExpress {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly refreshService: RefreshTokenUseCase,
  ) {}

  public static create(refreshService: RefreshTokenUseCase) {
    return new RefreshRouteExpress('/auth/refresh', HttpMethod.POST, refreshService)
  }
  public getHandler(): (request: TExpressRequest, response: TExpressResponse) => Promise<void> {
    return async (request: TExpressRequest, response: TExpressResponse) => {
      const { accessToken, refreshToken } = request.body

      const input: RefreshTokenInputDto = {
        accessToken,
        refreshToken,
      }

      const output: RefreshResponseDto = await this.refreshService.execute(input)
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

  private present(input: RefreshResponseDto): RefreshResponseDto {
    const response = {
      accessToken: input.accessToken,
      refreshToken: input.refreshToken,
    }
    return response
  }
}
