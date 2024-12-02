import { UserEntity } from '../entities/user.entity'

export interface UserRepository {
  save(user: UserEntity): Promise<UserEntity>
  findById(id: string): Promise<UserEntity | undefined>
  findByUsername(username: UserEntity['username']): Promise<UserEntity | undefined>
  findByEmail(email: UserEntity['email']): Promise<UserEntity | undefined>
  findByPhoneNumber(phone: UserEntity['phone']): Promise<UserEntity | undefined>
  findAll(): Promise<UserEntity[]>
  delete(id: string): Promise<void>
  update(user: UserEntity): Promise<void>
}
