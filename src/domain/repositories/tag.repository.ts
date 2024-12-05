import { TagEntity } from '../entities/tag.entity'

export interface TagRepository {
  save(tag: TagEntity): Promise<void>
  findById(id: TagEntity['id']): Promise<TagEntity | undefined>
  list(): Promise<TagEntity[]>
  delete(id: TagEntity['id']): Promise<void>
  update(tag: TagEntity): Promise<TagEntity>
}
