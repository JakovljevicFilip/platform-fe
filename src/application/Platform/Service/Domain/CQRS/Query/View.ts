/**
 * View Query
 * -----------------------------------------------------------------------------
 * Read-side CQRS abstraction for retrieving a single aggregate
 * by identity and exposing it as an application-layer entity.
 */

import type { ApplicationEntity } from 'src/application/Platform/AggregateSchema/Application/Types/ApplicationEntity'
import type { Uuid } from 'src/application/Platform/AggregateSchema/Domain/ValueObject/Uuid'

export interface View<TId extends Uuid, TResult extends ApplicationEntity> {
  view(id: TId): Promise<TResult>
}
