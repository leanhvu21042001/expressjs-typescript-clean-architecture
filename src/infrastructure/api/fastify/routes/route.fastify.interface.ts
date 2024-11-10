export type HttpMethod = 'get' | 'post'

export const HttpMethod = {
  GET: 'get' as HttpMethod,
  POST: 'post' as HttpMethod
} as const

export type TFastifyRequest = import('fastify').FastifyRequest
export type TFastifyResponse = import('fastify').FastifyReply

export interface IRouteFastify {
  getHandler(): (request: TFastifyRequest, response: TFastifyResponse) => Promise<void>
  getPath(): string
  getMethod(): HttpMethod
}
