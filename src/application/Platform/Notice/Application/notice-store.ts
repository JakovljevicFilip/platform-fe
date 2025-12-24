import type { Notice } from '../Domain/Notice'
import { DomainNotices, Notices } from '../Domain/Notice'

import { defineStore } from 'pinia'

export const useNoticesStore = defineStore('notice', {
  state: () => ({
    notices: new Notices(),
  }),

  actions: {
    setDomainNotices(domainNotices: DomainNotices) {
      const index = this.notices.notices.findIndex(dn => dn.domainName === domainNotices.domainName)

      if (index === -1) {
        this.notices.notices.push(domainNotices)
        return
      }

      this.notices.notices[index] = domainNotices
    },

    clearDomainNotices(domainName: string) {
      this.notices.notices = this.notices.notices.filter(dn => dn.domainName !== domainName)
    },

    clear() {
      this.notices = new Notices()
    },

    addDomainNotice(domainName: string, notice: Notice) {
      let domain = this.notices.notices.find(dn => dn.domainName === domainName)

      if (!domain) {
        domain = new DomainNotices(domainName, [])
        this.notices.notices.push(domain)
      }

      domain.notices = [...domain.notices.filter(n => n.scenario !== notice.scenario), notice]
    },

    clearDomainScenario(domainName: string, scenario: string) {
      const domain = this.notices.notices.find(dn => dn.domainName === domainName)
      if (!domain) return

      domain.notices = domain.notices.filter(n => n.scenario !== scenario)

      if (domain.notices.length === 0) {
        this.clearDomainNotices(domainName)
      }
    },
  },
})
