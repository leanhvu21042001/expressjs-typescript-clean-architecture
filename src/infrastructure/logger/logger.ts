/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLogger, format, transports } from 'winston'

const { colorize, combine, json, label, printf, timestamp } = format

class Logger {
  private readonly loggerLabel: string = 'ExpressApplication'
  constructor(loggerLabel = 'ExpressApplication') {
    this.loggerLabel = loggerLabel
  }

  private readonly consoleTransport = new transports.Console({
    format: combine(
      colorize({
        all: true,
        colors: {
          info: 'bold blue', // fontStyle color
          warn: 'italic yellow',
          error: 'bold red',
          debug: 'green',
        },
      }),
    ),
  })
  private readonly debugFileTransport = new transports.File({
    filename: 'logs/debug.log',
    format: combine(json()),
  })
  private readonly exceptionFileTransport = new transports.File({
    filename: 'logs/exceptions.log',
    format: combine(json()),
  })

  private logger = createLogger({
    level: 'debug',
    format: combine(
      label({ label: `[${this.loggerLabel}]` }),
      timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
      }),
      printf(function (info) {
        return `\x1B[33m\x1B[3[${info.label}\x1B[23m\x1B[39m \x1B[32m${info.timestamp}\x1B[39m ${info.level} : ${info.message}`
      }),
    ),
    transports: [this.consoleTransport, this.debugFileTransport],
    exceptionHandlers: [this.consoleTransport, this.exceptionFileTransport],
  })

  public info(message: string, ...meta: any[]) {
    this.logger.info(message, ...meta)
  }

  public warn(message: string, ...meta: any[]) {
    this.logger.warn(message, ...meta)
  }

  public error(message: string, ...meta: any[]) {
    this.logger.error(message, ...meta)
  }

  public debug(message: string, ...meta: any[]) {
    this.logger.debug(message, ...meta)
  }
}

export default new Logger()
