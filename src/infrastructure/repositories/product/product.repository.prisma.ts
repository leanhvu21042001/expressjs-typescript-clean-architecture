import { PrismaClient } from '@prisma/client'

import { ProductEntity } from '~/domain/product/entity/product'
import { ProductGateway } from '~/domain/product/gateway/product.gateway'

export class ProductRepositoryPrisma implements ProductGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  async findById(id: ProductEntity['id']): Promise<ProductEntity | undefined> {
    const product = await this.prismaClient.product.findFirst({
      where: { id: id }
    })

    return product
      ? ProductEntity.with({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          deletedAt: product.deletedAt
        })
      : undefined
  }

  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient)
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

    return ProductEntity.with({
      id: updatedProduct.id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      quantity: updatedProduct.quantity,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
      deletedAt: updatedProduct.deletedAt
    })
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
    const productList = products.map((productItem) => {
      const product = ProductEntity.with({
        id: productItem.id,
        name: productItem.name,
        price: productItem.price,
        quantity: productItem.quantity,
        createdAt: productItem.createdAt,
        updatedAt: productItem.updatedAt,
        deletedAt: productItem.deletedAt
      })

      return product
    })
    return productList
  }
}
