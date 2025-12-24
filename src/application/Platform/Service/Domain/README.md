# Platform Service Domain

## 1. Overview

Provides the platform-level **Application Service** abstraction used to orchestrate CQRS operations.

The Service domain coordinates **Commands and Queries**, synchronizes application state via stores, and exposes a stable entry point for application-level workflows.

Services do **not** contain domain logic or persistence concerns.  
They act as the **composition boundary** between UI-facing code and CQRS units.

---

## 2. Structure

```text
/src/application/Platform/Service/
 ├─ Domain/
 │   ├─ CQRS/
 │   │   ├─ Command/
 │   │   │   ├─ Command.ts          # Write-side CQRS contract
 │   │   │   └─ CommandPayload.ts   # Marker interface for command input
 │   │   ├─ Query/
 │   │   │   ├─ List.ts             # Read-side list query contract
 │   │   │   ├─ View.ts             # Read-side single-entity query contract
 │   │   │   └─ Filter.ts           # Read-side in-memory filter contract
 │   ├─ Command.puml                # CQRS command flow diagram
 │   ├─ Query.puml                  # CQRS query flow diagram
 │   ├─ Service.ts                  # Application Service contract
 │   └─ README.md                   # Documentation for the Service domain
```

---

## 3. Purpose

- Define a **CQRS-oriented application layer** separating reads, writes, and orchestration.
- Provide stable contracts for **Commands**, **Queries**, and **Filters**.
- Centralize **application-level workflows** that may compose multiple CQRS operations.
- Synchronize application state by coordinating Services with application stores.
- Enforce strict separation between:
  - Domain logic (Aggregates)
  - Application orchestration (Services, Handlers)
  - Infrastructure concerns (Persistence, external clients)

---

## 4. Responsibilities

### Service

- Acts as the **application entry point** for UI-facing code.
- Composes Commands and Queries into use-case–level workflows.
- Coordinates application state updates via stores.
- Handles cross-cutting concerns (logging, error propagation, retries).
- Owns **flow**, but no business rules.

---

### Command

- Represents a single **write-side CQRS operation**.
- Accepts a fully constructed `CommandPayload`.
- Commits domain aggregates via Aggregate methods.
- Persists results through Infrastructure.
- Returns minimal write results (identifiers or aggregates).

---

### Query

- Represents a **read-side CQRS operation**.
- Retrieves domain aggregates from Infrastructure.
- Returns **AggregateEntities directly**.
- Never mutates domain state.

---

### Filter

- Represents a **read-side, in-memory refinement step**.
- Operates on collections of aggregate entities.
- Contains no I/O, persistence, or mutation logic.
- May reference domain configuration or read-only domain data.

---

## 5. Usage

### Application code

```ts
import { taskService } from
  '@/application/Platform/Service/Application/task-service'

// Create a task
await taskService.add('Write documentation')

// Change a task
await taskService.change(task, 'Update documentation')

// Remove a task
await taskService.remove(task)

// Refresh application state
await taskService.list()
```

All application flows follow the same direction:

```
Component
  → Service
    → Command / Query
      → Infrastructure
    → Store
  → Component
```

---

## 6. Design Notes

- Services are **application-layer only** and must not contain domain logic.
- Commands and Queries are **explicitly separated** and never mixed.
- Aggregates are the **canonical read and write model**.
- Filters are optional, composable read-side refinements.
- This domain defines the **canonical CQRS vocabulary** used across the Platform.

---

### Reference

**v1.0 — Initial conversion to Markdown**
