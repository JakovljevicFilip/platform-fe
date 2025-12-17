/**
 * Task Committer
 * -----------------------------------------------------------------------------
 * Converts application data → Task aggregate using the Aggregate.
 */
import type { ParsedTask } from '../Types/ParsedTask'

import { TaskAggregate } from '../../Domain/TaskAggregate'
import { type Task } from '../../Domain/Task'
import { type NewTask } from '../Types/NewTask'

export const taskCommitter = {
  /**
   * Create a new task.
   * No currentCount needed anymore.
   */
  record(newTask: NewTask): Task {
    return TaskAggregate.record(newTask.body)
  },

  /**
   * Update an existing task.
   */
  update(parsed: ParsedTask): Task {
    return TaskAggregate.change(parsed.aggregate, parsed.application.editBody)
  },

  /**
   * Remove a task.
   */
  remove(parsed: ParsedTask): Task {
    return TaskAggregate.remove(parsed.aggregate)
  },
}
