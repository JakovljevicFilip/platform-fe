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

export class TaskAggregate extends Aggregate<Task> {
  static record(body: string): Task {
    taskRules.canRecord(body)

    return new Task(TaskId.generate(), body.trim(), TaskStatus.PENDING, new Date())
  }

  override rebuild(id: string, body: string, status: string, created_at: string): Task {
    taskRules.canRebuild({ id, body, status, created_at })

    return new Task(
      TaskId.fromString(id),
      body,
      TaskStatus.fromString(status),
      new Date(created_at)
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
}
