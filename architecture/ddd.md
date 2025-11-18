# DDD Principles

## 1. Overview

1. Defines architectural principles in accordance with DDD.

## 2. Core Principles

1. Defines how the Domain, Application, and Infrastructure layers work together.
2. Ensures clear separation of concerns and strict architectural boundaries.
3. Establishes the foundational rules for building business logic and system behavior.

## 3. Rules

### 3.1 Layer Responsibilities

1. **Domain Layer**
   1. Defines business rules, aggregates, entities, and contracts.
   2. Contains pure, framework-agnostic logic.
   3. Provides abstractions that other layers depend on.
2. **Application Layer**
   1. Coordinates workflows using Domain contracts.
   2. Implements use cases without containing business rules.
   3. Delegates data access and external concerns to Infrastructure.
3. **Infrastructure Layer**
   1. Provides concrete implementations for Domain abstractions.
   2. Handles persistence, external APIs, storage, and other system integrations.
   3. Must not contain business logic.

### 3.2 Dependency Guidelines

1. Domain must not depend on Application or Infrastructure.
2. Application may depend only on Domain.
3. Infrastructure may depend on both Domain and Application.

### 3.3 CQRS Enforcement

1. Commands are write-only operations and must not return domain state.
2. Queries retrieve state and must not modify domain aggregates.
3. Commands may return resource identifiers such as id of the newely created entity.

### 3.4 Ubiquitous Language

1. Prefer domain language over technical terminology.

### 3.5 Application–Infrastructure Collaboration

1. When the Application layer collaborates with the Infrastructure layer, all interaction must occur through a service module defined in the Application layer.

### 3.6 Optional Layering

1. Domains may define only the layers they need; Domain, Application, and Infrastructure layers are optional and should be included only when required.

### 3.7 Subdomain Access Rules

1. Subdomains act as internal extensions of their parent domain and must not access the parent domain directly.

### 3.8 Subdomain Nesting

1. Subdomains nest beneath their parent using `{Subdomain}/{Layer};`
2. Nesting can continue as long as the scope warrants.

## 4. Reference

### 4.1 Change Log

1.  v1.0 — Initial conversion to Markdown.
