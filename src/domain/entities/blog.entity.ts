import { TagEntity } from './tag.entity'

export type BlogEntityProps = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  id: string
  title: string
  summary: string
  content: string
  draft: boolean
  tags: TagEntity[]
}

export type CreateBlogEntityProps = Omit<BlogEntityProps, 'createdAt' | 'updatedAt' | 'deletedAt' | 'id'>

export class BlogEntity {
  constructor(private readonly props: BlogEntityProps) {}

  public static create(props: CreateBlogEntityProps): BlogEntity {
    return new BlogEntity({
      id: crypto.randomUUID().toString(),
      title: props.title,
      summary: props.summary,
      content: props.content,
      draft: props.draft,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })
  }

  public static with(props: BlogEntityProps) {
    return new BlogEntity(props)
  }

  public get id() {
    return this.props.id
  }

  public get title() {
    return this.props.title
  }

  public get summary() {
    return this.props.summary
  }

  public get content() {
    return this.props.content
  }

  public get draft() {
    return this.props.draft
  }

  public get tags() {
    return this.props.tags
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

  public addTag(tag: TagEntity) {
    this.props.tags.push(tag)
    this.props.updatedAt = new Date()
  }

  public removeTag(tag: TagEntity) {
    this.props.tags = this.props.tags.filter((t) => t.id !== tag.id)
    this.props.updatedAt = new Date()
  }
}
