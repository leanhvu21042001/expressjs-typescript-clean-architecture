export type AddressEntityProps = {
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
  id: string
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export class AddressEntity {
  constructor(private readonly props: AddressEntityProps) {}

  public static create(
    props: Pick<AddressEntityProps, 'street' | 'city' | 'state' | 'zip' | 'country'>
  ): AddressEntity {
    return new AddressEntity({
      id: crypto.randomUUID().toString(),
      street: props.street,
      city: props.city,
      state: props.state,
      zip: props.zip,
      country: props.country,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    })
  }

  public static with(props: AddressEntityProps) {
    return new AddressEntity(props)
  }

  public get id() {
    return this.props.id
  }

  public get street() {
    return this.props.street
  }

  public get city() {
    return this.props.city
  }

  public get state() {
    return this.props.state
  }

  public get zip() {
    return this.props.zip
  }

  public get country() {
    return this.props.country
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
}
