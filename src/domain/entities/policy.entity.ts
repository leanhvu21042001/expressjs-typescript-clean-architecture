import { ResourceEntity } from './resource.entity'
import { UserEntity } from './user.entity'

type PolicyEntityCondition = (user: UserEntity, resource: ResourceEntity) => boolean
export type PolicyEntityProps = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  condition: PolicyEntityCondition
}

export class PolicyEntity {
  private constructor(private readonly props: PolicyEntityProps) {}

  public static create(props: Pick<PolicyEntityProps, 'name' | 'condition'>): PolicyEntity {
    return new PolicyEntity({
      id: crypto.randomUUID().toString(),
      name: props.name,
      condition: props.condition,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })
  }

  public evaluate(user: UserEntity, resource: ResourceEntity): boolean {
    return this.props.condition(user, resource)
  }

  public static with(props: PolicyEntityProps): PolicyEntity {
    return new PolicyEntity(props)
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
