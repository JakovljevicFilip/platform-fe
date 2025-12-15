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

### 3.3 Aggregate Files (inside src/application)

#### 3.3.1 Domain Layer Schema
1. Domain Aggregate ({Aggregate}Aggregate.ts)
   1. Root of domain behavior; creates AggregateEntities and enforces invariants.
2. Aggregate Entity ({Aggregate}.ts)  
   1. The canonical entity type managed by the aggregate.
3. Repository ({Aggregate}Repository.ts)
   1. Defines the persistence contract that Infrastructure must implement.
4. Aggregate Settings ({Aggregate}Settings.ts)  
   1. Provides aggregate-level constants and configuration values.
5. Domain Rules (Rules/{aggregate}-rules.ts)  
   1. Internal domain rule helpers used only by the Aggregate.
6. Puml Schema ({Domain|Aggregate|Functionality}.puml)
   1. Represents Domain/Aggregate/Functionality as a Puml schema.
7. README.md  
   1. Represents the Domain/Aggregate in the form of a README.md file.

#### 3.3.2 Application Layer Schema
1. Store ({aggregate}-store.ts)  
   1. Application-layer Pinia store managing reactive domain state.
2. Service ({aggregate}-service.ts)  
   1. Application-layer orchestrator coordinating the domain and infrastructure.
3. Domain Committer ({aggregate}-committer.ts)  
   1. Transforms ApplicationEntity → AggregateEntity via the Aggregate.
4. Domain Parser ({aggregate}-parser.ts)  
   1. Transforms DomainEntity → ApplicationEntity for UI consumption.
5. Response Contract (Response/{Method}Response.ts)  
   1. Defines the contract between Application and Infrastructure for data returned from Infrastructure.
6. Application Entity ({ApplicationEntity}.ts)  
   1. UI-facing type defining view-model data structures.
7. Parsed Application Entity (Parsed{ApplicationEntity}.ts)  
   1. Bundles AggregateEntity + ApplicationEntity into a single parsed model.

#### 3.3.3 Infrastructure Layer Schema
1. Repository Implementation ({aggregate}-repository.ts)
   1. Infrastructure module performing persistence operations.
2. Repository Client ({aggregate}-{implementation}.ts)
   1. Specific implementation of the persistence mechanism used by the repository.

#### 3.3.4 Other
1. Helper ({parent|functionality}-helper.ts)  
   1. Shared extracted logic for large files within the same domain or layer.
2. Error ({parent|context}-error.ts)  
   1. Typed error class for domain, application, or infrastructure concerns.
3. Factory ({contract}-factory.ts)  
   1. Implementation-agnostic selector that returns a concrete adapter or strategy.
4. Adapter ({implementation}-adapter.ts)  
   1. Concrete technology-specific implementation used by a Factory.
5. Maker ({contract}-maker.ts)  
   1. Implementation-aware selector that returns the correct client.
6. Client ({client}-client.ts)  
   1. Concrete technology-specific implementation used by a Maker.
7. Client Vendor (Client/{name}-{client}.ts)  
   1. Vendor-specific client implementation.

## 4. Reference

### 4.1 Change Log

1. v1.0 — Initial creation.