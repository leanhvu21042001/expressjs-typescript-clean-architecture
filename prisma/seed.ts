import { PrismaClient } from '@prisma/client'

// import { PostFactory } from './seeds/post.factory'
// import { ProfileFactory } from './seeds/profile.factory'
// import { UserFactory } from './seeds/user.factory'

// initialize Prisma Client
const prisma = new PrismaClient()

async function main() {
  // const user = await UserFactory.create(prisma)
  // const profile = await ProfileFactory.create(prisma, { userId: user.id })
  // const posts = await PostFactory.createMany(prisma, { authorId: user.id })
  // console.log({ user, profile, posts })
}

// execute the main function
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect()
  })
