/**
 * AggregateSettings
 * -----------------------------------------------------------------------------
 * Base class for all aggregate-level settings.
 * Enforces:
 *   - AGGREGATE_NAME must be defined by subclasses
 *   - Getter for retrieving the aggregate name
 *   - require() helper for validated config values
 */

export abstract class AggregateSettings {
  /**
   * MUST be overridden by every aggregate.
   * This is the canonical aggregate name.
   */
  protected static readonly AGGREGATE_NAME: string

  /**
   * Getter for the aggregate name.
   */
  static get aggregateName(): string {
    return this.AGGREGATE_NAME
  }

  /**
   * Throws if the given config value is missing.
   */
  protected static require<T>(value: T | null | undefined, keyName: string): T {
    if (value === undefined || value === null) {
      throw new Error(`${this.AGGREGATE_NAME}: Missing required config value: ${keyName}`)
    }
    return value
  }
}
