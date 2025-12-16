import { dexieBoot } from '../Dexie/Application/dexie-boot'

export async function runStorageBoot(): Promise<void> {
  await dexieBoot.boot()
}
