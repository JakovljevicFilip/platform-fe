/**
 * Runner (Run Coordinator)
 * -----------------------------------------------------------------------------
 * Coordinator responsible for executing multiple Run processes.
 *
 * - Defines execution order and grouping of Runs
 * - Contains no business logic or side-effects itself
 *
 * Acts as an execution boundary between orchestration and concrete Runs.
 */

export interface Runner {
  /** Name of this runner */
  readonly RUNNER_NAME: string
  /** Executes one or more run processes */
  execute(): Promise<void> | void
}
