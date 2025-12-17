/**
 * Task Store
 * -----------------------------------------------------------------------------
 * Application-level state store for Task ParsedApplicationEntities.
 */
import { type ParsedTask } from './Types/ParsedTask'

import { defineStore } from 'pinia'

export const useTaskStore = defineStore('TaskStore', {
  state: () => ({
    tasks: [] as ParsedTask[],
  }),

  actions: {
    set(tasks: ParsedTask[]) {
      this.tasks = tasks
    },
  },
})
