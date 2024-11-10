import { ProductGateway } from '~/domain/gateway/product.gateway'
import { Product } from '~/domain/product/entity/product'

import { UseCase } from '../usecase'

export type ListProductInputDto = void

export type ListProductOutputDto = {
  products: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}

export class ListProductUseCase implements UseCase<ListProductInputDto, ListProductOutputDto> {
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway): ListProductUseCase {
    return new ListProductUseCase(productGateway)
  }

  async execute(): Promise<ListProductOutputDto> {
    const products = await this.productGateway.list()

    const output = this.presentOutput(products)

    return output
  }

  private presentOutput(products: Product[]): ListProductOutputDto {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      }))
    }
  }
}
