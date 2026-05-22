import type { DarkModeChangePayload } from './DarkModeChangePayload'

import { DarkModeAggregate } from 'src/application/Platform/DarkMode/Domain/DarkModeAggregate'
import type { DarkMode } from 'src/application/Platform/DarkMode/Domain/DarkMode'

import { darkModeStorage } from 'src/application/Platform/DarkMode/Infrastructure/darkMode-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class DarkModeChangeCommand implements Command {
  async command(payload: DarkModeChangePayload): Promise<string> {
    const changed = this.commit(payload)
    return await darkModeStorage.change(changed)
  }

  commit(payload: DarkModeChangePayload): DarkMode {
    return DarkModeAggregate.change(payload.darkMode, payload.newValue)
  }
}

export const darkModeChangeCommand = new DarkModeChangeCommand()
