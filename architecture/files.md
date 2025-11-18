# Files

## 1. Overview

1. Defines all file types allowed in the project and their roles.
2. Explains the distinction between domain-level files inside src/application and system-level files outside of it.

## 2. Core Principles

1. Each file type has a specific purpose and belongs to a defined architectural layer.
2. Domain files live strictly inside system or microservice domains under src/application.
3. System files serve global application functions and live outside src/application.

## 3. Rules

### 3.1 Component and Page Naming

1. Components must follow the pattern:
   1. {ComponentName}/{ComponentName}(Action|Section|Modal)?.vue
2. Pages must follow the pattern:
   1. IndexPage.vue

### 3.2 Suffix Enforcement for Domain and System Files

1. All domain and system files must use the suffixes defined in their respective sections under Domain Files and System Files.
2. These suffixes are mandatory and establish the canonical naming convention for the entire project.

### 3.3 Domain Files (inside src/application)

1. Domain ({Domain}.ts)
   1. Defines the domain’s aggregate, entity, or core contract.
2. Store ({domain}-store.ts)
   1. Application-layer Pinia store managing reactive domain state.
3. Service ({domain}-service.ts)
   1. Application-layer orchestrator coordinating workflows between Domain and Infrastructure.
4. Client ({domain}-client.ts)
   1. Infrastructure-layer API client interacting with remote endpoints.
5. Mapper ({domain}-mapper.ts)
   1. Infrastructure-layer transformer between domain entities and persistence formats.
6. Storage ({domain}-storage.ts)
   1. Infrastructure-layer module handling device or local storage interactions.
7. Factory ({domain}-factory.ts)
   1. Infrastructure-layer selector that returns the correct adapter implementation.
8. Adapter ({implementation}-adapter.ts)
   1. Infrastructure-layer concrete implementation of a domain-defined adapter.
9. Helper ({parent|functionality}-helper.ts)
   1. Shared extracted logic for large files within the same domain or layer.
10. Error ({parent|context}-error.ts)
    1. Typed error class for domain, application, or infrastructure concerns.

### 3.4 System Files (outside src/application)

1. Boot File ({feature}-boot.ts)
   1. Initializes global features before app mount (lives in src/boot).
2. Platform Config (platform-config.ts)
   1. Exposes platform-level environment variables (lives in src/config).
3. Application Config (application-config.ts)
   1. Exposes microservice-specific environment variables (lives in src/config).

## 4. Reference

### 4.1 Change Log

1. v1.0 — Initial creation.
