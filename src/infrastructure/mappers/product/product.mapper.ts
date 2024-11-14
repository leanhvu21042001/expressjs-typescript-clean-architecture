import { Product as ProductPrisma } from '@prisma/client'

import { ProductEntity } from '~/domain/product/entity/product'

export class ProductMapper {
  public static toDomain(prismaProduct: ProductPrisma): ProductEntity {
    return ProductEntity.with({
      id: prismaProduct.id,
      name: prismaProduct.name,
      createdAt: prismaProduct.createdAt,
      updatedAt: prismaProduct.updatedAt,
      deletedAt: prismaProduct.deletedAt,
      price: prismaProduct.price,
      quantity: prismaProduct.quantity,
    })
  }

  public static toPersistence(productEntity: ProductEntity): ProductPrisma {
    return {
      id: productEntity.id,
      name: productEntity.name,
      price: productEntity.price,
      quantity: productEntity.quantity,
      createdAt: productEntity.createdAt,
      updatedAt: productEntity.updatedAt,
      deletedAt: productEntity.deletedAt ? new Date(productEntity.deletedAt) : null,
    }
  }
}
