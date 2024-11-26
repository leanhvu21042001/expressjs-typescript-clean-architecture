import { PrismaClient } from '@prisma/client'
import { readdir } from 'fs'

// initialize Prisma Client
const prisma = new PrismaClient()

async function main() {
  readdir('./prisma/seeds', { withFileTypes: true, encoding: 'utf8', recursive: false }, (err, files) => {
    if (err) {
      console.error(err)
      return
    }

    files
      .filter((file) => file.isFile() && file.name.endsWith('.ts'))
      .forEach((file) => {
        import(`./seeds/${file.name}`).then((module) => {
          const func = module.run
          if (typeof func === 'function') {
            func(prisma).finally(() => {
              console.log(`Done seeding ${file.name}`)
            })
          }
        })
      })
  })
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
