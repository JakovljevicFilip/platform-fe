/**
 * Command
 * -----------------------------------------------------------------------------
 * Write-side CQRS abstraction representing a state-changing operation.
 * Accepts application-layer input, commits domain aggregates,
 * and persists the resulting state.
 */

import type { ApplicationEntity } from 'src/application/Platform/AggregateSchema/Application/Types/ApplicationEntity'
import type { AggregateEntity } from 'src/application/Platform/AggregateSchema/Domain/AggregateEntity'

export interface Command {
  command(applicationEntity: ApplicationEntity): Promise<string>
  commit(applicationEntity: ApplicationEntity): AggregateEntity
}
