import type { TaskAddPayload } from './TaskAddPayload'

import { TaskAggregate } from 'src/application/Platform/Example/Task/Domain/TaskAggregate'
import type { Task } from 'src/application/Platform/Example/Task/Domain/Task'

import { taskStorage } from 'src/application/Platform/Example/Task/Infrastructure/task-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class TaskAddCommand implements Command {
  async command(payload: TaskAddPayload): Promise<string> {
    const recorded = this.commit(payload)
    return await taskStorage.save(recorded)
  }

  commit(payload: TaskAddPayload): Task {
    return TaskAggregate.record(payload.body)
  }
}

export const taskAddCommand = new TaskAddCommand()
