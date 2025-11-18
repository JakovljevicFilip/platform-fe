# Platform Log Module

## 1. Overview

Provides the platform-level logging abstraction used across the application.  
The goal is to standardize how diagnostic or non-user-facing messages are produced, without binding the Platform layer to a specific logging technology.

## 2. Structure

````
/src/application/Platform/Log/
 ├─ Application/
 │   └─ log-service.ts         # Public API for the rest of the app
 ├─ Domain/
 │   └─ Log.ts                 # LogAdapter interface
 ├─ Infrastructure/
 │   ├─ Adapter/
 │   │   └─ console-adapter.ts # Console-based MVP implementation
 │   └─ log-factory.ts         # Returns the active logging adapter
 └─ README.md
````

## 3. Purpose

- Define a domain-level logging contract (`LogAdapter`) that all logging mechanisms must implement.
- Provide an MVP console-based adapter in the Infrastructure layer.
- Expose a stable, adapter-agnostic logging function (`log-service.ts`) for use throughout the Platform layer and microservices.

## 4. Usage

### Application code

```vue
<script setup lang="ts">
import { write } from '@/application/Platform/Log/Application/log-service'

write('Hello World!')
</script>
```

### `log-service.ts`

```ts
import LogFactory from '../Infrastructure/log-factory'

export function write(value: unknown): void {
  const logger = LogFactory.create()
  logger.write(value)
}
```

All logging flows through:

`Service → Factory → Adapter → Console`
