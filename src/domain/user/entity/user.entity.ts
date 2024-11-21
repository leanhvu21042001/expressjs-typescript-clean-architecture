import { AddressEntity } from '~/domain/address/entity/address'

export type UserEntityProps = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  id: string
  age: number
  name: string
  phone: string
  email: string
  gender: string
  address: AddressEntity | null
  username: string
  password: string
}

export class UserEntity {
  private constructor(private readonly props: UserEntityProps) {}

  get id(): string {
    return this.props.id
  }

  get age(): number {
    return this.props.age
  }

  get name(): string {
    return this.props.name
  }

  get phone(): string {
    return this.props.phone
  }

  get address(): AddressEntity | null {
    return this.props.address || null
  }

  get email(): string {
    return this.props.email
  }

  get gender(): string {
    return this.props.email
  }

  get username(): string {
    return this.props.username
  }

  get password(): string {
    return this.props.password
  }

  public get updatedAt() {
    return this.props.updatedAt
  }

  public get createdAt() {
    return this.props.createdAt
  }

  public get deletedAt() {
    return this.props.deletedAt
  }

  static create(
    props: Pick<UserEntityProps, 'age' | 'name' | 'phone' | 'address' | 'email' | 'gender' | 'username' | 'password'>,
  ): UserEntity {
    return new UserEntity({
      id: crypto.randomUUID().toString(),
      age: props.age,
      name: props.name,
      phone: props.phone,
      gender: props.gender,
      address: props?.address || null,
      email: props.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      username: props.username,
      password: props.password,
    })
  }

  static with(props: UserEntityProps): UserEntity {
    return new UserEntity(props)
  }
}
