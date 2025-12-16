/**
 * StorageClient
 * -----------------------------------------------------------------------------
 * Marker contract for all storage clients (Dexie, SQLite, LocalStorage, etc.).
 */
export interface StorageClient {
  readonly CLIENT_NAME: string
}
