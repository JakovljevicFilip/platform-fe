/**
 * DexieError
 * -----------------------------------------------------------------------------
 * Typed error for Dexie-related invariant violations.
 *
 * Thrown when the Dexie client cannot uphold the guarantees
 * defined by the DexieRepository contract.
 *
 * Example:
 *  - Expected string ID, but Dexie returned a non-string key.
 */
import { DomainError } from 'src/application/Platform/AggregateSchema/Domain/AggregateError'

export class DexieError extends DomainError {
  constructor(message: string, details?: unknown) {
    super('Dexie', message, details)
  }
}
