import { AddressEntity } from '~/domain/entities/address.entity'

export type UserEntityProps = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  id: string
  age: number
  name: string
  phone: string | null
  email: string | null
  gender: string
  address: AddressEntity | null
  username: string
  password: string
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
  public get phone(): string | null {
    return this.props.phone
  }
  public get email(): string | null {
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

  static create(
    props: Pick<UserEntityProps, 'age' | 'name' | 'phone' | 'address' | 'email' | 'gender' | 'username' | 'password'>,
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
    })
  }

  static with(props: UserEntityProps): UserEntity {
    return new UserEntity(props)
  }
}
