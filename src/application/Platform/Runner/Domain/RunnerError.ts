/**
 * RunnerError
 * -----------------------------------------------------------------------------
 * Domain-level error representing a failure during Run or Runner execution.
 *
 * - Signals execution or orchestration failures
 * - May be wrapped or enriched by higher layers
 *
 * Enables consistent error handling across Runner-based execution flows.
 */

import { DomainError } from 'src/application/Platform/AggregateSchema/Domain/AggregateError'

export class RunnerError extends DomainError {
  constructor(message: string, details?: unknown) {
    super('Runner', message, details)
  }
}
