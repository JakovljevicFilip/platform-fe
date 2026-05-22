import { darkModeViewQuery } from './view-query'

import type { DarkMode } from 'src/application/Platform/DarkMode/Domain/DarkMode'
import { DarkModeId } from 'src/application/Platform/DarkMode/Domain/ValueObject/DarkModeId'
import { DarkModeSettings } from 'src/application/Platform/DarkMode/Domain/DarkModeSettings'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'

import type { View } from 'src/application/Platform/Service/Domain/CQRS/Query/View'

class ViewQueryHandler {
  private readonly log: LogAdapter
  private readonly query: View<DarkModeId, DarkMode>

  constructor(log: LogAdapter, query: View<DarkModeId, DarkMode>) {
    this.log = log
    this.query = query
  }

  async view(): Promise<DarkMode | null> {
    try {
      const id = new DarkModeId(DarkModeSettings.darkModeRowId)
      return await this.query.view(id)
    } catch (error) {
      this.log.write({
        context: 'query.view',
        error,
      })
      throw error
    }
  }
}

export const darkModeViewHandler = new ViewQueryHandler(logger, darkModeViewQuery)
