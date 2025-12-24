/**
 * List Query
 * -----------------------------------------------------------------------------
 * Read-side CQRS abstraction for retrieving multiple aggregates
 * and exposing them as application-layer entities.
 */

import type { AggregateEntity } from 'src/application/Platform/AggregateSchema/Domain/AggregateEntity'

export interface List<T extends AggregateEntity> {
  list(...args: unknown[]): Promise<T[]>
}
