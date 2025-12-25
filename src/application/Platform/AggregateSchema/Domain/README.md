# Platform Aggregate Schema

## 1. Overview

Provides shared, platform-level building blocks for defining
aggregates.\
These types form the foundation for all domain aggregates in the
application, ensuring that every aggregate defines its data, settings,
reconstruction logic, and UI-bound representations in a consistent way.

The module is **framework‑agnostic**, reusable, and does not depend on
any microservice or business domain.

## 2. Structure

```
/src/application/Platform/AggregateSchema/
 ├─ Domain/
 │   ├─ AggregateEntity.ts             # Canonical aggregate entity interface
 │   ├─ Aggregate.ts                   # Base class for all aggregates (rebuild)
 │   ├─ AggregateSettings.ts           # Global base for aggregate configuration
 │   ├─ AggregateRepository.ts         # Domain-level persistence contract
 │   ├─ AggregateError.ts              # Error handler for aggregate failures
 │   ├─ ValueObject/
 │   │   └─ Uuid.ts                    # UUID value object
 │   └─ README.md                      # Documentation for the entire AggregateSchema module
 └─ Application/
     └─ Types/
         └─ ApplicationEntity.ts       # Shape of an entity used in the Application layer.
```

## 3. Purpose

### AggregateEntity.ts

Defines the **canonical domain entity** owned by an aggregate.\
Each aggregate extends this interface to describe its own domain fields.

### Aggregate.ts

Base class for aggregates.\
Each aggregate must implement.

### AggregateSettings.ts

Base class for all aggregate configuration.

### AggregateRepository.ts

Base interface for aggregate persistence contracts.\
Concrete repositories extend this interface inside the domain layer;
actual implementations live in Infrastructure.

### AggregateError.ts

Standardized domain‑level error wrapper.

### ValueObject/Uuid.ts

UUID value object.

### Application Entity

These represent the bridge between **domain entities** and **UI-facing
data**.

## 4. Usage

### Example: Defining an AggregateEntity

```ts
import type { AggregateEntity } from 'src/application/Platform/AggregateSchema/Domain/AggregateEntity'

export interface ExampleEntity extends AggregateEntity {
  id: string
  created_at: string
  content: string
}
```

### Example: Implementing an Aggregate

```ts
import { Aggregate } from 'src//application/Platform/AggregateSchema/Domain/Aggregate'
import { DomainError } from 'src/application/Platform/AggregateSchema/Domain/AggregateError'

export class ExampleAggregate extends Aggregate<ExampleEntity> {
  static readonly AGGREGATE_NAME = 'ExampleAggregate'

  override rebuild(id: string, created_at: string, content: string): ExampleEntity {
    if (!id || !created_at || !content) {
      throw new DomainError(ExampleAggregate.AGGREGATE_NAME, 'Missing data while rebuilding.', {
        id,
        created_at,
        content,
      })
    }

    return { id, created_at, content }
  }
}
```

### Example: Using ApplicationEntity

```ts
import { type ApplicationEntity } from 'src/application/Platform/AggregateSchema/Application/Types/ApplicationEntity'

export interface NewTask extends ApplicationEntity {
  body: string
}
```
