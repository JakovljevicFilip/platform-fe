import { type LogAdapter } from '../../Domain/Log'

class ConsoleAdapter implements LogAdapter {
  write(value: unknown): void {
    console.log(value)
  }
}

export const consoleAdapter = new ConsoleAdapter()
