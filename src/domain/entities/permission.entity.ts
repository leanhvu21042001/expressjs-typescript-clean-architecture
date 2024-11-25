import { ResourceEntity } from './resource.entity'
import { ScopeEntity } from './scope.entity'

export type PermissionEntityProps = {
  id: string
  name: string
  resource: ResourceEntity // e.g., /users, /products, /orders, etc.
  scope: ScopeEntity // e.g., READ, WRITE, DELETE, ALL, etc.
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export class PermissionEntity {
  private constructor(private readonly props: PermissionEntityProps) {}

  public static create(props: Pick<PermissionEntityProps, 'name' | 'resource' | 'scope'>): PermissionEntity {
    return new PermissionEntity({
      id: crypto.randomUUID().toString(),
      name: props.name,
      resource: props.resource,
      scope: props.scope,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })
  }

  public static with(props: PermissionEntityProps): PermissionEntity {
    return new PermissionEntity(props)
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

  public get resource(): ResourceEntity {
    return this.props.resource
  }

  public get scope(): ScopeEntity {
    return this.props.scope
  }

  public setResource(resource: ResourceEntity): void {
    this.props.resource = resource
  }

  public setScope(scope: ScopeEntity): void {
    this.props.scope = scope
  }
}
