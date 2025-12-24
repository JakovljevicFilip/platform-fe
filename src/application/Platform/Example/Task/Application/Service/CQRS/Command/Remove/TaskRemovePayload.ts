import type { Task } from 'src/application/Platform/Example/Task/Domain/Task'

import type { CommandPayload } from 'src/application/Platform/Service/Domain/CQRS/Command/CommandPayload'

export interface TaskRemovePayload extends CommandPayload {
  task: Task
}
