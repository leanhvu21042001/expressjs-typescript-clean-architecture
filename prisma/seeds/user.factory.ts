// import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

export class UserFactory {
  static async create(prisma: PrismaClient) {
    // await prisma.user.deleteMany()
    // return prisma.user.create({
    //   data: {
    //     username: faker.internet.userName(),
    //     email: faker.internet.email(),
    //     name: faker.person.fullName(),
    //     password: faker.internet.password(),
    //   },
    // })
  }
}
