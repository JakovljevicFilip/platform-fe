import { type NewTask } from '../Types/NewTask'
import { type ParsedTask } from '../Types/ParsedTask'

import { taskCommitter } from './task-committer'
import { taskParser } from './task-parser'
import { useTaskStore } from '../task-store'

import { taskStorage } from '../../Infrastructure/task-storage'

import { write as log } from 'src/application/Platform/Log/Application/log-service'

export const taskService = {
  // QUERY
  async list(): Promise<void> {
    try {
      const tasks = await taskStorage.findAll()
      const parsed = taskParser.parseMany(tasks)
      const store = useTaskStore()
      store.set(parsed)
    } catch (error) {
      log({
        context: 'TaskService.list',
        error,
      })
      throw error
    }
  },

  // COMMANDS
  async create(newTask: NewTask): Promise<void> {
    try {
      const created = taskCommitter.record(newTask)
      await taskStorage.save(created)
    } catch (error) {
      log({
        context: 'TaskService.create',
        newTask,
        error,
      })
      throw error
    }
  },

  async update(parsedTask: ParsedTask): Promise<void> {
    try {
      const updated = taskCommitter.update(parsedTask)
      await taskStorage.update(updated)
    } catch (error) {
      log({
        context: 'TaskService.update',
        taskId: parsedTask.application.id,
        error,
      })
      throw error
    }
  },

  async remove(parsedTask: ParsedTask): Promise<void> {
    try {
      const removed = taskCommitter.remove(parsedTask)
      await taskStorage.remove(removed)
    } catch (error) {
      log({
        context: 'TaskService.remove',
        taskId: parsedTask.application.id,
        error,
      })
      throw error
    }
  },
}
