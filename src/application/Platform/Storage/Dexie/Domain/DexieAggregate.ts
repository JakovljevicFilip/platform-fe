/**
 * DexieAggregate
 * -----------------------------------------------------------------------------
 * Domain-level gateway into Dexie.
 * Responsible for:
 *  - returning Dexie DB instances
 *  - resolving tables
 *  - providing Dexie-native CRUD and query behavior
 *
 * DexieClient calls these static methods to perform operations.
 */
import { platformDb } from 'src/application/Platform/Infrastructure/Storage/Dexie/platform-versions'
import { microserviceDb } from 'src/application/Required/Infrastructure/Storage/Dexie/microservice-versions'

import { type Dexie, type IndexableType, type Table } from 'dexie'

export class DexieAggregate {
  static makeMicroserviceDb(): Dexie {
    return microserviceDb
  }

  static makePlatformDb(): Dexie {
    return platformDb
  }

  private static table<T extends Record<string, unknown>>(
    db: Dexie,
    tableName: string
  ): Table<T, IndexableType> {
    return db.table<T>(tableName)
  }

  static create<T extends Record<string, unknown>>(
    db: Dexie,
    tableName: string,
    data: T
  ): Promise<IndexableType> {
    return this.table<T>(db, tableName).add(data)
  }

  static update<T extends Record<string, unknown>>(
    db: Dexie,
    tableName: string,
    data: T
  ): Promise<IndexableType> {
    return this.table<T>(db, tableName).put(data)
  }

  static delete(db: Dexie, tableName: string, id: string): Promise<void> {
    return this.table(db, tableName).delete(id)
  }

  static deleteMultiple(db: Dexie, tableName: string, ids: string[]): Promise<void> {
    return db.table(tableName).bulkDelete(ids)
  }

  static list<T extends Record<string, unknown>>(db: Dexie, tableName: string): Promise<T[]> {
    return this.table<T>(db, tableName).toArray()
  }

  static findOneById<T extends Record<string, unknown>>(
    db: Dexie,
    tableName: string,
    id: string
  ): Promise<T | undefined> {
    return this.table<T>(db, tableName).get(id)
  }

  static where<T extends Record<string, unknown>>(
    db: Dexie,
    tableName: string,
    index: string,
    value: IndexableType
  ): Promise<T[]> {
    return this.table<T>(db, tableName).where(index).equals(value).toArray()
  }
}
