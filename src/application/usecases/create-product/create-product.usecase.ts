import { Product } from '~/domain/product/entity/product'
import { ProductGateway } from '~/domain/product/gateway/product.gateway'

import { IUseCase } from '../usecase.interface'

export type CreateProductInputDto = {
  name: string
  price: number
}

export type CreateProductOutputDto = {
  id: string
}

export class CreateProductUseCase implements IUseCase<CreateProductInputDto, CreateProductOutputDto> {
  private constructor(private readonly productGateway: ProductGateway) {}

  // builder design pattern
  public static create(productGateway: ProductGateway): CreateProductUseCase {
    return new CreateProductUseCase(productGateway)
  }

  async execute(input: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const product = Product.create({
      name: input.name,
      price: input.price
    })

    await this.productGateway.save(product)

    const output = this.presentOutput(product)
    return output
  }

  private presentOutput(product: Product): CreateProductOutputDto {
    const output: CreateProductOutputDto = {
      id: product.id
    }

    return output
  }
}
