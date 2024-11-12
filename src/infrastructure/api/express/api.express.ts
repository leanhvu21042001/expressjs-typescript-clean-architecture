import express, { Express, NextFunction } from 'express'

import { IApi } from '../api.interface'
import { IRouteExpress } from './routes/route.express.interface'

type TApRouterStack = {
  route: {
    path: string
    stack: { method: string }[]
  }
}

export class ApiExpress implements IApi {
  private app: Express

  private constructor(routes: IRouteExpress[]) {
    this.app = express()

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    this.addRoutes(routes)

    this.app.use('*', (req, res, next) => {
      next(new Error('Not found'))
    })

    this.app.use((err: Error, req: express.Request, res: express.Response) => {
      res.status(404).json({ message: err.message })
      return
    })
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
      this.listRoutes()
    })
  }

  private listRoutes() {
    const routes = (this.app._router.stack as TApRouterStack[])
      .filter((route) => route.route)
      .map((route) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method.toUpperCase()
        }
      })

    console.log(routes)
  }
}
