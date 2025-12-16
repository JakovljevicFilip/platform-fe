import { AggregateSettings } from "../../AggregateSchema/Domain/AggregateSettings"

export type StorageDriver = 'dexie' // future: | 'sqlite' | 'pgsql'

/**
 * StorageSettings
 * -----------------------------------------------------------------------------
 * Top-level storage driver selection using the AggregateSettings pattern.
 */
export class StorageSettings extends AggregateSettings {
  protected static override readonly AGGREGATE_NAME = 'Storage'

  private static _STORAGE_DRIVER: StorageDriver | null = null
  private static _initialized = false

  private static init(): void {
    if (this._initialized) return
    this._initialized = true

    this._STORAGE_DRIVER = 'dexie'
  }

  static get driver(): StorageDriver {
    this.init()
    return this.require(this._STORAGE_DRIVER, 'STORAGE_DRIVER')
  }
}
