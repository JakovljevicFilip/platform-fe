import type { DarkMode } from 'src/application/Platform/DarkMode/Domain/DarkMode'
import type { DarkModeId } from 'src/application/Platform/DarkMode/Domain/ValueObject/DarkModeId'

import { darkModeStorage } from 'src/application/Platform/DarkMode/Infrastructure/darkMode-storage'

import type { View } from 'src/application/Platform/Service/Domain/CQRS/Query/View'

class ViewQuery implements View<DarkModeId, DarkMode> {
  async view(id: DarkModeId): Promise<DarkMode | null> {
    return await darkModeStorage.findOneById(id)
  }
}

export const darkModeViewQuery = new ViewQuery()
