import { CreateBlogUseCase } from './application/usecases/create-blog/create-blog.usecase'
import { CreateProductUseCase } from './application/usecases/create-product/create-product.usecase'
import { GetUserByIdUseCase } from './application/usecases/get-user-by-id/get-user-by-id.usecase'
import { ListProductUseCase } from './application/usecases/list-product/list-product.usecase'
import { LoginUseCase } from './application/usecases/login/login.usecase'
import { RefreshTokenUseCase } from './application/usecases/refresh-token/refresh-token.usecase'
import { RegisterUseCase } from './application/usecases/register/register.usecase'
import { ApiExpress } from './infrastructure/api/express/api.express'
import { LoginRouteExpress } from './infrastructure/api/express/routes/auth/login.express.route'
import { RefreshRouteExpress } from './infrastructure/api/express/routes/auth/refresh.express.route'
import { RegisterRouteExpress } from './infrastructure/api/express/routes/auth/register.express.route'
import { CreateBlogRouteExpress } from './infrastructure/api/express/routes/blog/create-blog.express.route'
import { CreateProductRouteExpress } from './infrastructure/api/express/routes/product/create-product.express.route'
import { GetUserByIdRouteExpress } from './infrastructure/api/express/routes/user/get-user-by-id.express.route'
import { ApiFastify } from './infrastructure/api/fastify/api.fastify'
import { ListProductRouteFastify } from './infrastructure/api/fastify/routes/product/list-product.fastify.route'
import { prisma } from './infrastructure/database/prisma/prisma'
import { BlogPrismaRepositoryImpl } from './infrastructure/repositories-impl/prisma-repository/blog-prisma-repository.impl'
import { ProductPrismaRepositoryImpl } from './infrastructure/repositories-impl/prisma-repository/product-prisma-repository.impl'
import { UserPrismaRepositoryImpl } from './infrastructure/repositories-impl/prisma-repository/user-prisma-repository.impl'

async function main() {
  // repositories
  const productRepository = ProductPrismaRepositoryImpl.create(prisma)
  const userRepository = UserPrismaRepositoryImpl.create(prisma)
  const blogRepository = BlogPrismaRepositoryImpl.create(prisma)

  // usecases
  const createProductUseCase = CreateProductUseCase.create(productRepository)
  const listProductUseCase = ListProductUseCase.create(productRepository)
  const getUserByIdUseCase = GetUserByIdUseCase.create(userRepository)
  const loginUseCase = LoginUseCase.create(userRepository)
  const registerUseCase = RegisterUseCase.create(userRepository)
  const refreshTokenUseCase = RefreshTokenUseCase.create(userRepository)
  const createBlogUseCase = CreateBlogUseCase.create(blogRepository)

  // routes of express
  const createProductRouteExpress = CreateProductRouteExpress.create(createProductUseCase)
  const userByIdRouteExpress = GetUserByIdRouteExpress.create(getUserByIdUseCase)
  const loginRouteExpress = LoginRouteExpress.create(loginUseCase)
  const registerRouteExpress = RegisterRouteExpress.create(registerUseCase)
  const refreshRouteExpress = RefreshRouteExpress.create(refreshTokenUseCase)
  const createBlogRouteExpress = CreateBlogRouteExpress.create(createBlogUseCase)

  const apiExpress = ApiExpress.create([
    createProductRouteExpress,
    userByIdRouteExpress,
    loginRouteExpress,
    registerRouteExpress,
    createBlogRouteExpress,
    refreshRouteExpress,
  ])

  // routes of fastify
  const listProductRouteFastify = ListProductRouteFastify.create(listProductUseCase)
  const fastifyApi = ApiFastify.create([listProductRouteFastify])

  //
  const port = 8000
  apiExpress.start(port)
  fastifyApi.start(port + 1)
}

main()
