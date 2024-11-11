import { Address } from '../entity/address'

export interface AddressGateway {
  save(address: Address): Promise<void>
  findById(id: string): Promise<Address | undefined>
  findAll(): Promise<Address[]>
  delete(id: string): Promise<void>
  update(id: string, address: Address): Promise<void>
}
