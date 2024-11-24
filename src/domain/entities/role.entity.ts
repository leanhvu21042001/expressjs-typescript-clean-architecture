import { PermissionEntity } from './permission.entity'

export type RoleEntityProps = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  name: string
  permissions: Array<PermissionEntity>
}

export class RoleEntity {
  private constructor(private readonly props: RoleEntityProps) {}

  public static create(props: Pick<RoleEntityProps, 'name' | 'permissions'>): RoleEntity {
    return new RoleEntity({
      id: crypto.randomUUID().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      name: props.name,
      permissions: props.permissions,
    })
  }

  public static with(props: RoleEntityProps): RoleEntity {
    return new RoleEntity(props)
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

  assignPermission(permission: PermissionEntity): void {
    if (!this.props.permissions.find((p) => p.id === permission.id)) {
      this.props.permissions.push(permission)
    }
  }

  getPermissions(): Array<PermissionEntity> {
    return this.props.permissions
  }
}
