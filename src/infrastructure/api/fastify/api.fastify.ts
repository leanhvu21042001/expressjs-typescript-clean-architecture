import Fastify, { FastifyInstance } from 'fastify'

import { IApi } from '../api.interface'
import { IRouteFastify } from './routes/route.fastify.interface'

export class ApiFastify implements IApi {
  private app: FastifyInstance

  private constructor(routes: IRouteFastify[]) {
    this.app = Fastify({ logger: true })
    this.addRoutes(routes)
  }

  public static create(routes: IRouteFastify[]) {
    return new ApiFastify(routes)
  }

  public async start(port: number): Promise<void> {
    try {
      await this.app.listen({ port })
      this.listRoutes()
    } catch (error) {
      this.app.log.error(error)
      process.exit(1)
    }
  }

  private addRoutes(routes: IRouteFastify[]) {
    routes.forEach((route) => {
      const path = route.getPath()
      const method = route.getMethod()
      const handler = route.getHandler()

      this.app[method](path, handler)
    })
  }

  private listRoutes() {
    const routes = this.app.printRoutes()
    return routes
  }
}
