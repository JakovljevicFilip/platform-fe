/**
 * DexieClient
 * -----------------------------------------------------------------------------
 * Stateful storage adapter.
 *
 * - Holds current DB instance internally
 * - Defaults to Microservice DB
 * - Supports switching DB at runtime:
 *     changeToPlatformClient()
 *     changeToMicroserviceClient()
 *
 * All operations delegate directly to DexieAggregate.
 */
import type Dexie from 'dexie'

import type { StorageClient } from '../../Domain/StorageClient'
import type { DexieRepository, DexieORM } from '../Domain/DexieRepository'
import { DexieAggregate } from '../Domain/DexieAggregate'
import { assertDexieORM, assertPrimaryKey } from './invariant-helper'

export class DexieClient implements StorageClient, DexieRepository {
  readonly CLIENT_NAME = 'dexie'

  private db: Dexie

  constructor(private readonly tableName: string) {
    this.db = DexieAggregate.makeMicroserviceDb()
  }

  changeToPlatformClient(): void {
    this.db = DexieAggregate.makePlatformDb()
  }

  changeToMicroserviceClient(): void {
    this.db = DexieAggregate.makeMicroserviceDb()
  }

  async create(data: DexieORM): Promise<string> {
    const id = await DexieAggregate.create(this.db, this.tableName, data)
    return assertPrimaryKey(id, this.tableName)
  }

  async update(data: DexieORM): Promise<string> {
    const id = await DexieAggregate.update(this.db, this.tableName, data)
    return assertPrimaryKey(id, this.tableName)
  }

  async delete(id: string): Promise<string> {
    await DexieAggregate.delete(this.db, this.tableName, id)
    return id
  }

  async deleteMultiple(ids: string[]): Promise<string[]> {
    await DexieAggregate.deleteMultiple(this.db, this.tableName, ids)
    return ids
  }

  async list(): Promise<DexieORM[]> {
    const records = await DexieAggregate.list(this.db, this.tableName)
    return records.map(r => assertDexieORM(r, this.tableName))
  }

  async findOneById(id: string): Promise<DexieORM | null> {
    const record = await DexieAggregate.findOneById(this.db, this.tableName, id)

    return record ? assertDexieORM(record, this.tableName) : null
  }

  async where(index: string, value: unknown): Promise<DexieORM[]> {
    const records = await DexieAggregate.where(this.db, this.tableName, index, value as never)

    return records.map(r => assertDexieORM(r, this.tableName))
  }
}

/**
 * Factory function.
 */
export function createDexieClient(tableName: string): DexieClient {
  return new DexieClient(tableName)
}
