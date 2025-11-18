import { type LogAdapter } from '../../Domain/Log'

export default class ConsoleAdapter implements LogAdapter {
  write(value: unknown): void {
    console.log(value)
  }
}
