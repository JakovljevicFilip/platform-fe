# Platform Service Domain

## 1. Overview

Provides the platform-level **Application Service** abstraction used to orchestrate CQRS operations.
The Service domain coordinates **Commands and Queries**, synchronizes application state via stores, and exposes a stable entry point for application-level workflows.

Services do **not** contain domain logic or persistence concerns.
They act as the composition boundary between UI-facing code and CQRS units.

---

## 2. Structure

```text
/src/application/Platform/Service/
 ├─ Domain/
 │   ├─ CQRS/
 │   │   ├─ Command/
 │   │   │   └─ Command.ts        # Write-side CQRS contract
 │   │   ├─ Query/
 │   │   │   ├─ List.ts           # Read-side list query contract
 │   │   │   ├─ View.ts           # Read-side single-entity query contract
 │   │   │   └─ Parser.ts         # Aggregate → ApplicationEntity conversion
 │   ├─ Command.puml              # CQRS command flow diagram
 │   ├─ Query.puml                # CQRS query flow diagram
 │   ├─ Service.ts                # Application Service contract
 │   └─ README.md                 # Documentation for the Service domain
```

---

## 3. Purpose

- Define a **CQRS-oriented application layer** separating reads, writes, and orchestration.
- Provide stable contracts for **Commands**, **Queries**, and **Parsers**.
- Centralize **application-level workflows** that may compose multiple CQRS operations.
- Synchronize application state by coordinating Services with application stores.
- Enforce strict separation between:
  - Domain logic (Aggregates)
  - Application orchestration (Services)
  - Infrastructure concerns (Persistence, clients)

---

## 4. Responsibilities

### Service

- Composes Commands and Queries into application-level workflows.
- Coordinates application state updates through stores.
- Handles cross-cutting concerns (logging, error propagation).
- Exposes a single, stable API to UI-facing code.

### Command

- Represents a single **write-side CQRS operation**.
- Accepts application-layer input.
- Commits domain aggregates via Aggregates.
- Persists changes through Infrastructure.
- Returns only identifiers or minimal write results.

### Query

- Represents a **read-side CQRS operation**.
- Retrieves domain aggregates from Infrastructure.
- Converts them into application-layer entities.
- Never mutates domain state.

### Parser

- Converts domain aggregates into application-facing entities.
- Contains no persistence, orchestration, or business logic.

---

## 5. Usage

### Application code

```ts
import { taskService } from '@/application/Platform/Service/Application/task-service'
import type { NewTask } from '@/application/Platform/Service/Application/Types/NewTask'

// Create a task
await taskService.create({ body: 'Write documentation' })

// Update a task
await taskService.update(parsedTask)

// Remove a task
await taskService.remove(parsedTask)

// Refresh application state
await taskService.list()
```

All application flows follow the same direction:

`Component → Service → Command / Query → Infrastructure → Store → Component`

---

## 6. Design Notes

- Services are **application-layer only** and must not contain domain logic.
- Commands and Queries are **explicitly separated** and never mixed.
- Parsers isolate all transformation logic between domain and application layers.
- This domain defines the **canonical CQRS vocabulary** used across the Platform.

---

### Reference