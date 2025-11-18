/**
 * All frontend environment variables must start with VITE_.
 * Platform-level configuration shared across the entire application.
 *
 * Usage example:
 *   import PlatformConfig from 'src/config/platform-config'
 *   console.log(PlatformConfig.example)
 */

const PlatformConfig = Object.freeze({
  example: import.meta.env.VITE_PLATFORM_EXAMPLE ?? 'platform-default',
})

export default PlatformConfig
