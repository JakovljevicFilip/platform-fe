/**
 * TaskRepository
 * -----------------------------------------------------------------------------
 * Domain-specific persistence contract for the Task aggregate.
 * Concrete implementations live in the Infrastructure layer.
 */
import type { Task } from './Task'

import { type AggregateRepository } from 'src/application/Platform/AggregateSchema/Domain/AggregateRepository'

export interface TaskRepository extends AggregateRepository {
  save(task: Task): Promise<void>
  update(task: Task): Promise<void>
  remove(task: Task): Promise<void>
  findAll(): Promise<Task[]>
}
