import type { Task } from '../Domain/Task'
import type { TaskRepository } from '../Domain/TaskRepository'
import type { TaskId } from '../Domain/ValueObject/TaskId'

import { StorageMaker } from 'src/application/Platform/Storage/Infrastructure/storage-maker'
import { TaskDexie } from './Client/task-dexie'

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

  findOneById(id: TaskId): Promise<Task | null> {
    return this.repo.findOneById(id)
  }
}

export const taskStorage = new TaskStorage()
