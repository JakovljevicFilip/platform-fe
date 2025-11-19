import { type DomainNotices, Notices } from '../Domain/Notice'

import { defineStore } from 'pinia'

export const useNoticesStore = defineStore('notice', {
  state: () => ({
    notices: new Notices(),
  }),

  actions: {
    setDomainNotices(domainNotices: DomainNotices) {
      this.notices.notices = [
        ...this.notices.notices.filter(dn => dn.domainName !== domainNotices.domainName),
        domainNotices,
      ]
    },
    clearDomainNotices(domainName: string) {
      this.notices.notices = this.notices.notices.filter(dn => dn.domainName !== domainName)
    },
    clear() {
      this.notices = new Notices()
    },
  },
})
