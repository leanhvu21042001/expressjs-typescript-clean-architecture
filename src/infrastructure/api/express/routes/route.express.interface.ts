import { NextFunction, Request, Response } from 'express'

export type HttpMethod = 'get' | 'post'

export const HttpMethod = {
  GET: 'get' as HttpMethod,
  POST: 'post' as HttpMethod,
} as const

export type TExpressRequest = Request
export type TExpressResponse = Response
export type TExpressNextFunction = NextFunction

export interface IRouteExpress {
  getHandler(): (request: TExpressRequest, response: TExpressResponse, next: TExpressNextFunction) => Promise<void>
  getPath(): string
  getMethod(): HttpMethod
}
