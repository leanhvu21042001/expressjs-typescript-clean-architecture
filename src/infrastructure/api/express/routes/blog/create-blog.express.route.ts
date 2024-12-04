import { CreateBlogInputDto, CreateBlogUseCase } from '~/application/usecases/create-blog/create-blog.usecase'

import { HttpMethod, IRouteExpress, TExpressRequest, TExpressResponse } from '../route.express.interface'

export type CreateBlogResponseDto = {
  id: string
}
export class CreateBlogRouteExpress implements IRouteExpress {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly CreateBlogService: CreateBlogUseCase,
  ) {}

  public static create(CreateBlogService: CreateBlogUseCase) {
    return new CreateBlogRouteExpress('/blogs', HttpMethod.POST, CreateBlogService)
  }
  public getHandler(): (request: TExpressRequest, response: TExpressResponse) => Promise<void> {
    return async (request: TExpressRequest, response: TExpressResponse) => {
      const { title, content, summary, draft, tags } = request.body

      const input: CreateBlogInputDto = {
        title,
        content,
        summary,
        draft,
        tags,
      }

      const output: CreateBlogResponseDto = await this.CreateBlogService.execute(input)
      const responseBody = this.present(output)
      response.status(201).json(responseBody).send()
    }
  }
  public getPath(): string {
    return this.path
  }
  public getMethod(): HttpMethod {
    return this.method
  }

  private present(input: CreateBlogResponseDto): CreateBlogResponseDto {
    const response = { id: input.id }
    return response
  }
}
