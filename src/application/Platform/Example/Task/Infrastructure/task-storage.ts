import { StorageMaker } from 'src/application/Platform/Storage/Infrastructure/storage-maker'
import { TaskDexie } from './Client/task-dexie'
import type { Task } from '../Domain/Task'
import type { TaskRepository } from '../Domain/TaskRepository'

class TaskStorage implements TaskRepository {
  private readonly repo: TaskRepository

  constructor() {
    const client = StorageMaker.make('Task')
    client.changeToPlatformClient()
    this.repo = new TaskDexie(client)
  }

  save(task: Task): Promise<string> {
    return this.repo.save(task)
  }
  update(task: Task): Promise<string> {
    return this.repo.update(task)
  }
  remove(task: Task): Promise<string> {
    return this.repo.remove(task)
  }
  findAll(): Promise<Task[]> {
    return this.repo.findAll()
  }
}

export const taskStorage = new TaskStorage()
