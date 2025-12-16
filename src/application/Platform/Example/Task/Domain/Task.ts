/**
 * Task (Aggregate Entity)
 * -----------------------------------------------------------------------------
 * Canonical entity representation used inside the Task aggregate.
 * Immutable. Constructed only by TaskAggregate.
 */

import { type TaskId } from './ValueObject/TaskId'
import type { TaskStatus } from './ValueObject/TaskStatus'

import { type AggregateEntity } from 'src/application/Platform/AggregateSchema/Domain/AggregateEntity'

export class Task implements AggregateEntity {
  constructor(
    public readonly id: TaskId,
    public readonly body: string,
    public readonly status: TaskStatus,
    public readonly created_at: Date
  ) {}
}
