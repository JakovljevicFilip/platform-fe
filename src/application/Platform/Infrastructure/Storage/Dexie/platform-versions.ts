import Dexie from 'dexie'

export const platformDb = new Dexie('PlatformDB')

export function applyPlatformVersions(): void {
  platformDb.version(1).stores({
    task: 'id, body, status, created_at',
  })

  // Add future platform-level versions here
}
