/**
 * ApplicationEntity
 * -----------------------------------------------------------------------------
 * UI-facing model paired with a domain entity.
 * Concrete aggregates extend this interface.
 */

import { type AggregateEntity } from 'src/application/Platform/AggregateSchema/Domain/AggregateEntity'

export type ApplicationEntity = object

/**
 * ParsedApplicationEntity
 * -----------------------------------------------------------------------------
 * Aggregate + Application pair.
 *
 * ApplicationLayer ALWAYS works with this bundle:
 *   - aggregate: AggregateEntity (canonical domain model)
 *   - application: ApplicationEntity (UI-facing model)
 */

export interface ParsedApplicationEntity<
  TAggregate extends AggregateEntity,
  TApplication extends ApplicationEntity,
> {
  aggregate: TAggregate
  application: TApplication
}
