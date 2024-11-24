export type ScopeEntityProps = {
  id: string
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export class ScopeEntity {
  private constructor(private readonly props: ScopeEntityProps) {}

  public static create(props: Pick<ScopeEntityProps, 'name' | 'description'>): ScopeEntity {
    return new ScopeEntity({
      id: crypto.randomUUID().toString(),
      name: props.name,
      description: props.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })
  }

  public static with(props: ScopeEntityProps): ScopeEntity {
    return new ScopeEntity(props)
  }

  public get id(): string {
    return this.props.id
  }

  public get name(): string {
    return this.props.name
  }

  public get description(): string | null {
    return this.props.description
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date {
    return this.props.updatedAt
  }

  public get deletedAt(): Date | null {
    return this.props.deletedAt
  }
}
