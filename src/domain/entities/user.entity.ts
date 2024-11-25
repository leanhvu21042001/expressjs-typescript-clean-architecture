import { EmailValueObject } from '../value-objects/email.value-object'
import { PhoneValueObject } from '../value-objects/phone.value-object'
import { AddressEntity } from './address.entity'
import { RoleEntity } from './role.entity'

export type UserEntityProps = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  id: string
  age: number
  name: string
  gender: string
  username: string
  password: string
  phone: PhoneValueObject | null
  email: EmailValueObject | null
  address: AddressEntity | null
  roles: Array<RoleEntity>
}

export type CreateUserEntityProps = Pick<UserEntityProps, 'age' | 'name' | 'gender' | 'username' | 'password'>

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
  public get gender(): string {
    return this.props.gender
  }
  public get username(): string {
    return this.props.username
  }
  public get password(): string {
    return this.props.password
  }
  public get phone(): PhoneValueObject | null {
    return this.props.phone
  }
  public get email(): EmailValueObject | null {
    return this.props.email
  }
  public get address(): AddressEntity | null {
    return this.props.address
  }
  public get roles(): Array<RoleEntity> {
    return this.props.roles
  }

  static create(props: CreateUserEntityProps): UserEntity {
    const id = crypto.randomUUID().toString()

    return new UserEntity({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      id,
      age: props.age,
      name: props.name,
      gender: props.gender,
      username: props.username,
      password: props.password,
      address: null,
      phone: null,
      email: null,
      roles: [] as RoleEntity[],
    })
  }

  static with(props: UserEntityProps): UserEntity {
    return new UserEntity(props)
  }

  public setRole(role: RoleEntity): void {
    if (this.props.roles?.find((r) => r.id === role.id)) {
      this.roles.push(role)
    }
  }

  public removeRole(roleId: RoleEntity['id']): void {
    this.props.roles = this.props.roles.filter((role) => role.id !== roleId) ?? []
  }

  public setAddress(address: AddressEntity): void {
    this.props.address = address
  }

  public setEmail(email: EmailValueObject): void {
    this.props.email = email
  }

  public delete(): void {
    this.props.deletedAt = new Date()
  }
}
