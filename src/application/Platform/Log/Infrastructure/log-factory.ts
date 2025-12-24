import type { LogAdapter } from '../Domain/Log'
import { consoleAdapter } from './Adapter/console-adapter'

export default class LogFactory {
  static create(): LogAdapter {
    return consoleAdapter
  }
}
