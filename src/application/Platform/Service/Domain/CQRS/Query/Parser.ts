/**
 * Parser
 * -----------------------------------------------------------------------------
 * Read-side CQRS utility responsible for converting domain aggregates
 * into application-layer entities.
 * Contains no persistence or business logic.
 */

import type { ApplicationEntity } from 'src/application/Platform/AggregateSchema/Application/Types/ApplicationEntity'
import type { AggregateEntity } from 'src/application/Platform/AggregateSchema/Domain/AggregateEntity'

export interface Parser {
  parseOne(aggregateEntity: AggregateEntity): ApplicationEntity
  parseMany(aggregateEntity: AggregateEntity[]): ApplicationEntity[]
}
