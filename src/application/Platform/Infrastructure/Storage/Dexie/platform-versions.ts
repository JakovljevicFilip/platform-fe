import Dexie from 'dexie'

export const platformDb = new Dexie('PlatformDB')

export async function applyPlatformVersions(): Promise<void> {
  platformDb.version(1).stores({
    task: 'id, body, status, created_at',
  })

  // Add future platform-level versions here

  await platformDb.open()
}
