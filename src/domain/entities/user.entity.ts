import { AddressEntity } from '~/domain/entities/address.entity'

import { EmailValueObject } from '../value-objects/email.value-object'
import { PhoneValueObject } from '../value-objects/phone.value-object'
import { RoleEntity } from './role.entity'

export type UserEntityProps = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  id: string
  age: number
  name: string
  phone: PhoneValueObject
  email: EmailValueObject
  gender: string
  address: AddressEntity | null
  username: string
  password: string
  roles: Array<RoleEntity>
}

export class UserEntity {
  private constructor(private readonly props: UserEntityProps) {}

  public get createdAt(): Date {
    return this.props.createdAt
  }
  public get updatedAt(): Date {
    return this.props.updatedAt
  }
  public get deletedAt(): Date | null {
    return this.props.deletedAt
  }
  public get id(): string {
    return this.props.id
  }
  public get age(): number {
    return this.props.age
  }
  public get name(): string {
    return this.props.name
  }
  public get phone(): PhoneValueObject {
    return this.props.phone
  }
  public get email(): EmailValueObject {
    return this.props.email
  }
  public get gender(): string {
    return this.props.gender
  }
  public get address(): AddressEntity | null {
    return this.props.address
  }
  public get username(): string {
    return this.props.username
  }
  public get password(): string {
    return this.props.password
  }
  public get roles(): Array<RoleEntity> {
    return this.props.roles
  }

  static create(
    props: Pick<
      UserEntityProps,
      'age' | 'name' | 'phone' | 'address' | 'email' | 'gender' | 'username' | 'password' | 'roles'
    >,
  ): UserEntity {
    return new UserEntity({
      id: crypto.randomUUID().toString(),
      age: props.age,
      name: props.name,
      phone: props.phone,
      gender: props.gender,
      address: props.address,
      email: props.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      username: props.username,
      password: props.password,
      roles: props.roles,
    })
  }

  static with(props: UserEntityProps): UserEntity {
    return new UserEntity(props)
  }

  public assignRole(role: RoleEntity): void {
    if (this.props.roles?.find((r) => r.id === role.id)) {
      this.roles.push(role)
    }
  }

  public removeRole(roleId: RoleEntity['id']): void {
    this.props.roles = this.props.roles.filter((role) => role.id !== roleId) ?? []
  }

  // verifyPassword(password: string): boolean {
  //   // Example of domain-specific business logic (requires bcrypt or similar)
  //   return true // Replace with actual hash comparison logic
  // }
}
