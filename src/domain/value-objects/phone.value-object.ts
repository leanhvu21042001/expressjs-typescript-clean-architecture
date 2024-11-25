export class PhoneValueObject {
  private readonly _phone: string

  public get phone(): string {
    return this._phone
  }

  private constructor(phone: string) {
    this._phone = phone
  }

  public static create(phone: string): PhoneValueObject {
    if (!PhoneValueObject.isValid(phone)) {
      throw new Error('Invalid phone')
    }
    return new PhoneValueObject(phone)
  }

  public static isValid(phone: string): boolean {
    const regex = /^(0|\+84)(\d{9,10})$/
    return regex.test(phone)
  }

  public toString(): string {
    return this._phone
  }
}
