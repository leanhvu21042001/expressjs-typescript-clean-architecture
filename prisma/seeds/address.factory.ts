import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

export const run = async (prisma: PrismaClient) => {
  const length = 100
  const listAddress = Array.from({ length }).map(() => ({
    city: faker.location.city(),
    country: faker.location.country(),
    state: faker.location.state(),
    street: faker.location.street(),
    zip: faker.location.zipCode(),
  }))

  await prisma.address.createManyAndReturn({
    data: listAddress,
  })
}
