import { Address } from '~/domain/address/entity/address'

export type UserProps = {
  id: string
  age: number
  name: string
  phone: string
  address: Address
  email: string
}

export class User {
  private constructor(private readonly props: UserProps) {}

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

  get address(): Address {
    return this.props.address
  }

  get email(): string {
    return this.props.email
  }

  static create(props: Pick<UserProps, 'age' | 'name' | 'phone' | 'address' | 'email'>): User {
    return new User({
      id: crypto.randomUUID().toString(),
      age: props.age,
      name: props.name,
      phone: props.phone,
      address: props.address,
      email: props.email
    })
  }

  static with(props: UserProps): User {
    return new User(props)
  }
}
