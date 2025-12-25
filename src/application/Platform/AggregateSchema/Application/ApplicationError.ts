/**
 * ApplicationError
 * -----------------------------------------------------------------------------
 * Typed error for application-level failures.
 *
 * Provides:
 *  - identifier for debugging
 *  - readable error message format: "[Domain] message"
 *  - optional structured details for debugging or logging
 */

// TODO: Add Errors to files architecture
export class ApplicationError extends Error {
  readonly domain: string
  readonly caller: string
  readonly details?: unknown

  constructor(domain: string, caller: string, message: string, details?: unknown) {
    super(`[${domain}.${caller}] ${message}`)

    this.name = 'ApplicationError'
    this.caller = caller
    this.domain = domain
    this.details = details

    // Fix prototype chain for ES2015+ Error inheritance
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
