import { CreateProductUseCase } from './application/usecases/create-product/create-product.usecase'
import { GetUserByIdUseCase } from './application/usecases/get-user-by-id/get-user-by-id.usecase'
import { ListProductUseCase } from './application/usecases/list-product/list-product.usecase'
import { ApiExpress } from './infrastructure/api/express/api.express'
import { CreateProductRouteExpress } from './infrastructure/api/express/routes/product/create-product.express.route'
import { GetUserByIdRouteExpress } from './infrastructure/api/express/routes/user/get-user-by-id.express.route'
import { ApiFastify } from './infrastructure/api/fastify/api.fastify'
import { ListProductRouteFastify } from './infrastructure/api/fastify/routes/product/list-product.fastify.route'
import { prisma } from './infrastructure/databases/prisma/prisma'
import { ProductPrismaRepositoryImpl } from './infrastructure/repositories-impl/prisma-repository/product-prisma-repository.impl'
import { UserPrismaRepositoryImpl } from './infrastructure/repositories-impl/prisma-repository/user-prisma-repository.impl'

async function main() {
  // repositories
  const productRepository = ProductPrismaRepositoryImpl.create(prisma)
  const userRepository = UserPrismaRepositoryImpl.create(prisma)

  // usecases
  const createProductUseCase = CreateProductUseCase.create(productRepository)
  const listProductUseCase = ListProductUseCase.create(productRepository)

  const getUserByIdUseCase = GetUserByIdUseCase.create(userRepository)

  // routes of express
  const createProductRouteExpress = CreateProductRouteExpress.create(createProductUseCase)
  const userByIdRouteExpress = GetUserByIdRouteExpress.create(getUserByIdUseCase)
  const apiExpress = ApiExpress.create([createProductRouteExpress, userByIdRouteExpress])

  // routes of fastify
  const listProductRouteFastify = ListProductRouteFastify.create(listProductUseCase)
  const fastifyApi = ApiFastify.create([listProductRouteFastify])

  //
  const port = 8000
  apiExpress.start(port)
  fastifyApi.start(port + 1)
}

main()
