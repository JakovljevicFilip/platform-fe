import type { TaskRemovePayload } from './TaskRemovePayload'
import { taskRemoveCommand } from './remove-command'

import type { Task } from 'src/application/Platform/Example/Task/Domain/Task'

import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'
import { logger } from 'src/application/Platform/Log/Application/log-service'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class TaskRemoveHandler {
  private readonly log: LogAdapter
  private readonly command: Command

  constructor(log: LogAdapter, command: Command) {
    this.log = log
    this.command = command
  }

  async remove(task: Task): Promise<void> {
    try {
      const payload = <TaskRemovePayload>{
        task: task,
      }
      await this.command.command(payload)
    } catch (error) {
      this.log.write({
        context: 'Task.remove',
        error,
      })
      throw error
    }
  }
}

export const taskRemoveHandler = new TaskRemoveHandler(logger, taskRemoveCommand)
