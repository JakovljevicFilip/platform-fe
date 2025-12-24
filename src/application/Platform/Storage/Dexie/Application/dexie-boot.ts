import { applyPlatformVersions } from 'src/application/Platform/Infrastructure/Storage/Dexie/platform-versions'
import { applyMicroserviceVersions } from 'src/application/Required/Infrastructure/Storage/Dexie/microservice-versions'

import type { StorageBoot } from 'src/application/Platform/Storage/Domain/StorageBoot'

export class DexieBoot implements StorageBoot {
  async boot(): Promise<void> {
    await applyPlatformVersions()
    await applyMicroserviceVersions()
  }
}

export const dexieBoot = new DexieBoot()
