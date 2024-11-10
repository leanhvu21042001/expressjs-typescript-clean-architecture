export type ProductProps = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  id: string
  name: string
  price: number
  quantity: number
}

export class Product {
  private constructor(private readonly props: ProductProps) {}

  public static create(props: Pick<ProductProps, 'name' | 'price'>): Product {
    return new Product({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      id: crypto.randomUUID().toString(),
      name: props.name,
      price: props.price,
      quantity: 0
    })
  }

  public static with(props: ProductProps) {
    return new Product(props)
  }

  public get id() {
    return this.props.id
  }

  public get createdAt() {
    return this.props.createdAt
  }

  public get updatedAt() {
    return this.props.updatedAt
  }

  public get deletedAt() {
    return this.props.deletedAt
  }

  public get name() {
    return this.props.name
  }

  public get price() {
    return this.props.price
  }

  public get quantity() {
    return this.props.quantity
  }

  public update(props: Partial<ProductProps>) {
    this.props.updatedAt = new Date()
    Object.assign(this.props, props)
  }

  public delete() {
    this.props.deletedAt = new Date()
  }

  public increaseQuantity(quantity: number) {
    this.props.quantity += quantity
  }

  public decreaseQuantity(quantity: number) {
    this.props.quantity -= quantity
  }
}
