import { AggregateSettings } from 'src/application/Platform/AggregateSchema/Domain/AggregateSettings'

export class DarkModeSettings extends AggregateSettings {
  protected static override readonly AGGREGATE_NAME = 'DarkMode'

  // Row id is required by Dexie client.
  // Value has to be a UUID string.
  private static _DARK_MODE_ROW_ID: string
  private static _DARK_MODE_DEFAULT_VALUE: string

  private static _initialized = false

  private static init(): void {
    if (this._initialized) return
    this._initialized = true

    this._DARK_MODE_ROW_ID = '6f3c2b1e-9c4d-4a7b-8d2f-1c9e5a0b3d77'
    this._DARK_MODE_DEFAULT_VALUE = 'auto'
  }

  static get darkModeRowId(): string {
    this.init()
    return this.require(this._DARK_MODE_ROW_ID, 'DARK_MODE_ROW_ID')
  }

  static get darkModeDefaultValue(): string {
    this.init()
    return this.require(this._DARK_MODE_DEFAULT_VALUE, 'DARK_MODE_DEFAULT_VALUE')
  }
}
