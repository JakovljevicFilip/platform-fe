/**
 * TaskApplicationError
 * -----------------------------------------------------------------------------
 * Typed domain error specific to the Task application layer.
 */

import { ApplicationError } from 'src/application/Platform/AggregateSchema/Application/ApplicationError'

export class TaskApplicationError extends ApplicationError {
  constructor(message: string, caller: string, details?: unknown) {
    super('Task', message, caller, details)
  }
}
