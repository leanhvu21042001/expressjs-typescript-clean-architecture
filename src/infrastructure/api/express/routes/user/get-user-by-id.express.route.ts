import { GetUserByIdOutputDto, GetUserByIdUseCase } from '~/application/usecases/get-user-by-id/get-user-by-id.usecase'

import { HttpMethod, IRouteExpress, TExpressRequest, TExpressResponse } from '../route.express.interface'

export type GetUserByIdResponseDto = {
  user: {
    id: string
    name: string
    email: string
    address: {
      street: string
      city: string
      state: string
    }
  }
}

export class GetUserByIdRouteExpress implements IRouteExpress {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly userByIdService: GetUserByIdUseCase
  ) {}

  public static create(userByIdService: GetUserByIdUseCase): GetUserByIdRouteExpress {
    return new GetUserByIdRouteExpress('/users/:id', HttpMethod.GET, userByIdService)
  }

  getHandler(): (request: TExpressRequest, response: TExpressResponse) => Promise<void> {
    return async (request: TExpressRequest, response: TExpressResponse) => {
      const userId = request.params.id
      const output = await this.userByIdService.execute({ id: userId })
      const responseBody = this.present(output)

      response.status(200).json(responseBody).send()
    }
  }
  getPath(): string {
    return this.path
  }
  getMethod(): HttpMethod {
    return this.method
  }

  private present(user: GetUserByIdOutputDto): GetUserByIdResponseDto {
    const response: GetUserByIdResponseDto = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: {
          street: user.address.street,
          city: user.address.city,
          state: user.address.state
        }
      }
    }

    return response
  }
}
