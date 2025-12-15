import { type ParsedTask } from '../Types/ParsedTask'
import { useTaskStore } from '../task-store'
import { taskCommitter } from './task-committer'
import { taskParser } from './task-parser'

import { write as log } from 'src/application/Platform/Log/Application/log-service'
import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

export const taskService = {
  // QUERY
  list() {
    try {
      const store = useTaskStore()
      return taskParser.parseMany(store.tasks)
    } catch (error) {
      log({
        context: 'TaskService.list',
        error,
      })

      notify.warning('Task listing failed. Please try again later.')

      throw error
    }
  },

  // COMMANDS
  create(body: string) {
    try {
      const store = useTaskStore()
      const created = taskCommitter.record(body)
      store.add(created)

      notify.success('Task created successfully.')

      return this.list()
    } catch (error) {
      log({
        context: 'TaskService.create',
        body,
        error,
      })

      notify.warning('Task creation failed. Please try again.')

      throw error
    }
  },

  update(parsedTask: ParsedTask) {
    try {
      const store = useTaskStore()
      const updated = taskCommitter.update(parsedTask)
      store.update(updated)

      notify.success('Task updated successfully.')

      return this.list()
    } catch (error) {
      log({
        context: 'TaskService.update',
        taskId: parsedTask.application.id,
        error,
      })

      notify.warning('Task update failed. Please try again.')

      throw error
    }
  },

  remove(parsedTask: ParsedTask) {
    try {
      const store = useTaskStore()
      const removed = taskCommitter.remove(parsedTask)
      store.remove(removed)

      notify.success('Task removed.')

      return this.list()
    } catch (error) {
      log({
        context: 'TaskService.remove',
        taskId: parsedTask.application.id,
        error,
      })

      notify.warning('Task removal failed. Please try again.')

      throw error
    }
  },
}
