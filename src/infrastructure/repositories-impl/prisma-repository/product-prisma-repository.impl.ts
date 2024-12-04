import { PrismaClient } from '@prisma/client'

import { ProductEntity } from '~/domain/entities/product.entity'
import { ProductRepository } from '~/domain/repositories/product.repository'
import { ProductMapper } from '~/infrastructure/mappers/product.mapper'

export class ProductPrismaRepositoryImpl implements ProductRepository {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new ProductPrismaRepositoryImpl(prismaClient)
  }

  async findById(id: ProductEntity['id']): Promise<ProductEntity | undefined> {
    const product = await this.prismaClient.product.findFirst({
      where: { id: Number(id) },
    })

    return product ? ProductMapper.toDomain(product) : undefined
  }

  public async delete(id: ProductEntity['id']) {
    await this.prismaClient.product.delete({ where: { id: Number(id) } })
  }

  public async update(product: ProductEntity): Promise<ProductEntity> {
    const updatedProduct = await this.prismaClient.product.update({
      where: { id: Number(product.id) },
      data: {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      },
    })

    return ProductMapper.toDomain(updatedProduct)
  }

  public async save(product: ProductEntity): Promise<void> {
    await this.prismaClient.product.create({
      data: {
        id: Number(product.id),
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      },
    })
  }
  public async list(): Promise<ProductEntity[]> {
    const products = await this.prismaClient.product.findMany()

    return products.map((productItem) => {
      return ProductMapper.toDomain(productItem)
    })
  }
}
