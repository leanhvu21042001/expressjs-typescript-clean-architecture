import { AddressEntity } from '../entities/address.entity'

export interface AddressGateway {
  save(address: AddressEntity): Promise<AddressEntity>
  findById(id: string): Promise<AddressEntity | undefined>
  findAll(): Promise<AddressEntity[]>
  delete(id: string): Promise<void>
  update(id: string, address: AddressEntity): Promise<void>
}
