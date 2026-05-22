import type { DarkMode } from '../Domain/DarkMode'

import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore('DarkModeStore', {
  state: () => ({
    darkMode: null as DarkMode | null,
    isReady: false,
  }),

  getters: {
    isDarkActive: (state): boolean => state.darkMode?.value.isDarkActive() ?? false,
  },

  actions: {
    setDarkMode(darkMode: DarkMode) {
      this.darkMode = darkMode
    },

    setReady(value: boolean) {
      this.isReady = value
    },
  },
})
