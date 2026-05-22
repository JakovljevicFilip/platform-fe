import { DarkModeDomainError } from '../DarkModeDomainError'

type DarkModeRebuildRule = {
  canRebuild(props: { id: unknown; value: unknown }): asserts props is {
    id: string
    value: string
  }
}

export const darkModeRebuildRule: DarkModeRebuildRule = {
  canRebuild(props) {
    const { id, value } = props

    if (typeof id !== 'string' || typeof value !== 'string') {
      throw new DarkModeDomainError('Invalid Dark Mode persistence shape.', props)
    }
  },
}
