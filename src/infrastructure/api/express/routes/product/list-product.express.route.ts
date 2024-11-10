import { ListProductOutputDto, ListProductUseCase } from '~/application/usecases/list-product/list-product.usecase'

import { HttpMethod, IRouteExpress, TExpressRequest, TExpressResponse } from '../route.express.interface'

export type ListProductResponseDto = {
  products: {
    id: string
    name: string
    price: number
  }[]
}

export class ListProductRouteExpress implements IRouteExpress {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductService: ListProductUseCase
  ) {}

  public static create(listProductService: ListProductUseCase): ListProductRouteExpress {
    return new ListProductRouteExpress('/products', HttpMethod.GET, listProductService)
  }

  getHandler(): (request: TExpressRequest, response: TExpressResponse) => Promise<void> {
    return async (request: TExpressRequest, response: TExpressResponse) => {
      const output = await this.listProductService.execute()
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

  private present(input: ListProductOutputDto): ListProductResponseDto {
    const response: ListProductResponseDto = {
      products: input.products.map((productItem) => {
        return {
          id: productItem.id,
          name: productItem.name,
          price: productItem.price
        }
      })
    }

    return response
  }
}
