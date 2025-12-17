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

import { write as log } from 'src/application/Platform/Log/Application/log-service'

export const rootRunner: Runner = {
  RUNNER_NAME: 'root',

  async execute() {
    log(['Runner.Root.Init', 'starting platform + microservice runners'])

    try {
      log(['Runner.Platform.Init', 'running platform runners'])
      await platformRunner.execute()
      log(['Runner.Platform.End', 'finished all platform runner processes'])
    } catch (error) {
      log(new RunnerError('Platform.Error', error))
    }

    try {
      log(['Runner.Microservice.Init', 'running microservice runners'])
      await microserviceRunner.execute()
      log(['Runner.Microservice.End', 'finished all microservice runner processes'])
    } catch (error) {
      log(new RunnerError('Microservice.Error', error))
    }

    log(['Runner.Root.End', 'finished all runner processes'])
  },
}
