import type { CommandPayload } from 'src/application/Platform/Service/Domain/CQRS/Command/CommandPayload'

export interface TaskAddPayload extends CommandPayload {
  body: string
}
