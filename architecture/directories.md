# Directories

## 1. Overview

1. Provides a high-level map of the project's top-level directories.
2. Explains the purpose of each major system path in the most general terms.

## 3. Core Principles

1. Directories reflect architectural boundaries and separate system-level concerns.
2. Each folder has a clear, singular responsibility directly tied to application structure.
3. System and microservice domains live under src/application, while supporting framework directories (boot, config, css, layouts, router) each serve one specific global role.

## 3. Rules

### 3.1 src/application — Domains

1. Platform
   1. Contains reusable capabilities such as utilities, logging, storage, and configuration.
2. Required
   1. Contains implementations that Platform depends on and must be provided by the microservice.
3. Shared
   1. Contains components and services reused across multiple Microservice domains.
4. Microservice
   1. Contains business-specific domains that define application features and behavior.

### 3.2 src/boot — Boot Files

1. Contains Quasar boot files executed before the application initializes.
2. Used for registering plugins, global services, or configuration.
3. Application-specific boot processes/runners are registered through the Platform/Runner aggregate.

### 3.3 src/config — Configuration Layer

1. Exposes environment variables to the application through typed config files.
2. Acts as the bridge between .env and all system/microservice domains.

### 3.4 src/css — Global Styles

1. Contains global CSS files applied across the entire application.
2. Stores styles not tied to any specific component or domain.

### 3.5 src/layouts — Layout Components

1. Contains reusable layout components used to structure high-level UI shells.
2. Defines top-level presentation patterns shared across pages.

### 3.6 src/router — Routing Layer

1. Contains routing configuration and route declarations.
2. Defines application navigation structure and view composition.

## 4. Reference

### 4.1 Change Log

1. v1.0 — Initial creation.
