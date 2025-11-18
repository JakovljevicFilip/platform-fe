# Domains

## 1. Overview

1. Defines the system-level domains and how they relate to one another.
2. Establishes dependency rules and boundaries between Platform, Required, Shared, and Microservice domains.

## 2. Core Principles

1. Each system domain has a clearly separated responsibility.
2. Dependencies must follow strict, predefined rules.
3. Subdomains are created only when structural or functional criteria are met.

## 3. Rules

### 3.1. System Domain Responsibilities

1. Platform
   1. Provides reusable capabilities such as utilities, logging, storage, and foundational services.
2. Required
   1. Contains implementations that Platform needs and must be provided by the Microservice.
3. Shared
   1. Contains utilities and components reused across multiple Microservice domains.
4. Microservice
   1. Contains business-specific domains defining application features and behavior.

### 3.2 System Domain Dependency Rules

1. Platform may depend on Required.
2. Shared may depend on Platform and Required.
3. Microservice may depend on Platform, Shared, and Required.
4. Microservice domains may not depend on one another.
5. No domain may depend on Microservice.

### 3.3 Subdomain Extraction Rules

1. Create a subdomain when a newly added feature requires access to two or more layers (Domain, Application, Infrastructure).
2. Create or avoid creating a subdomain if the user explicitly specifies the desired structure.
3. Do not introduce subdomains when the feature is small enough to fit within the existing domain without mixing responsibilities.

### 3.4 Platform Domains Dependancy

1. Platform domains are treated as mutual extensions.
   1. They can depend on or import from other Platform domains.

## 4. Reference

### 4.1 Change Log

1. v1.0 — Initial conversion to Markdown.
