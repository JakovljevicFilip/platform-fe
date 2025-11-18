import type { LogAdapter } from '../Domain/Log'
import ConsoleAdapter from './Adapter/console-adapter'

export default class LogFactory {
  static create(): LogAdapter {
    return new ConsoleAdapter()
  }
}
