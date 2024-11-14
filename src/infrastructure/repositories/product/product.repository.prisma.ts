import { PrismaClient } from '@prisma/client'

import { ProductEntity } from '~/domain/product/entity/product'
import { ProductGateway } from '~/domain/product/gateway/product.gateway'
import { ProductMapper } from '~/infrastructure/mappers/product/product.mapper'

export class ProductRepositoryPrisma implements ProductGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient)
  }

  async findById(id: ProductEntity['id']): Promise<ProductEntity | undefined> {
    const product = await this.prismaClient.product.findFirst({
      where: { id }
    })

    return product ? ProductMapper.toDomain(product) : undefined
  }

  public async delete(id: ProductEntity['id']) {
    await this.prismaClient.product.delete({ where: { id: id } })
  }

  public async update(product: ProductEntity): Promise<ProductEntity> {
    const updatedProduct = await this.prismaClient.product.update({
      where: { id: product.id },
      data: {
        name: product.name,
        price: product.price,
        quantity: product.quantity
      }
    })

    return ProductMapper.toDomain(updatedProduct)
  }

  public async save(product: ProductEntity): Promise<void> {
    await this.prismaClient.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      }
    })
  }
  public async list(): Promise<ProductEntity[]> {
    const products = await this.prismaClient.product.findMany()

    return products.map((productItem) => {
      return ProductMapper.toDomain(productItem)
    })
  }
}
