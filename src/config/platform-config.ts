/**
 * All frontend environment variables must start with VITE_.
 * Platform-level configuration shared across the entire application.
 *
 * Usage example:
 *   import PlatformConfig from 'src/config/platform-config'
 *   console.log(PlatformConfig.example)
 */

const PlatformConfig = Object.freeze({
  applicationName: import.meta.env.VITE_PLATFORM_APPLICATION_NAME ?? 'Platform App 2',
})

export default PlatformConfig
