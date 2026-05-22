import { DarkModeDexie } from './Client/darkMode-dexie'

import type { DarkModeRepository } from '../Domain/DarkModeRepository'
import type { DarkMode } from '../Domain/DarkMode'
import type { DarkModeId } from '../Domain/ValueObject/DarkModeId'

import { StorageMaker } from 'src/application/Platform/Storage/Infrastructure/storage-maker'

class DarkModeStorage implements DarkModeRepository {
  private readonly repo: DarkModeRepository

  constructor() {
    const client = StorageMaker.make('DarkMode')
    client.changeToPlatformClient()
    this.repo = new DarkModeDexie(client)
  }

  findOneById(id: DarkModeId): Promise<DarkMode | null> {
    return this.repo.findOneById(id)
  }
  change(darkMode: DarkMode): Promise<string> {
    return this.repo.change(darkMode)
  }
  createEntity(darkMode: DarkMode): Promise<string> {
    return this.repo.createEntity(darkMode)
  }
}

export const darkModeStorage = new DarkModeStorage()
