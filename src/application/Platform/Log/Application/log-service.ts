import LogFactory from '../Infrastructure/log-factory'

export function write(value: unknown): void {
  const logger = LogFactory.create()
  logger.write(value)
}
