/**
 * validation-helper.ts
 * -----------------------------------------------------------------------------
 * Dexie-specific runtime validation helpers.
 *
 * Enforces invariants required by DexieRepository contracts.
 */

import type { DexieORM } from '../Domain/DexieRepository'
import { DexieError } from '../Domain/DexieError'

export function assertStringId(
  value: unknown,
  context: Record<string, unknown>,
): string {
  if (typeof value !== 'string') {
    throw new DexieError('Expected string id', {
      value,
      ...context,
    })
  }

  return value
}

export function assertPrimaryKey(
  id: unknown,
  tableName: string,
): string {
  return assertStringId(id, {
    table: tableName,
    source: 'primary-key',
  })
}

export function assertDexieORM(
  record: Record<string, unknown>,
  tableName: string,
): DexieORM {
  return {
    ...record,
    id: assertStringId(record.id, {
      table: tableName,
      source: 'record',
      record,
    }),
  }
}
