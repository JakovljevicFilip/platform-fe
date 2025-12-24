/**
 * Command
 * -----------------------------------------------------------------------------
 * Write-side CQRS abstraction representing a state-changing operation.
 * Accepts application-layer input, commits domain aggregates,
 * and persists the resulting state.
 */
import type { CommandPayload } from './CommandPayload'

import type { AggregateEntity } from 'src/application/Platform/AggregateSchema/Domain/AggregateEntity'

export interface Command {
  command(payload: CommandPayload): Promise<string>
  commit(payload: CommandPayload): AggregateEntity
}
