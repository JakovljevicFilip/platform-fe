/**
 * Task Remove Command
 * -----------------------------------------------------------------------------
 * Write-side CQRS command responsible for removing an existing Task
 * aggregate from persistence.
 */

import type { ParsedTask } from '../../../Types/ParsedTask'

import type { Task } from '../../../../Domain/Task'
import { TaskAggregate } from '../../../../Domain/TaskAggregate'

import { taskStorage } from '../../../../Infrastructure/task-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

export class TaskRemove implements Command {
  async command(parsedTask: ParsedTask): Promise<string> {
    const removed = this.commit(parsedTask)
    return await taskStorage.remove(removed)
  }

  commit(parsedTask: ParsedTask): Task {
    return TaskAggregate.remove(parsedTask.aggregate)
  }
}

export const taskRemove = new TaskRemove()
