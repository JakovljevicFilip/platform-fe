/**
 * Run (Execution Unit)
 * -----------------------------------------------------------------------------
 * Canonical domain representation of a single executable process.
 *
 * - Represents one concrete unit of work
 * - Encapsulates a single side-effect or operation
 * - Stateless and independently executable
 *
 * Runs are executed and coordinated by a Runner.
 */

export interface Run {
  /** Identifier for logging or debugging */
  readonly RUN_NAME: string
  /** Execute the run process */
  run(): Promise<void> | void
}
