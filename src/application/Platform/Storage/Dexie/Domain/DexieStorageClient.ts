import type { DexieRepository } from './DexieRepository'

export type DexieStorageClient = DexieRepository & {
  readonly CLIENT_NAME: 'dexie'
}
