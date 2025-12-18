/**
 * Task Update Command
 * -----------------------------------------------------------------------------
 * Write-side CQRS command responsible for modifying an existing Task
 * aggregate based on application-layer state.
 */

import type { ParsedTask } from '../../../Types/ParsedTask'

import type { Task } from '../../../../Domain/Task'
import { TaskAggregate } from '../../../../Domain/TaskAggregate'

import { taskStorage } from '../../../../Infrastructure/task-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

export class TaskUpdate implements Command {
  async command(parsedTask: ParsedTask): Promise<string> {
    const created = this.commit(parsedTask)
    return await taskStorage.update(created)
  }

  commit(parsedTask: ParsedTask): Task {
    return TaskAggregate.change(parsedTask.aggregate, parsedTask.application.editBody)
  }
}

export const taskUpdate = new TaskUpdate()
