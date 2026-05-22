import { useDarkModeStore } from '../darkMode-store'
import { darkModeChangeHandler } from './CQRS/Command/Change/change-handler'
import { darkModeViewHandler } from './CQRS/Query/View/view-handler'
import { DarkModeApplicationError } from '../DarkModeApplicationError'

import type { DarkModeValue } from '../../Domain/ValueObject/DarkModeValue'

import { Dark } from 'quasar'

export const darkModeService = {
  // COMMANDS
  async change(newValue: boolean): Promise<void> {
    const store = useDarkModeStore()
    const darkMode = store.darkMode
    if (darkMode === null) {
      throw new DarkModeApplicationError('darkMode store property is null.', 'service.change')
    }
    await darkModeChangeHandler.change(darkMode, newValue)
    await this.load()
  },

  // QUERIES
  async load(): Promise<void> {
    const darkMode = await darkModeViewHandler.view()
    if (darkMode === null) {
      throw new DarkModeApplicationError('Dark mode entity is missing.', 'service.first')
    }
    const store = useDarkModeStore()
    store.setDarkMode(darkMode)
    this.applyDarkTheme(darkMode.value)
    store.isReady = true
  },

  applyDarkTheme(darkMode: DarkModeValue): void {
    Dark.set(darkMode.getQuasarFriendlyValue())
  },
}
