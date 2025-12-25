/**
 * TaskDomainError
 * -----------------------------------------------------------------------------
 * Typed domain error specific to the Task aggregate.
 */

import { DomainError } from 'src/application/Platform/AggregateSchema/Domain/DomainError'

export class TaskDomainError extends DomainError {
  constructor(message: string, details?: unknown) {
    super('Task', message, details)
  }
}
