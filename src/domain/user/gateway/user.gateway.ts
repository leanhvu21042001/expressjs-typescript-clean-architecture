import { User } from '../entity/user'

export interface UserGateway {
  save(user: User): Promise<User['id']>
  findById(id: string): Promise<User | undefined>
  findAll(): Promise<User[]>
  delete(id: string): Promise<void>
  update(user: User): Promise<void>
}
