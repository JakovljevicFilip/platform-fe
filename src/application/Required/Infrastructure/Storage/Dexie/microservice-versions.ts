import Dexie from 'dexie'

export const microserviceDb = new Dexie('MicroserviceDb')

export function applyMicroserviceVersions(): void {
  // Add future platform-level versions here
}
