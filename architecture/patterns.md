# Architectural Patterns

## 1. Overview

1. Defines the architectural patterns used to connect Domain and Infrastructure.
2. Describes how factories, adapters, and adapter interfaces work together.

## 2. Core Principles

1. Patterns enforce consistent boundaries between Domain, Application, and Infrastructure.
2. Factories resolve implementations; adapters implement domain contracts; interfaces define expected behavior.
3. Each pattern has a specific architectural purpose and must be applied consistently.

## 3. Rules

### 3.1 Factory Pattern

1. Purpose: Selects the correct adapter implementation for the current runtime context.
2. Location: Lives in the Infrastructure layer of the domain.
3. Responsibilities:
   1. Imports the domain-defined adapter interface.
   2. Constructs and returns the chosen adapter implementation.
   3. Accepts optional configuration to switch implementations when needed.
4. Constraints:
   1. Adapters must be accessed exclusively through factories.

### 3.2 Adapter Pattern

1. Purpose: Provides a concrete implementation of a domain-defined adapter contract.
2. Location: Lives in `Infrastructure/adapter`.
3. Responsibilities:
   1. Implements all methods defined in the adapter interface.
   2. Keeps infrastructure-specific types internal to the adapter.
   3. Exports a single adapter instance or class.
4. Constraints:
   1. The Domain layer must not import or reference any adapter implementation.

### 3.3 Adapter Interface Pattern

1. Definition Location: Defined in the Domain layer inside the aggregate file.
2. Role: Describes the full contract that adapter implementations must satisfy.
3. Naming Rules:
   1. Default name equals the aggregate name (e.g., `Storage`).
   2. When multiple adapters exist, use `{Aggregate}Adapter`.
   3. Do not include the word "Interface" in the name.
4. Guidance:
   1. Document expected behavior for each method.
   2. Keep interfaces focused strictly on business capabilities.

## 4. Reference

### 4.1 Change Log

1. v1.0 — Initial conversion to Markdown.
