/**
 * Task Create Command
 * -----------------------------------------------------------------------------
 * Write-side CQRS command responsible for creating a new Task aggregate
 * from application-layer input and persisting it.
 */

import type { NewTask } from '../../../Types/NewTask'

import type { Task } from '../../../../Domain/Task'
import { TaskAggregate } from '../../../../Domain/TaskAggregate'

import { taskStorage } from '../../../../Infrastructure/task-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

export class TaskCreate implements Command {
  async command(newTask: NewTask): Promise<string> {
    const created = this.commit(newTask)
    return await taskStorage.save(created)
  }

  commit(newTask: NewTask): Task {
    return TaskAggregate.record(newTask.body)
  }
}

export const taskCreate = new TaskCreate()
