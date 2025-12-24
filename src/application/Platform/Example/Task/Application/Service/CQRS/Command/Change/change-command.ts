import type { TaskChangePayload } from './TaskChangePayload'

import type { Task } from 'src/application/Platform/Example/Task/Domain/Task'
import { TaskAggregate } from 'src/application/Platform/Example/Task/Domain/TaskAggregate'

import { taskStorage } from 'src/application/Platform/Example/Task/Infrastructure/task-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class TaskChangeCommand implements Command {
  async command(payload: TaskChangePayload): Promise<string> {
    const changed = this.commit(payload)
    return await taskStorage.update(changed)
  }

  commit(payload: TaskChangePayload): Task {
    return TaskAggregate.change(payload.task, payload.changedBody)
  }
}

export const taskChangeCommand = new TaskChangeCommand()
