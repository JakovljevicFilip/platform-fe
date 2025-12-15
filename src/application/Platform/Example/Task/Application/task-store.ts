/**
 * Task Store
 * -----------------------------------------------------------------------------
 * TEMPORARY in-memory store that holds domain aggregate entities.
 *
 * NOTE:
 *   After adding real Infrastructure, this store will instead keep
 *   parsed entities or hydrated view-models.
 */
import { type Task } from '../Domain/Task'
import { type ParsedTask } from './Types/ParsedTask'

import { defineStore } from 'pinia'

export const useTaskStore = defineStore('TaskStore', {
  state: () => ({
    tasks: [] as Task[],
    // TODO: Remove parsedTask property and everything related to it after storage is added.
    parsedTasks: [] as ParsedTask[],
  }),

  actions: {
    add(task: Task) {
      this.tasks.push(task)
    },

    update(task: Task) {
      this.tasks = this.tasks.map(t => (t.id.toString() === task.id.toString() ? task : t))
    },

    remove(task: Task) {
      this.tasks = this.tasks.filter(t => t.id.toString() !== task.id.toString())
    },

    setAll(tasks: Task[]) {
      this.tasks = tasks
    },

    setParsed(tasks: ParsedTask[]) {
      this.parsedTasks = tasks
    },
  },
})
