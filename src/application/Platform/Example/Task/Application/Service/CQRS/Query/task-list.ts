/**
 * Task List Query
 * -----------------------------------------------------------------------------
 * Read-side CQRS query responsible for retrieving all Task aggregates
 * and converting them into parsed application-layer entities.
 */

import type { ParsedTask } from '../../../Types/ParsedTask'
import { taskParser } from './task-parser'
import type { Task } from '../../../../Domain/Task'

import { taskStorage } from '../../../../Infrastructure/task-storage'

import type { List } from 'src/application/Platform/Service/Domain/CQRS/Query/List'

export class TaskList implements List<Task, ParsedTask> {
  async list(): Promise<ParsedTask[]> {
    const tasks = await taskStorage.findAll()
    return this.parse(tasks)
  }

  parse(tasks: Task[]): ParsedTask[] {
    return taskParser.parseMany(tasks)
  }
}

export const taskList = new TaskList()
