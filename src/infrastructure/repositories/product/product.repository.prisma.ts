import { PrismaClient } from '@prisma/client'

import { ProductGateway } from '~/domain/gateway/product.gateway'
import { Product } from '~/domain/product/entity/product'

export class ProductRepositoryPrisma implements ProductGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient)
  }

  public async delete(id: Product['id']) {
    await this.prismaClient.product.delete({ where: { id: id } })
  }

  public async update(product: Product): Promise<Product> {
    const updatedProduct = await this.prismaClient.product.update({
      where: { id: product.id },
      data: {
        name: product.name,
        price: product.price,
        quantity: product.quantity
      }
    })

    return Product.with({
      id: updatedProduct.id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      quantity: updatedProduct.quantity,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
      deletedAt: updatedProduct.deletedAt
    })
  }

  public async save(product: Product): Promise<void> {
    await this.prismaClient.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      }
    })
  }
  public async list(): Promise<Product[]> {
    const products = await this.prismaClient.product.findMany()
    const productList = products.map((productItem) => {
      const product = Product.with({
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
