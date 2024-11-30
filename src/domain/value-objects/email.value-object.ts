import { BadRequestException } from '~/infrastructure/exceptions/exceptions'

export class EmailValueObject {
  private readonly _email: string

  public get email(): string {
    return this._email
  }

  private constructor(email: string) {
    this._email = email
  }

  public static create(email: string): EmailValueObject {
    if (!EmailValueObject.isValid(email)) {
      throw new BadRequestException('Invalid email')
    }
    return new EmailValueObject(email)
  }

  public static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  public toString(): string {
    return this._email
  }
}
