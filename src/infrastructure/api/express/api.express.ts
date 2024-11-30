import express from 'express'

import { BaseException, NotFoundException } from '~/infrastructure/exceptions/exceptions'
import { ENV } from '~/shared/env.shared'

import { IApi } from '../api.interface'
import {
  IRouteExpress,
  TExpressNextFunction,
  TExpressRequest,
  TExpressResponse,
} from './routes/route.express.interface'

type TApRouterStack = {
  route: {
    path: string
    stack: { method: string }[]
  }
}

export class ApiExpress implements IApi {
  private app: express.Application

  private constructor(routes: IRouteExpress[]) {
    this.app = express()
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    this.addRoutes(routes)
  }

  public static create(routes: IRouteExpress[]) {
    return new ApiExpress(routes)
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      this.displayRoutes()
    })
  }

  private addRoutes(routes: IRouteExpress[]) {
    routes.forEach((route) => {
      const path = route.getPath()
      const method = route.getMethod()
      const handler = route.getHandler()

      this.app[method](path, this.catchAsync(handler))
    })

    this.app.use('*', (req, res, next) => {
      next(new NotFoundException('not found'))
    })

    this.app.use(
      (error: Error | BaseException, req: TExpressRequest, res: TExpressResponse, next: TExpressNextFunction) => {
        if (ENV.NODE_ENV === 'production') {
          delete error.stack
        }

        console.log('LAVDEV Error:', error)

        if (error instanceof BaseException) {
          res.status(error.statusCode).json(error)
          return
        }

        res.status(500).json({ message: 'Something went wrong' })
        return
      },
    )
  }

  private displayRoutes() {
    const routes = (this.app._router.stack as TApRouterStack[])
      .filter((route) => route.route)
      .map((route) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method.toUpperCase(),
        }
      })

    console.log(routes)
  }

  private catchAsync(fn: (req: TExpressRequest, res: TExpressResponse, next: TExpressNextFunction) => Promise<void>) {
    return (req: TExpressRequest, res: TExpressResponse, next: TExpressNextFunction) => {
      fn(req, res, next).catch(next)
    }
  }
}
