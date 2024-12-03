export type TagEntityProps = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  id: string
  title: string
}

export type CreateTagEntityProps = Omit<TagEntityProps, 'createdAt' | 'updatedAt' | 'deletedAt' | 'id'>

export class TagEntity {
  constructor(private readonly props: TagEntityProps) {}

  public static create(props: CreateTagEntityProps): TagEntity {
    return new TagEntity({
      id: crypto.randomUUID().toString(),
      title: props.title,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })
  }

  public static with(props: TagEntityProps) {
    return new TagEntity(props)
  }

  public get id() {
    return this.props.id
  }

  public get title() {
    return this.props.title
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
