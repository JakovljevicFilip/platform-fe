import type { LogAdapter } from '../Domain/Log'

import LogFactory from '../Infrastructure/log-factory'

class LoggerMaker {
  make(): LogAdapter {
    return LogFactory.create()
  }
}

export const logger = new LoggerMaker().make()
