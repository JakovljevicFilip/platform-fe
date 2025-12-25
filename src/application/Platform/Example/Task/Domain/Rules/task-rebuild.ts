import { TaskDomainError } from '../TaskDomainError'

type TaskRebuildRule = {
  canRebuild(props: { body: unknown; status: unknown; created_at: unknown }): asserts props is {
    body: string
    status: string
    created_at: Date
  }
}

export const taskRebuildRule: TaskRebuildRule = {
  canRebuild(props) {
    const { body, status, created_at } = props

    if (typeof body !== 'string' || typeof status !== 'string' || !(created_at instanceof Date)) {
      throw new TaskDomainError('Invalid Task persistence shape.', props)
    }
  },
}
