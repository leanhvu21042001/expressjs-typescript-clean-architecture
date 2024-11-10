export interface IApi {
  start(port: number): Promise<void> | void
}
