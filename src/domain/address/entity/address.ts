export type AddressProps = {
  id: string
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export class Address {
  constructor(private readonly props: AddressProps) {}

  public static create(props: Pick<AddressProps, 'street' | 'city' | 'state' | 'zip' | 'country'>): Address {
    return new Address({
      id: crypto.randomUUID().toString(),
      street: props.street,
      city: props.city,
      state: props.state,
      zip: props.zip,
      country: props.country
    })
  }

  public static with(props: AddressProps) {
    return new Address(props)
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
}
