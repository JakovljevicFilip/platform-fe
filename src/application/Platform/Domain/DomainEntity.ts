import type { Notice } from '../Notice/Domain/Notice'

/**
 * Represents the outcome of a domain-level validation process.
 *
 * @template TRecord - The record type being validated.
 *
 * @property {Notice[]} notices
 *   A list of domain notices emitted during validation.
 *
 * @property {TRecord[]} valid
 *   All records that passed validation successfully.
 *
 * @property {TRecord[]} invalid
 *   All records that failed domain validation rules.
 */
export interface ValidationResult<TRecord = Record<string, unknown>> {
  notices: Notice[]
  valid: TRecord[]
  invalid: TRecord[]
}

/**
 * Base abstraction for all domain entity types.
 *
 * Every Platform-level domain entity MUST extend this class.
 * Provides a unified API for:
 *  - transforming raw data into domain records (`rebuild`)
 *  - validating those records using domain rules (`validate`)
 *
 * @template TRecord - The concrete record shape the entity manipulates.
 */
export abstract class DomainEntity<TRecord = Record<string, unknown>> {
  /**
   * Identifier for the domain to which this entity belongs.
   * Must be explicitly defined in each concrete domain entity.
   */
  static DOMAIN_NAME: string

  /**
   * Rebuilds a concrete domain record from raw persistence or transport data.
   *
   * @param {Record<string, unknown>} record
   *   The raw object received from storage, network, or other I/O boundary.
   *
   * @returns {TRecord}
   *   A strongly typed domain record instance.
   */
  abstract rebuild(record: Record<string, unknown>): TRecord

  /**
   * Validates a list of domain records using domain-specific business rules.
   *
   * @param {TRecord[]} records
   *   The domain records to be validated.
   *
   * @returns {ValidationResult<TRecord>}
   *   Structured validation result separating valid, invalid, and noticed issues.
   */
  abstract validate(records: TRecord[]): ValidationResult<TRecord>
}
