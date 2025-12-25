/**
 * TaskApplicationError
 * -----------------------------------------------------------------------------
 * Typed domain error specific to the Task application layer.
 */
import { TaskSettings } from '../Domain/TaskSettings'

import { ApplicationError } from 'src/application/Platform/AggregateSchema/Application/ApplicationError'

export class TaskApplicationError extends ApplicationError {
  constructor(caller: string, message: string, details?: unknown) {
    super(TaskSettings.aggregateName, caller, message, details)
  }
}
