import { ProductEntity } from '~/domain/entities/product.entity'
import { ProductRepository } from '~/domain/repositories/product.repository'

import { IUseCase } from '../usecase.interface'

export type CreateProductInputDto = {
  name: string
  price: number
}

export type CreateProductOutputDto = {
  id: string
}

export class CreateProductUseCase implements IUseCase<CreateProductInputDto, CreateProductOutputDto> {
  private constructor(private readonly productGateway: ProductRepository) {}

  // builder design pattern
  public static create(productGateway: ProductRepository): CreateProductUseCase {
    return new CreateProductUseCase(productGateway)
  }

  async execute(input: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const product = ProductEntity.create({
      name: input.name,
      price: input.price,
    })

    await this.productGateway.save(product)

    const output = this.presentOutput(product)
    return output
  }

  private presentOutput(product: ProductEntity): CreateProductOutputDto {
    const output: CreateProductOutputDto = {
      id: product.id,
    }

    return output
  }
}
