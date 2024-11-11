export interface IUseCase<TInputDto, TOutputDto> {
  execute(input: TInputDto): Promise<TOutputDto>
}
