/**
 * task-rules.ts
 * -----------------------------------------------------------------------------
 * Internal domain rule helpers for the Task aggregate.
 */

import { TaskSettings } from '../TaskSettings'
import type { TaskStatus } from '../ValueObject/TaskStatus'
import { TaskError } from '../TaskError'

export const taskRules = {
  /* ------------------------------------------------------------------------ */
  /*                            Helper Validators                             */
  /* ------------------------------------------------------------------------ */

  validateBodyNotEmpty(body: string): void {
    if (!body || body.trim().length === 0) {
      throw new TaskError('Task body cannot be empty.')
    }
  },

  validateBodyLength(body: string): void {
    const trimmed = body.trim().length
    const min = TaskSettings.minBodyLength
    const max = TaskSettings.maxBodyLength

    if (trimmed < min || trimmed > max) {
      throw new TaskError(`Task body must be between ${min} and ${max} characters.`)
    }
  },

  /* ------------------------------------------------------------------------ */
  /*                                 Rules                                    */
  /* ------------------------------------------------------------------------ */

  /**
   * Can the Task be recorded?
   * No max-count check anymore.
   */
  canRecord(body: string): void {
    this.validateBodyNotEmpty(body)
    this.validateBodyLength(body)
  },

  canChange(currentStatus: TaskStatus, newBody: string): void {
    if (currentStatus.toString() === 'done') {
      throw new TaskError('Cannot change a completed (done) task.')
    }

    this.validateBodyNotEmpty(newBody)
    this.validateBodyLength(newBody)
  },

  canRemove(currentStatus: TaskStatus): void {
    if (currentStatus.toString() === 'in_progress') {
      throw new TaskError('Cannot remove a task that is in progress.')
    }
  },

  canRebuild(props: { id: unknown; body: unknown; status: unknown; created_at: unknown }): void {
    const { id, body, status, created_at } = props

    if (!id || !body || !status || !created_at) {
      throw new TaskError('Missing required fields while rebuilding Task.', props)
    }
  },
}
