import { ListProductOutputDto, ListProductUseCase } from '~/application/usecases/list-product/list-product.usecase'

import { HttpMethod, IRouteFastify, TFastifyRequest, TFastifyResponse } from '../route.fastify.interface'

export type ListProductResponseDto = {
  products: {
    id: string
    name: string
    price: number
  }[]
}

export class ListProductRouteFastify implements IRouteFastify {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductService: ListProductUseCase,
  ) {}

  public static create(listProductService: ListProductUseCase): ListProductRouteFastify {
    return new ListProductRouteFastify('/products', HttpMethod.GET, listProductService)
  }

  getHandler(): (request: TFastifyRequest, response: TFastifyResponse) => Promise<void> {
    return async (request: TFastifyRequest, response: TFastifyResponse) => {
      const output = await this.listProductService.execute()
      const responseBody = this.present(output)

      response.status(200).send(responseBody)
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
          price: productItem.price,
        }
      }),
    }

    return response
  }
}
