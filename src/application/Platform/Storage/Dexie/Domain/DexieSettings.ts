/**
 * DexieSettings
 * -----------------------------------------------------------------------------
 * Dexie-specific configuration placeholder using AggregateSettings pattern.
 */

import { AggregateSettings } from 'src/application/Platform/AggregateSchema/Domain/AggregateSettings'

export class DexieSettings extends AggregateSettings {
  protected static override readonly AGGREGATE_NAME = 'Dexie'
}
