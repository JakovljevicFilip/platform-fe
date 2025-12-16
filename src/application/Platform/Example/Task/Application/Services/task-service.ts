import { type ParsedTask } from '../Types/ParsedTask'
import { useTaskStore } from '../task-store'
import { taskCommitter } from './task-committer'
import { taskParser } from './task-parser'

import { write as log } from 'src/application/Platform/Log/Application/log-service'

export const taskService = {
  // QUERY
  list() {
    try {
      const store = useTaskStore()
      const parsed = taskParser.parseMany(store.tasks)
      store.setParsed(parsed)
    } catch (error) {
      log({
        context: 'TaskService.list',
        error,
      })
      throw error
    }
  },

  // COMMANDS
  create(body: string) {
    try {
      const store = useTaskStore()
      const created = taskCommitter.record(body)
      store.add(created)
    } catch (error) {
      log({
        context: 'TaskService.create',
        body,
        error,
      })
      throw error
    }
  },

  update(parsedTask: ParsedTask) {
    try {
      const store = useTaskStore()
      const updated = taskCommitter.update(parsedTask)
      store.update(updated)
    } catch (error) {
      log({
        context: 'TaskService.update',
        taskId: parsedTask.application.id,
        error,
      })
      throw error
    }
  },

  remove(parsedTask: ParsedTask) {
    try {
      const store = useTaskStore()
      const removed = taskCommitter.remove(parsedTask)
      store.remove(removed)
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
