import { ProductEntity } from '../entity/product'

export interface ProductGateway {
  save(product: ProductEntity): Promise<void>
  findById(id: ProductEntity['id']): Promise<ProductEntity | undefined>
  list(): Promise<ProductEntity[]>
  delete(id: ProductEntity['id']): Promise<void>
  update(product: ProductEntity): Promise<ProductEntity>
}
