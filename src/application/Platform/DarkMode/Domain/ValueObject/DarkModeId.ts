import { Uuid } from 'src/application/Platform/AggregateSchema/Domain/ValueObject/Uuid'

export class DarkModeId extends Uuid {
  static override generate(): DarkModeId {
    return new DarkModeId(crypto.randomUUID())
  }

  static override fromString(input: string): DarkModeId {
    return new DarkModeId(input)
  }
}
