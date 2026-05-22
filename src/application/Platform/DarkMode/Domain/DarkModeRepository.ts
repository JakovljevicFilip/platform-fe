import type { DarkMode } from './DarkMode'
import type { DarkModeId } from './ValueObject/DarkModeId'

import type { AggregateRepository } from 'src/application/Platform/AggregateSchema/Domain/AggregateRepository'

export interface DarkModeRepository extends AggregateRepository {
  change(darkMode: DarkMode): Promise<string>
  createEntity(darkMode: DarkMode): Promise<string>
  findOneById(id: DarkModeId): Promise<DarkMode | null>
}
