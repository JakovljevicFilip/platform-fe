import { taskListQuery } from './list-query'

import type { Task } from 'src/application/Platform/Example/Task/Domain/Task'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'

import type { List } from 'src/application/Platform/Service/Domain/CQRS/Query/List'

class ListQueryHandler {
  private readonly log: LogAdapter
  private readonly query: List<Task>

  constructor(log: LogAdapter, query: List<Task>) {
    this.log = log
    this.query = query
  }

  async list(): Promise<Task[]> {
    try {
      return await this.query.list()
    } catch (error) {
      this.log.write({
        context: 'Thought.list',
        error,
      })
      throw error
    }
  }
}

export const taskListHandler = new ListQueryHandler(logger, taskListQuery)
