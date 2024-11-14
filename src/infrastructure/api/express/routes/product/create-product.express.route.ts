import {
  CreateProductInputDto,
  CreateProductUseCase,
} from '~/application/usecases/create-product/create-product.usecase'

import { HttpMethod, IRouteExpress, TExpressRequest, TExpressResponse } from '../route.express.interface'

export type CreateProductResponseDto = {
  id: string
}
export class CreateProductRouteExpress implements IRouteExpress {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductService: CreateProductUseCase,
  ) {}

  public static create(createProductService: CreateProductUseCase) {
    return new CreateProductRouteExpress('/products', HttpMethod.POST, createProductService)
  }
  public getHandler(): (request: TExpressRequest, response: TExpressResponse) => Promise<void> {
    return async (request: TExpressRequest, response: TExpressResponse) => {
      const { name, price } = request.body

      const input: CreateProductInputDto = {
        name,
        price,
      }

      const output: CreateProductResponseDto = await this.createProductService.execute(input)
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

  private present(input: CreateProductResponseDto): CreateProductResponseDto {
    const response = { id: input.id }
    return response
  }
}
