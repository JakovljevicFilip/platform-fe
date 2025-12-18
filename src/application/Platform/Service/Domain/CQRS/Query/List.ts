/**
 * List Query
 * -----------------------------------------------------------------------------
 * Read-side CQRS abstraction for retrieving multiple aggregates
 * and converting them into application-layer entities.
 */

import type { ApplicationEntity } from 'src/application/Platform/AggregateSchema/Application/Types/ApplicationEntity'
import type { AggregateEntity } from 'src/application/Platform/AggregateSchema/Domain/AggregateEntity'

export interface List<TAggregate extends AggregateEntity, TResult extends ApplicationEntity> {
  list(): Promise<TResult[]>
  parse(aggregateEntities: TAggregate[]): TResult[]
}
