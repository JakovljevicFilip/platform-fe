/**
 * CreateDemoTaskRun
 * -----------------------------------------------------------------------------
 * Infrastructure Run that creates a demo Task instance.
 *
 * - Implements a single executable process
 * - Performs persistence and aggregate reconstruction
 * - Intended for demonstration and validation purposes
 *
 * Executed as part of a Runner-controlled execution flow.
 */

import { TaskAggregate } from '../../Domain/TaskAggregate'
import { taskStorage } from '../../Infrastructure/task-storage'

import type { Run } from 'src/application/Platform/Runner/Domain/Run'
import { write as log } from 'src/application/Platform/Log/Application/log-service'

export const createDemoTask: Run = {
  RUN_NAME: 'Runner.Platform.Task.CreateDemo',

  async run() {
    log([this.RUN_NAME, 'creating run example task'])
    const exampleTask = TaskAggregate.createRunnerExampleTask()
    const storedTask = await taskStorage.findOneById(exampleTask.id)

    if (storedTask === null) {
      await taskStorage.save(exampleTask)
      return
    }
  },
}
