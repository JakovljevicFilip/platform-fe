/**
 * StorageClient
 * -----------------------------------------------------------------------------
 * Closed union of known storage capabilities. (Dexie, SQLite, LocalStorage, etc.).
 */

import type { DexieStorageClient } from '../Dexie/Domain/DexieStorageClient'

export type StorageClient = DexieStorageClient
// | SQLiteStorageClient
