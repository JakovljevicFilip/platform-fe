/**
 * All frontend environment variables must start with VITE_.
 * Microservice-specific configuration values.
 *
 * Usage example:
 *   import MicroserviceConfig from 'src/config/microservice-config'
 *   console.log(MicroserviceConfig.example)
 */

const MicroserviceConfig = Object.freeze({
  example: import.meta.env.VITE_MICROSERVICE_EXAMPLE ?? 'microservice-default',
})

export default MicroserviceConfig
