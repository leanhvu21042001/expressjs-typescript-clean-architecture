import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

export class PostFactory {
  static async createMany(prisma: PrismaClient, params: { authorId: number }) {
    await prisma.post.deleteMany()
    return prisma.post.createManyAndReturn({
      data: [
        {
          createdAt: faker.defaultRefDate(),
          updatedAt: faker.defaultRefDate(),
          title: faker.lorem.paragraphs(1),
          content: faker.lorem.paragraphs(3),
          published: false,
          authorId: params.authorId
        }
      ]
    })
  }
}
