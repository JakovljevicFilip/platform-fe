/**
 * ParsedTask
 * -----------------------------------------------------------------------------
 * Parsed Task representation with separate application-only shape.
 */
import type { Task } from '../../Domain/Task'

import { type ParsedApplicationEntity } from 'src/application/Platform/AggregateSchema/Application/Types/ParsedApplicationEntity'

export interface TaskApplicationEntity {
  id: string
  body: string
  status: string
  createdAt: Date

  // UI-only
  isEditing: boolean
  editBody: string
  isSelected: boolean
}

export type ParsedTask = ParsedApplicationEntity<Task, TaskApplicationEntity>
