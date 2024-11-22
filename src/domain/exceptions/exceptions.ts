import { HttpStatus } from '../enums/http-status.enum'

export class BaseException extends Error {
  public type: string
  public statusCode: number
  public errorMessage: string
  public details: Array<object>

  constructor(type: string, statusCode: number, errorMessage: string, details?: Array<object>) {
    super(errorMessage)
    this.type = type
    this.statusCode = statusCode
    this.errorMessage = errorMessage
    this.details = details ?? []
  }
}

export class InternalServerException extends BaseException {
  constructor(message: string, details?: Array<object>) {
    super('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR, message, details)
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
