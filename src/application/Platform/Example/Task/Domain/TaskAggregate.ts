/**
 * TaskAggregate
 * -----------------------------------------------------------------------------
 * Aggregate root for the Task domain.
 */

import { taskRules } from './Rules/task-rules'
import { TaskStatus } from './ValueObject/TaskStatus'
import { TaskId } from './ValueObject/TaskId'
import { Task } from './Task'

import { Aggregate } from 'src/application/Platform/AggregateSchema/Domain/Aggregate'
import { taskRebuildRule } from './Rules/task-rebuild'

export class TaskAggregate extends Aggregate<Task> {
  static record(body: string): Task {
    taskRules.canRecord(body)

    return new Task(TaskId.generate(), body.trim(), TaskStatus.PENDING, new Date())
  }

  override rebuild(id: string, body: unknown, status: unknown, created_at: unknown): Task {
    const props: {
      body: unknown
      status: unknown
      created_at: unknown
    } = { body, status, created_at }

    taskRebuildRule.canRebuild(props)

    return new Task(
      TaskId.fromString(id),
      props.body,
      TaskStatus.fromString(props.status),
      props.created_at
    )
  }

  static change(task: Task, newBody: string): Task {
    taskRules.canChange(task.status, newBody)

    return new Task(task.id, newBody.trim(), task.status, task.created_at)
  }

  static remove(task: Task): Task {
    taskRules.canRemove(task.status)
    return task
  }

  static createRunnerExampleTask(): Task {
    const id = TaskId.fromString('3b858f65-cbb3-4d98-ba38-400ea8e99727')
    return new Task(id, 'This task was made by a run process.', TaskStatus.PENDING, new Date())
  }
}
