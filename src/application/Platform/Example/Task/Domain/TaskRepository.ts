/**
 * TaskRepository
 * -----------------------------------------------------------------------------
 * Domain-specific persistence contract for the Task aggregate.
 * Concrete implementations live in the Infrastructure layer.
 */

import type { Task } from './Task'

export interface TaskRepository {
  save(task: Task): Promise<void>
  update(task: Task): Promise<void>
  remove(task: Task): Promise<void>
  findAll(): Promise<Task[]>
}
