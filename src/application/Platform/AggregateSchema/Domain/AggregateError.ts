/**
 * DomainError
 * -----------------------------------------------------------------------------
 * Typed error for domain-level failures.
 *
 * Provides:
 *  - domain identifier for debugging
 *  - readable error message format: "[Domain] message"
 *  - optional structured details for debugging or logging
 */
export class DomainError extends Error {
  readonly domain: string
  readonly details?: unknown

  constructor(domain: string, message: string, details?: unknown) {
    super(`[${domain}] ${message}`)

    this.name = 'DomainError'
    this.domain = domain
    this.details = details

    // Fix prototype chain for ES2015+ Error inheritance
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
