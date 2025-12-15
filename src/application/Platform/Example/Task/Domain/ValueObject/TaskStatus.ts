/**
 * TaskStatus
 * -----------------------------------------------------------------------------
 * Value Object representing the status of a Task.
 * Ensures only valid statuses exist.
 * Comparable by value. Immutable.
 */

export class TaskStatus {
  private constructor(public readonly value: string) {}

  // Allowed statuses
  static readonly PENDING = new TaskStatus('pending')
  static readonly IN_PROGRESS = new TaskStatus('in_progress')
  static readonly DONE = new TaskStatus('done')

  /**
   * Factory: create TaskStatus from raw string.
   */
  static fromString(input: string): TaskStatus {
    switch (input) {
      case 'pending':
        return TaskStatus.PENDING
      case 'in_progress':
        return TaskStatus.IN_PROGRESS
      case 'done':
        return TaskStatus.DONE
      default:
        throw new Error(`Invalid TaskStatus: ${input}`)
    }
  }

  /**
   * Convert to primitive
   */
  toString(): string {
    return this.value
  }

  /**
   * Value Object equality
   */
  equals(other: TaskStatus | string): boolean {
    if (typeof other === 'string') {
      return this.value === other
    }
    return this.value === other.value
  }
}
