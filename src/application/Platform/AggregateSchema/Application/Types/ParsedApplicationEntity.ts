import { type AggregateEntity } from 'src/application/Platform/AggregateSchema/Domain/AggregateEntity'
import { type ApplicationEntity } from './ApplicationEntity'

/**
 * ParsedApplicationEntity
 * -----------------------------------------------------------------------------
 * Shape of an entity used in the application layer.
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
