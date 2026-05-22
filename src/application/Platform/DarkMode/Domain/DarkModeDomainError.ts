import { DomainError } from 'src/application/Platform/AggregateSchema/Domain/DomainError'
import { DarkModeSettings } from './DarkModeSettings'

export class DarkModeDomainError extends DomainError {
  constructor(message: string, details?: unknown) {
    super(DarkModeSettings.aggregateName, message, details)
  }
}
