// import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

export class ProfileFactory {
  static async create(prisma: PrismaClient, params: { userId: number }) {
    // await prisma.profile.deleteMany()
    // return await prisma.profile.create({
    //   data: {
    //     userId: params.userId,
    //     bio: faker.lorem.sentence(),
    //   },
    // })
  }
}
