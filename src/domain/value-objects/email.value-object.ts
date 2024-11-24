export class EmailValueObject {
  private readonly _email: string

  constructor(email: string) {
    this._email = email
  }

  get email(): string {
    return this._email
  }

  static create(email: string): EmailValueObject {
    if (!EmailValueObject.isValid(email)) {
      throw new Error('Invalid email')
    }
    return new EmailValueObject(email)
  }

  static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
