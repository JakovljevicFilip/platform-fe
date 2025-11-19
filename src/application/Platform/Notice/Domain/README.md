# Platform Notice Module

## 1. Overview

Provides the platform-level notice abstraction used to display persistent, stacked messages at the top of the application.
Notices communicate informational messages, warnings, or dangers across different domains without binding application logic to any specific UI framework (e.g., Quasar).

Unlike in-app notifications (which disappear automatically), notices remain visible until cleared by the application.

## 2. Structure

```text
/src/application/Platform/Notice/
 ├─ Application/
 │   ├─ NoticeComponent.vue      # UI component rendering persistent notices
 │   ├─ notice-service.ts        # Public API for setting & clearing notices
 │   └─ notice-store.ts          # Pinia store holding all domain notices
 ├─ Domain/
 │   ├─ Notice.ts                # Domain models (Notice, DomainNotices, Notices)
 │   └─ README.md                # Documentation for the Notice domain models
```

## 3. Purpose

- Provide a platform-wide mechanism for surfacing validation, warning, or danger messages.
- Maintain a domain-scoped list of notices (DomainNotices) so each domain can manage its own messages independently.
- Define UI-agnostic domain models (Notice, DomainNotices, Notices) that do not depend on Quasar or any other framework.
- Expose a stable, framework-neutral API (notice-service.ts) for Platform and microservice code.
- Allow UI implementations (e.g., NoticeComponent.vue) to evolve independently from application logic.

## 4. Usage

### Application code

```ts
import { notice } from '@/application/Platform/Notice/Application/notice-service'
import { DomainNotices, Notice, Style } from '@/application/Platform/Notice/Domain/Notice'

const dn = new DomainNotices('Example', [new Notice('Title', 'Subtitle text...', Style.info)])

/**  Setting notices */
notice.setDomainNotices(dn)

/**  Clearing notices */
notice.clearDomainNotices('Example')

/**  Clearing everything */
notice.clear()
```

All notifications flow through:

`Component → Service → Store → Component Renderer`
