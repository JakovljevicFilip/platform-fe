import type { TaskAddPayload } from './TaskAddPayload'
import { taskAddCommand } from './add-command'

import { logger } from 'src/application/Platform/Log/Application/log-service'

import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'
import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class TaskAddHandler {
  private readonly log: LogAdapter
  private readonly command: Command

  constructor(log: LogAdapter, command: Command) {
    this.log = log
    this.command = command
  }

  async add(body: string): Promise<void> {
    try {
      const payload = <TaskAddPayload>{
        body: body,
      }
      await this.command.command(payload)
    } catch (error) {
      this.log.write({
        context: 'Task.record',
        error,
      })
      throw error
    }
  }
}

export const taskAddHandler = new TaskAddHandler(logger, taskAddCommand)
