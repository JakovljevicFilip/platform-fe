# Platform In-App Notification Module

## 1. Overview

Provides the platform-level in-app notification abstraction used across the application.  
The goal is to standardize user-facing feedback (success, info, warnings, errors) without binding application code to a specific UI framework such as Quasar.

## 2. Structure

```text
/src/application/Platform/Notification/InApp/
 ├─ Application/
 │   └─ inAppNotification-service.ts      # Public API for triggering notifications
 ├─ Domain/
 │   └─ InAppNotification.ts              # Adapter interface
 ├─ Infrastructure/
 │   ├─ Adapter/
 │   │   └─ quasar-adapter.ts             # Implementation using Quasar Notify
 │   └─ inAppNotification-factory.ts      # Returns the active adapter
 └─ README.md
```

## 3. Purpose

- Define a domain-level contract (`InAppNotificationAdapter`) that all notification mechanisms must follow.
- Provide a simple Quasar-based MVP adapter for displaying popup notifications.
- Offer a stable, adapter-agnostic API (`inAppNotification-service.ts`) for all Platform and microservice code.
- Allow future adapters (e.g., custom toast component, device-level notifications) without changing application logic.

## 4. Usage

### Application code

```ts
import { notify } from './application/Platform/Notification/InApp/Application/inAppNotification-service'

notify.success('Saved successfully!')
notify.warning('Something feels off…')
```

All notifications flow through:

`Service → Factory → Adapter → Quasar Notify`
