/**
 * Task Service
 * -----------------------------------------------------------------------------
 * Application-level CQRS orchestration layer for Task use cases.
 * Composes Commands and Queries and synchronizes application state
 * with the UI store.
 *
 * Contains no domain logger.writeic and owns no persistence.
 */

import { useTaskStore } from '../task-store'

import { taskAddHandler } from './CQRS/Command/Add/add-handler'
import { taskChangeHandler } from './CQRS/Command/Change/change-handler'
import { taskRemoveHandler } from './CQRS/Command/Remove/remove-handler'

import { taskListHandler } from './CQRS/Query/List/list-handler'

import type { Task } from '../../Domain/Task'

export const taskService = {
  // COMMANDS
  async add(content: string): Promise<void> {
    await taskAddHandler.add(content)
    await this.list()
  },

  async change(task: Task, changedBody: string): Promise<void> {
    await taskChangeHandler.change(task, changedBody)
    await this.list()
  },

  async remove(task: Task): Promise<void> {
    await taskRemoveHandler.remove(task)
    await this.list()
  },

  // QUERY
  async list(): Promise<void> {
    const tasks = await taskListHandler.list()
    const store = useTaskStore()
    store.set(tasks)
  },
}
