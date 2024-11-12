export type ProductEntityProps = {
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
  id: string

  name: string
  price: number
  quantity: number
}

export class ProductEntity {
  // make sure constructor and properties are private to prevent direct modification
  private constructor(private readonly props: ProductEntityProps) {}

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

  public static create(props: Pick<ProductEntityProps, 'name' | 'price'>): ProductEntity {
    return new ProductEntity({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      id: crypto.randomUUID().toString(),
      name: props.name,
      price: props.price,
      quantity: 0
    })
  }

  public static with(props: ProductEntityProps) {
    return new ProductEntity(props)
  }

  public update(props: Partial<ProductEntityProps>) {
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
