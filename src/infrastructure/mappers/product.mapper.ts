import { Product as ProductPrisma } from '@prisma/client'

import { ProductEntity } from '~/domain/entities/product.entity'

export class ProductMapper {
  public static toDomain(prismaProduct: ProductPrisma): ProductEntity {
    const id = String(prismaProduct.id)
    return ProductEntity.with({
      id,
      createdAt: prismaProduct.createdAt,
      updatedAt: prismaProduct.updatedAt,
      deletedAt: prismaProduct.deletedAt,
      name: prismaProduct.name,
      price: prismaProduct.price,
      quantity: prismaProduct.quantity,
    })
  }

  public static toPersistence(productEntity: ProductEntity): ProductPrisma {
    const id = Number(productEntity.id)
    return {
      id,
      createdAt: productEntity.createdAt,
      updatedAt: productEntity.updatedAt,
      deletedAt: productEntity.deletedAt ? new Date(productEntity.deletedAt) : null,
      name: productEntity.name,
      price: productEntity.price,
      quantity: productEntity.quantity,
    }
  }
}
