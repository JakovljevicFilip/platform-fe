import { boot } from 'quasar/wrappers'
import { runStorageBoot } from 'src/application/Platform/Storage/Application/storage-boot'

export default boot(async () => {
  await runStorageBoot()
})
