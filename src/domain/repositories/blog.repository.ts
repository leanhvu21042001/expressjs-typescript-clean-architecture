import { BlogEntity } from '../entities/blog.entity'

export interface BlogRepository {
  save(blog: BlogEntity): Promise<void>
  findById(id: BlogEntity['id']): Promise<BlogEntity | undefined>
  list(): Promise<BlogEntity[]>
  delete(id: BlogEntity['id']): Promise<void>
  update(blog: BlogEntity): Promise<BlogEntity>
}
