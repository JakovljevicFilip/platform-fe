/**
 * RootRunner
 * -----------------------------------------------------------------------------
 * Top-level application coordinator responsible for executing all system Runners.
 *
 * - Orchestrates Platform and Microservice runners
 * - Defines global execution order
 *
 * Serves as the single entry point into the Runner system.
 */

import type { Runner } from '../Domain/Runner'
import { RunnerError } from '../Domain/RunnerError'

import { platformRunner } from '../../Application/platform-runner'
import { microserviceRunner } from 'src/application/Required/Application/microservice-runner'
import { logger } from '../../Log/Application/log-service'

export const rootRunner: Runner = {
  RUNNER_NAME: 'root',

  async execute() {
    logger.write(['Runner.Root.Init', 'starting platform + microservice runners'])

    try {
      logger.write(['Runner.Platform.Init', 'running platform runners'])
      await platformRunner.execute()
      logger.write(['Runner.Platform.End', 'finished all platform runner processes'])
    } catch (error) {
      logger.write(new RunnerError('Platform.Error', error))
    }

    try {
      logger.write(['Runner.Microservice.Init', 'running microservice runners'])
      await microserviceRunner.execute()
      logger.write(['Runner.Microservice.End', 'finished all microservice runner processes'])
    } catch (error) {
      logger.write(new RunnerError('Microservice.Error', error))
    }

    logger.write(['Runner.Root.End', 'finished all runner processes'])
  },
}
