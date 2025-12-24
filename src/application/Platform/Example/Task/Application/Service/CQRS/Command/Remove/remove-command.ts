import type { TaskRemovePayload } from './TaskRemovePayload'

import type { Task } from 'src/application/Platform/Example/Task/Domain/Task'
import { TaskAggregate } from 'src/application/Platform/Example/Task/Domain/TaskAggregate'

import { taskStorage } from 'src/application/Platform/Example/Task/Infrastructure/task-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class TaskRemoveCommand implements Command {
  async command(payload: TaskRemovePayload): Promise<string> {
    const removed = this.commit(payload)
    return await taskStorage.remove(removed)
  }

  commit(payload: TaskRemovePayload): Task {
    return TaskAggregate.remove(payload.task)
  }
}

export const taskRemoveCommand = new TaskRemoveCommand()
