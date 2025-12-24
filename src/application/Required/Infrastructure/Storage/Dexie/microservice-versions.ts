import Dexie from 'dexie'

export const microserviceDb = new Dexie('MicroserviceDb')

export async function applyMicroserviceVersions(): Promise<void> {
  // Add future platform-level versions here
  await Promise.resolve()
}
