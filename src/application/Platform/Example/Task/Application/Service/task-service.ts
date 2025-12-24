/**
 * Task Service
 * -----------------------------------------------------------------------------
 * Application-level CQRS orchestration layer for Task use cases.
 * Composes Commands and Queries and synchronizes application state
 * with the UI store.
 *
 * Contains no domain logger.writeic and owns no persistence.
 */

import type { ParsedTask } from '../Types/ParsedTask'
import type { NewTask } from '../Types/NewTask'

import { useTaskStore } from '../task-store'

import { taskCreate } from './CQRS/Command/task-create'
import { taskUpdate } from './CQRS/Command/task-update'
import { taskRemove } from './CQRS/Command/task-remove'

import { taskList } from './CQRS/Query/task-list'
import { logger } from 'src/application/Platform/Log/Application/log-service'

export const taskService = {
  // COMMANDS
  async create(newTask: NewTask): Promise<void> {
    try {
      await taskCreate.command(newTask)
    } catch (error) {
      logger.write({
        context: 'TaskService.create',
        newTask,
        error,
      })
      throw error
    }
    await this.list()
  },

  async update(parsedTask: ParsedTask): Promise<void> {
    try {
      await taskUpdate.command(parsedTask)
    } catch (error) {
      logger.write({
        context: 'TaskService.update',
        parsedTask,
        error,
      })
      throw error
    }
    await this.list()
  },

  async remove(parsedTask: ParsedTask): Promise<void> {
    try {
      await taskRemove.command(parsedTask)
    } catch (error) {
      logger.write({
        context: 'TaskService.create',
        parsedTask,
        error,
      })
      throw error
    }
    await this.list()
  },

  // QUERY
  async list(): Promise<void> {
    try {
      const parsed = await taskList.list()
      const store = useTaskStore()
      store.set(parsed)
    } catch (error) {
      logger.write({
        context: 'TaskService.list',
        error,
      })
      throw error
    }
  },
}
