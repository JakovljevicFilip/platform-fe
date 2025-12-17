/**
 * Runner Boot Entry
 * -----------------------------------------------------------------------------
 * Framework-level boot file executed during application startup.
 */

import { rootRunner } from 'src/application/Platform/Runner/Application/root-runner'

import { boot } from 'quasar/wrappers'

export default boot(async () => {
  await rootRunner.execute()
})
