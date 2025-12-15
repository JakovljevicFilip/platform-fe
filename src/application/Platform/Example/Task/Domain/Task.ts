/**
 * Task (Aggregate Entity)
 * -----------------------------------------------------------------------------
 * Canonical entity representation used inside the Task aggregate.
 * Immutable. Constructed only by TaskAggregate.
 */

import type { TaskId } from './ValueObject/TaskId'
import type { TaskStatus } from './ValueObject/TaskStatus'

export interface Task {
  id: TaskId
  body: string
  status: TaskStatus
  created_at: Date
}
