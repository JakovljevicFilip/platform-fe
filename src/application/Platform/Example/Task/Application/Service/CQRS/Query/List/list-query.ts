import type { Task } from 'src/application/Platform/Example/Task/Domain/Task'

import { taskStorage } from 'src/application/Platform/Example/Task/Infrastructure/task-storage'

import type { List } from 'src/application/Platform/Service/Domain/CQRS/Query/List'

class ListQuery implements List<Task> {
  async list(): Promise<Task[]> {
    const thoughts = await taskStorage.findAll()
    return thoughts
  }
}

export const taskListQuery = new ListQuery()
