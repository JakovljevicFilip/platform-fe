/**
 * TaskAggregate
 * -----------------------------------------------------------------------------
 * Aggregate root for the Task domain.
 */

import { taskRules } from './Rules/task-rules'
import { TaskStatus } from './ValueObject/TaskStatus'
import { TaskId } from './ValueObject/TaskId'
import type { Task } from './Task'

import { Aggregate } from 'src/application/Platform/AggregateSchema/Domain/Aggregate'

export class TaskAggregate extends Aggregate<Task> {
  static record(body: string): Task {
    taskRules.canRecord(body)

    return {
      id: TaskId.generate(),
      body: body.trim(),
      status: TaskStatus.PENDING,
      created_at: new Date(),
    }
  }

  override rebuild(id: string, body: string, status: string, created_at: string): Task {
    taskRules.canRebuild({ id, body, status, created_at })

    return {
      id: TaskId.fromString(id),
      body,
      status: TaskStatus.fromString(status),
      created_at: new Date(created_at),
    }
  }

  static change(task: Task, newBody: string): Task {
    taskRules.canChange(task.status, newBody)

    return {
      ...task,
      body: newBody.trim(),
    }
  }

  static remove(task: Task): Task {
    taskRules.canRemove(task.status)
    return { ...task }
  }
}
