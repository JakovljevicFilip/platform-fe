/**
 * TaskRepository
 * -----------------------------------------------------------------------------
 * Domain-specific persistence contract for the Task aggregate.
 * Concrete implementations live in the Infrastructure layer.
 */
import type { Task } from './Task'
import type { TaskId } from './ValueObject/TaskId'

import type { AggregateRepository } from 'src/application/Platform/AggregateSchema/Domain/AggregateRepository'

export interface TaskRepository extends AggregateRepository {
  save(task: Task): Promise<string>
  update(task: Task): Promise<string>
  remove(task: Task): Promise<string>
  findAll(): Promise<Task[]>
  findOneById(id: TaskId): Promise<Task | null>
}
