# Example Task Aggregate

## Overview

The `Task` example shows how the Platform architecture is applied across the
Domain, Application, and Infrastructure layers.

It follows the DDD rules from `architecture/ddd.md`:

- Domain owns business rules and contracts.
- Application coordinates use cases and state.
- Infrastructure implements persistence and external integrations.
- Commands mutate state, queries read state.

### Domain

- `TaskDomainError.ts` — typed domain error.
- `TaskSettings.ts` — aggregate configuration and constants.
- `ValueObject/TaskId.ts` — task identifier value object.
- `ValueObject/TaskStatus.ts` — task status value object.
- `Task.ts` — canonical aggregate entity.
- `TaskRepository.ts` — persistence contract.
- `Rules/task-rules.ts` — validation and state-transition rules.
- `Rules/task-rebuild.ts` — rebuild validation rules.
- `TaskAggregate.ts` — aggregate root and domain operations.

### Application

- `TaskApplicationError.ts` — typed application error.
- `Types/NewTask.ts` — UI-facing task creation type.
- `task-store.ts` — Pinia store for task state.
- `Home/Components/Input/task-input.ts` — input validation helper.
- `Service/CQRS/...` — command and query payloads, handlers, and orchestrators.
- `Service/task-service.ts` — application workflow entry point.
- `Runner/createDemoTask-run.ts` — runner that seeds a demo task.
- `Home/...` — Vue UI composition for the task screen.

### Infrastructure

- `Client/task-dexie.ts` — Dexie-backed repository client.
- `task-storage.ts` — storage maker and repository adapter wiring.

### Dependency Notes

- `TaskAggregate` depends on the entity, value objects, rules, and domain error.
- `task-storage` depends on the domain repository contract and the storage maker.
- CQRS commands depend on `TaskAggregate` and `task-storage`.
- CQRS handlers depend on commands plus logging.
- `task-service` composes the handlers and syncs `task-store`.
- The UI layer depends on `task-service`, `task-store`, and input helpers.

For `Plant`, `PlantStatus.ts` should only be added if the domain actually has
state transitions or lifecycle-specific validation.

## Example Setup: `Plant`

If you were creating a new hypothetical `Plant` entity in the same style, the
file creation order would typically be:

### Domain foundation

1. `Domain/PlantDomainError.ts` — first, because every domain needs a typed
   error for rule failures and invalid state.
2. `Domain/PlantSettings.ts` — next, because domain constants and limits are
   often referenced by later rules and value objects.
3. `Domain/ValueObject/PlantId.ts` — then, because the aggregate entity needs a
   stable identifier type before the entity itself can exist.
4. `Domain/ValueObject/PlantStatus.ts` — optional, only if the entity has
   lifecycle state that must be modeled before aggregate validation.
5. `Domain/Plant.ts` — then, because the aggregate entity is the canonical
   domain shape used by every later layer.
6. `Domain/Rules/plant-rules.ts` — then, because the aggregate needs reusable
   domain rule checks for create, change, remove, and similar actions.
7. `Domain/Rules/plant-rebuild.ts` — then, because rebuilding persisted data
   requires a dedicated validation path for raw storage values.
8. `Domain/PlantAggregate.ts` — then, because the aggregate root depends on the
   entity, value objects, rules, settings, and domain error to enforce
   invariants.

### Application scaffolding

9. `Application/PlantApplicationError.ts` — then, because the application
    layer needs its own typed error for workflow-level failures.
10. `Application/Types/NewPlant.ts` — then, because UI-facing creation payloads
    are needed before commands and forms can be wired.
11. `Application/plant-store.ts` — then, because application state must exist
    before services can synchronize it.
12. `Application/Home/Components/Input/plant-input.ts` — then, because forms
    need validation helpers that rely on settings and input rules.

### Infrastructure wiring

13. `Domain/PlantRepository.ts` — then, because the repository contract is only
   needed once infrastructure is being introduced.
14. `Infrastructure/Client/plant-dexie.ts` — then, because a concrete storage
    client must implement the repository contract.
15. `Infrastructure/plant-storage.ts` — then, because the application layer
    needs a single storage entry point that selects the client implementation.

### Application commands and queries

16. `Application/Service/CQRS/Command/...` — then, because command files are
    introduced together once the aggregate and storage layer exist.
17. `Application/Service/CQRS/Query/...` — then, because query files are
    introduced after the command-side storage contract is available.

### Application orchestration

27. `Application/Service/plant-service.ts` — then, because the service composes
    commands, queries, and store synchronization into one entry point.
28. `Application/Runner/createDemoPlant-run.ts` — optional, only if the domain
    needs a run process to pre-seed data or bootstrap the aggregate setup.

### UI composition

29. `Application/Home/Components/.../*.vue` — then, because Vue files are added
    to represent the data and let the UI interact with the workflow.
