export interface InAppNotificationAdapter {
  success(message: string): void
  info(message: string): void
  warning(message: string): void
}
