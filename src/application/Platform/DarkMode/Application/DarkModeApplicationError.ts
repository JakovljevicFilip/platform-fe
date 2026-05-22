import { DarkModeSettings } from '../Domain/DarkModeSettings'

import { ApplicationError } from 'src/application/Platform/AggregateSchema/Application/ApplicationError'

export class DarkModeApplicationError extends ApplicationError {
  constructor(message: string, caller: string, details?: unknown) {
    super(DarkModeSettings.aggregateName, caller, message, details)
  }
}
