import { useNoticesStore } from './notice-store'
import type { DomainNotices } from '../Domain/Notice'

const store = useNoticesStore()

export const notice = {
  setDomainNotices(domainNotices: DomainNotices): void {
    store.setDomainNotices(domainNotices)
  },
  clearDomainNotices(domainName: string): void {
    store.clearDomainNotices(domainName)
  },
  clear(): void {
    store.clear()
  },
} as const
