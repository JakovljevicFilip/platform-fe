import type { DarkModeId } from './ValueObject/DarkModeId'

import type { AggregateEntity } from '../../AggregateSchema/Domain/AggregateEntity'
import type { DarkModeValue } from './ValueObject/DarkModeValue'

export class DarkMode implements AggregateEntity {
  constructor(
    public readonly id: DarkModeId,
    public readonly value: DarkModeValue
  ) {}
}
