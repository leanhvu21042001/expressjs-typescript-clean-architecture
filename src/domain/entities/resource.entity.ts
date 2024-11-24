export type ResourceEntityProps = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export class ResourceEntity {
  private constructor(private readonly props: ResourceEntityProps) {}

  public static create(props: Pick<ResourceEntityProps, 'name'>): ResourceEntity {
    return new ResourceEntity({
      id: crypto.randomUUID().toString(),
      name: props.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })
  }

  public static with(props: ResourceEntityProps): ResourceEntity {
    return new ResourceEntity(props)
  }

  public get id(): string {
    return this.props.id
  }

  public get name(): string {
    return this.props.name
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
