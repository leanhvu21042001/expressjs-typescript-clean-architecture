import { HttpStatus } from './http-status.enum'

export class BaseException extends Error {
  public type: string
  public statusCode: number
  public errorMessage: string
  public errorDetails: Array<object>

  constructor(type: string, statusCode: number, message: string, details?: Array<object>) {
    super(message)
    this.type = type || this.constructor.name
    this.statusCode = statusCode
    this.errorMessage = message
    this.errorDetails = details ?? []
    // this.public = public
    // this.operational = true
    // this.logging = logging

    // create stack trace
    Error.captureStackTrace(this, this.constructor)
  }
}

export class InternalServerException extends BaseException {
  constructor(message: string, details?: Array<object>) {
    super('InternalServer', HttpStatus.INTERNAL_SERVER_ERROR, message, details)
  }
}

export class NotFoundException extends BaseException {
  constructor(message: string, details?: Array<object>) {
    super('NotFound', HttpStatus.NOT_FOUND, message, details)
  }
}

export class BadRequestException extends BaseException {
  constructor(message: string, details?: Array<object>) {
    super('BadRequest', HttpStatus.BAD_REQUEST, message, details)
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message: string, details?: Array<object>) {
    super('Unauthorized', HttpStatus.UNAUTHORIZED, message, details)
  }
}

export class ForbiddenException extends BaseException {
  constructor(message: string, details?: Array<object>) {
    super('Forbidden', HttpStatus.FORBIDDEN, message, details)
  }
}

export class ValidationException extends BaseException {
  constructor(message: string, details?: Array<object>) {
    super('ValidationError', HttpStatus.BAD_REQUEST, message, details)
  }
}
