import { darkModeChangeCommand } from './change-command'

import type { DarkMode } from 'src/application/Platform/DarkMode/Domain/DarkMode'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class ChangeHandler {
  private readonly log: LogAdapter
  private readonly command: Command

  constructor(log: LogAdapter, command: Command) {
    this.log = log
    this.command = command
  }

  async change(darkMode: DarkMode, newValue: boolean): Promise<void> {
    try {
      const payload = {
        darkMode: darkMode,
        newValue: newValue,
      }
      await this.command.command(payload)
    } catch (error) {
      this.log.write({
        context: 'command.change',
        darkMode,
        error,
      })
      throw error
    }
  }
}

export const darkModeChangeHandler = new ChangeHandler(logger, darkModeChangeCommand)
