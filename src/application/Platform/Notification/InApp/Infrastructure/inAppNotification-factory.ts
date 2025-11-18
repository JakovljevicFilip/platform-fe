import type { InAppNotificationAdapter } from '../Domain/InAppNotification'
import QuasarAdapter from './Adapter/quasar-adapter'

export default class InAppNotificationFactory {
  static create(): InAppNotificationAdapter {
    return new QuasarAdapter()
  }
}
