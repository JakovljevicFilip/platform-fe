/**
 * TaskError
 * -----------------------------------------------------------------------------
 * Typed domain error specific to the Task aggregate.
 */

import { DomainError } from 'src/application/Platform/AggregateSchema/Domain/AggregateError'

export class TaskError extends DomainError {
  constructor(message: string, details?: unknown) {
    super('Task', message, details)
  }
}
