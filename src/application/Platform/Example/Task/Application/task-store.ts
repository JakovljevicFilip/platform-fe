/**
 * Task Store
 * -----------------------------------------------------------------------------
 * Application-level state store for Task ParsedApplicationEntities.
 */
import type { Task } from '../Domain/Task'

import { defineStore } from 'pinia'

export const useTaskStore = defineStore('TaskStore', {
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    set(tasks: Task[]) {
      this.tasks = tasks
    },
  },
})
