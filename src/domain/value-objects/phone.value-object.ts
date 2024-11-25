export class PhoneValueObject {
  private readonly _phone: string

  constructor(phone: string) {
    this._phone = phone
  }

  get phone(): string {
    return this._phone
  }

  static create(phone: string): PhoneValueObject {
    if (!PhoneValueObject.isValid(phone)) {
      throw new Error('Invalid phone')
    }
    return new PhoneValueObject(phone)
  }

  static isValid(phone: string): boolean {
    const regex = /^(0|\+84)(\d{9,10})$/
    return regex.test(phone)
  }
}
