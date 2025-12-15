/**
 * Aggregate
 * -----------------------------------------------------------------------------
 * Abstract root for all aggregates.
 * Responsible for reconstructing aggregate entities from raw persistence data.
 */

import type { AggregateEntity } from './AggregateEntity'

export abstract class Aggregate<TAggregate extends AggregateEntity> {
  /**
   * Used for debugging, settings lookup, and error reporting.
   * Must be overridden by each concrete aggregate.
   */
  static readonly AGGREGATE_NAME: string

  /**
   * Rebuild the aggregate entity from raw persisted values.
   * Must be implemented in every aggregate.
   */
  abstract rebuild(...args: unknown[]): TAggregate
}
