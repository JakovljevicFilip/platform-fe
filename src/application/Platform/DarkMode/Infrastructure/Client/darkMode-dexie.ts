import type { DarkModeDexieORM } from './DarkModeDexieORM'

import type { DarkMode } from '../../Domain/DarkMode'
import type { DarkModeRepository } from '../../Domain/DarkModeRepository'
import type { DarkModeId } from '../../Domain/ValueObject/DarkModeId'
import { DarkModeAggregate } from '../../Domain/DarkModeAggregate'

import type { DexieRepository } from 'src/application/Platform/Storage/Dexie/Domain/DexieRepository'

export class DarkModeDexie implements DarkModeRepository {
  constructor(private readonly client: DexieRepository) {}

  async findOneById(id: DarkModeId): Promise<DarkMode | null> {
    const row = (await this.client.findOneById(id.toString())) as DarkModeDexieORM | null
    if (row === null) {
      return null
    }

    const aggregate = new DarkModeAggregate()
    return aggregate.rebuild(row.id, row.value)
  }

  async change(darkMode: DarkMode): Promise<string> {
    const orm = {
      id: darkMode.id.toString(),
      value: darkMode.value.toString(),
    }

    return await this.client.update(orm)
  }

  async createEntity(darkMode: DarkMode): Promise<string> {
    const orm = {
      id: darkMode.id.toString(),
      value: darkMode.value.toString(),
    }

    return await this.client.create(orm)
  }
}
