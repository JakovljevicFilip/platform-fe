/**
 * TaskId
 * -----------------------------------------------------------------------------
 * Value Object representing the identity of a Task.
 * Thin semantic wrapper around platform-level UUID.
 */

import { Uuid } from "src/application/Platform/AggregateSchema/Domain/ValueObject/Uuid"

export class TaskId extends Uuid {
  static override generate(): TaskId {
    return new TaskId(crypto.randomUUID())
  }

  static override fromString(input: string): TaskId {
    return new TaskId(input)
  }
}
