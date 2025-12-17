/**
 * task-dexie.ts
 * -----------------------------------------------------------------------------
 * Dexie-based Infrastructure implementation of TaskRepository.
 * Receives a DexieRepository client instance from task-storage.ts.
 * Performs:
 *  - Task -> ORM shape transformation
 *  - ORM -> Task (via TaskAggregate.rebuild)
 */

import type { TaskRepository } from '../../Domain/TaskRepository'
import { TaskAggregate } from '../../Domain/TaskAggregate'
import type { Task } from '../../Domain/Task'
import type { TaskId } from '../../Domain/ValueObject/TaskId'

import type { DexieRepository } from 'src/application/Platform/Storage/Dexie/Domain/DexieRepository'

export class TaskDexie implements TaskRepository {
  constructor(private readonly client: DexieRepository) {}

  async save(task: Task): Promise<string> {
    const orm = {
      id: task.id.toString(),
      body: task.body,
      status: task.status.toString(),
      created_at: task.created_at,
    }

    return await this.client.create(orm)
  }

  async update(task: Task): Promise<string> {
    const orm = {
      id: task.id.toString(),
      body: task.body,
      status: task.status.toString(),
      created_at: task.created_at,
    }

    return await this.client.update(orm)
  }

  async remove(task: Task): Promise<string> {
    return await this.client.delete(task.id.toString())
  }

  async findAll(): Promise<Task[]> {
    const rows = await this.client.list()

    const aggregate = new TaskAggregate()
    return rows.map(row => aggregate.rebuild(row.id, row.body, row.status, row.created_at))
  }

  async findOneById(id: TaskId): Promise<Task | null> {
    const row = await this.client.findOneById(id.toString())
    const aggregate = new TaskAggregate()
    if (row === null) {
      return row
    }
    return aggregate.rebuild(row.id, row.body, row.status, row.created_at)
  }
}
