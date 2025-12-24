import type { TaskChangePayload } from './TaskChangePayload'
import { taskChangeCommand } from './change-command'

import type { Task } from 'src/application/Platform/Example/Task/Domain/Task'

import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'
import { logger } from 'src/application/Platform/Log/Application/log-service'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class TaskChangeHandler {
  private readonly log: LogAdapter
  private readonly command: Command

  constructor(log: LogAdapter, command: Command) {
    this.log = log
    this.command = command
  }

  async change(task: Task, changedBody: string): Promise<void> {
    try {
      const payload = <TaskChangePayload>{
        task: task,
        changedBody: changedBody,
      }
      await this.command.command(payload)
    } catch (error) {
      this.log.write({
        context: 'Task.change',
        error,
      })
      throw error
    }
  }
}

export const taskChangeHandler = new TaskChangeHandler(logger, taskChangeCommand)
