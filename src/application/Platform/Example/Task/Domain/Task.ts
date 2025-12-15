/**
 * Task (Aggregate Entity)
 * -----------------------------------------------------------------------------
 * Canonical entity representation used inside the Task aggregate.
 * Immutable. Constructed only by TaskAggregate.
 */

import { type TaskId } from './ValueObject/TaskId'
import type { TaskStatus } from './ValueObject/TaskStatus'

export class Task {
  constructor(
    public readonly id: TaskId,
    public readonly body: string,
    public readonly status: TaskStatus,
    public readonly created_at: Date
  ) {}
}
