import { DarkModeAggregate } from '../../Domain/DarkModeAggregate'
import { darkModeStorage } from '../../Infrastructure/darkMode-storage'

import { logger } from 'src/application/Platform/Log/Application/log-service'

import type { Run } from 'src/application/Platform/Runner/Domain/Run'

export const createDarkModeEntity: Run = {
  RUN_NAME: 'Runner.Platform.DarkMode.CreateDarkModeEntity',

  async run() {
    logger.write([this.RUN_NAME, 'creating dark mode entity'])
    const darkMode = DarkModeAggregate.createEntity()
    const entity = await darkModeStorage.findOneById(darkMode.id)

    if (entity === null) {
      await darkModeStorage.createEntity(darkMode)
      return
    }
  },
}
