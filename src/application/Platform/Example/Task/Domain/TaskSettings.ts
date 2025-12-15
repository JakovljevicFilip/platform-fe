/**
 * TaskSettings
 * -----------------------------------------------------------------------------
 * Aggregate-level configuration using static getters.
 * Reads values lazily and validates through DomainSettings.require().
 */

import { AggregateSettings } from "src/application/Platform/AggregateSchema/Domain/AggregateSettings"


export class TaskSettings extends AggregateSettings {
  protected static override readonly AGGREGATE_NAME = 'Task'

  private static _MAX_BODY_LENGTH: number | null = null
  private static _MIN_BODY_LENGTH: number | null = null

  private static _initialized = false

  private static init(): void {
    if (this._initialized) return
    this._initialized = true

    this._MAX_BODY_LENGTH = 1000
    this._MIN_BODY_LENGTH = 3
  }

  static get maxBodyLength(): number {
    this.init()
    return this.require(this._MAX_BODY_LENGTH, 'MAX_BODY_LENGTH')
  }

  static get minBodyLength(): number {
    this.init()
    return this.require(this._MIN_BODY_LENGTH, 'MIN_BODY_LENGTH')
  }
}
