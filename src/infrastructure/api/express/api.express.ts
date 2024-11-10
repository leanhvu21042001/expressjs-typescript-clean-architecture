import express, { Express } from 'express'

import { IApi } from '../api.interface'
import { IRouteExpress } from './routes/route.express.interface'

export class ApiExpress implements IApi {
  private app: Express

  private constructor(routes: IRouteExpress[]) {
    this.app = express()

    this.app.use(express.json())
    this.addRoutes(routes)
  }

  public static create(routes: IRouteExpress[]) {
    return new ApiExpress(routes)
  }

  private addRoutes(routes: IRouteExpress[]) {
    routes.forEach((route) => {
      const path = route.getPath()
      const method = route.getMethod()
      const handler = route.getHandler()

      this.app[method](path, handler)
    })
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
      this.listRoutes()
    })
  }

  private listRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((route: any) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method.toUpperCase()
        }
      })

    console.log(routes)
  }
}
