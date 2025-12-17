/**
 * storage-maker.ts
 * -----------------------------------------------------------------------------
 * Maker–Client provider for selecting storage implementations.
 */
import type { StorageClient } from '../Domain/StorageClient'
import { createDexieClient } from '../../Storage/Dexie/Infrastructure/dexie-client'

export class StorageMaker {
  static make(aggregateName: string): StorageClient {
    const tableName = aggregateName
      .replace(/[A-Z]/g, letter => '_' + letter.toLowerCase())
      .replace(/^_/, '')

    return createDexieClient(tableName)
  }
}
