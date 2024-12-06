import { BlogEntity } from '../entities/blog.entity'

export interface BlogRepository {
  save(blog: BlogEntity): Promise<BlogEntity['id']>
  findById(id: BlogEntity['id']): Promise<BlogEntity | undefined>
  findMany(): Promise<BlogEntity[]>
  delete(id: BlogEntity['id']): Promise<void>
  update(blog: BlogEntity): Promise<BlogEntity>
}
