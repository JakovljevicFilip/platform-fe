import { useNoticesStore } from './notice-store'
import type { DomainNotices, Notice } from '../Domain/Notice'

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
  addDomainNotice(domainName: string, notice: Notice): void {
    store.addDomainNotice(domainName, notice)
  },
  clearDomainScenario(domain: string, scenario: string): void {
    store.clearDomainScenario(domain, scenario)
  },
} as const
