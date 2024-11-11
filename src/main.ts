import { CreateProductUseCase } from './application/usecases/create-product/create-product.usecase'
import { ListProductUseCase } from './application/usecases/list-product/list-product.usecase'
import { ApiExpress } from './infrastructure/api/express/api.express'
import { CreateProductRouteExpress } from './infrastructure/api/express/routes/product/create-product.express.route'
import { ApiFastify } from './infrastructure/api/fastify/api.fastify'
import { ListProductRouteFastify } from './infrastructure/api/fastify/routes/product/list-product.fastify.route'
import { prisma } from './infrastructure/database/prisma/prisma'
import { ProductRepositoryPrisma } from './infrastructure/repositories/product/product.repository.prisma'

async function main() {
  // repositories
  const productRepository = ProductRepositoryPrisma.create(prisma)

  // usecases
  const createProductUseCase = CreateProductUseCase.create(productRepository)
  const listProductUseCase = ListProductUseCase.create(productRepository)

  // routes of express
  const createProductRouteExpress = CreateProductRouteExpress.create(createProductUseCase)
  const apiExpress = ApiExpress.create([createProductRouteExpress])

  // routes of fastify
  const listProductRouteFastify = ListProductRouteFastify.create(listProductUseCase)
  const fastifyApi = ApiFastify.create([listProductRouteFastify])

  //
  const port = 8000
  apiExpress.start(port)
  fastifyApi.start(port + 1)
}

main()
