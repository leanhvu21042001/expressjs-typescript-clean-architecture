import { ProductEntity } from '~/domain/entities/product.entity'
import { ProductRepository } from '~/domain/repositories/product.repository'

import { IUseCase } from '../usecase.interface'

export type ListProductInputDto = void

export type ListProductOutputDto = {
  products: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}

export class ListProductUseCase implements IUseCase<ListProductInputDto, ListProductOutputDto> {
  private constructor(private readonly productRepository: ProductRepository) {}

  public static create(productRepository: ProductRepository): ListProductUseCase {
    return new ListProductUseCase(productRepository)
  }

  async execute(): Promise<ListProductOutputDto> {
    const products = await this.productRepository.list()

    const output = this.presentOutput(products)

    return output
  }

  private presentOutput(products: ProductEntity[]): ListProductOutputDto {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),
    }
  }
}
