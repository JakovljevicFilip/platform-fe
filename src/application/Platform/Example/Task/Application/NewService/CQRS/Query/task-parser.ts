/**
 * Task Parser
 * -----------------------------------------------------------------------------
 * Converts Task aggregate → ParsedTask.
 * Application entity contains only UI-facing values in camelCase.
 */

import type { Parser } from 'src/application/Platform/Service/Domain/CQRS/Query/Parser'
import type { Task } from '../../../../Domain/Task'
import type { ParsedTask, TaskApplicationEntity } from '../../../Types/ParsedTask'

class TaskParser implements Parser {
  parseOne(aggregate: Task): ParsedTask {
    const application: TaskApplicationEntity = {
      id: aggregate.id.toString(),
      body: aggregate.body,
      status: aggregate.status.toString(),
      createdAt: new Date(aggregate.created_at),

      // UI-only
      isEditing: false,
      editBody: aggregate.body,
      isSelected: false,
    }

    return { aggregate, application }
  }

  parseMany(aggregates: Task[]): ParsedTask[] {
    return aggregates.map(t => this.parseOne(t))
  }
}

export const taskParser = new TaskParser()
