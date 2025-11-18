import InAppNotificationFactory from '../Infrastructure/inAppNotification-factory'

const notifier = InAppNotificationFactory.create()

export const notify = {
  success(message: string): void {
    notifier.success(message)
  },
  info(message: string): void {
    notifier.info(message)
  },
  warning(message: string): void {
    notifier.warning(message)
  },
} as const
