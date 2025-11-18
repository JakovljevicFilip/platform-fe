import type { InAppNotificationAdapter } from '../../Domain/InAppNotification'

import { Notify } from 'quasar'

export default class QuasarAdapter implements InAppNotificationAdapter {
  success(message: string): void {
    Notify.create({ type: 'positive', message })
  }
  info(message: string): void {
    Notify.create({ type: 'info', message })
  }
  warning(message: string): void {
    Notify.create({ type: 'warning', message })
  }
}
