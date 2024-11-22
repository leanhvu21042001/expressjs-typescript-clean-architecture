import { UserEntity } from '../entities/user.entity.entity'

export interface UserGateway {
  save(user: UserEntity): Promise<UserEntity>
  findById(id: string): Promise<UserEntity | undefined>
  findByUsername(username: UserEntity['username']): Promise<UserEntity | undefined>
  findAll(): Promise<UserEntity[]>
  delete(id: string): Promise<void>
  update(user: UserEntity): Promise<void>
}
