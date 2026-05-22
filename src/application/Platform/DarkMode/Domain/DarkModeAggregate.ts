import { darkModeRebuildRule } from './Rules/darkMode-rules'
import { DarkMode } from './DarkMode'
import { DarkModeSettings } from './DarkModeSettings'
import { DarkModeId } from './ValueObject/DarkModeId'
import { DarkModeValue } from './ValueObject/DarkModeValue'

import { Aggregate } from '../../AggregateSchema/Domain/Aggregate'

export class DarkModeAggregate extends Aggregate<DarkMode> {
  AGGREGATE_NAME = 'DarkMode'

  override rebuild(id: string, value: string): DarkMode {
    const props: {
      id: unknown
      value: unknown
    } = { id, value }

    darkModeRebuildRule.canRebuild(props)

    return new DarkMode(new DarkModeId(props.id), DarkModeValue.fromString(props.value))
  }

  static change(darkMode: DarkMode, newValue: boolean): DarkMode {
    if (newValue) {
      return new DarkMode(darkMode.id, DarkModeValue.DARK)
    }

    return new DarkMode(darkMode.id, DarkModeValue.LIGHT)
  }

  static createEntity(): DarkMode {
    return new DarkMode(
      new DarkModeId(DarkModeSettings.darkModeRowId),
      DarkModeValue.fromString(DarkModeSettings.darkModeDefaultValue)
    )
  }
}
