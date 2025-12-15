# Architectural Patterns

## 1. Overview
Defines the architectural patterns used across the system to structure behavior, enforce boundaries, and guide how different parts of the codebase interact.
Patterns provide consistent, repeatable solutions for connecting abstract contracts with concrete implementations while preserving clarity, flexibility, and maintainability.

## 2. Core Principles
1. This document defines all available patterns.
2. Each pattern provides a specific, well-defined mechanism for structuring interactions.
3. Patterns must be applied consistently across all domains, layers, and subsystems.
4. Patterns are implementation-agnostic and can be used anywhere in the architecture.

## 3. Rules

### 3.1 Provider Design Pattern
Providers choose and return implementations.  
They guarantee indirection, consistency, and swappability.
Callers must never construct adapters or clients directly.
Callers interact only with the instances returned by Providers.

---

### 3.1.1 Factory–Adapter Pattern  
Used when callers must remain implementation‑agnostic.

**Purpose**  
Hide implementation details (e.g., HTTP, logging, parsing).

**When to Use**  
Generic behavior; caller should not interact with vendor types.

**Structure**
```
{Contract}.ts
{contract}-factory.ts
{impl}-adapter.ts
```

**Naming**
- Contract: `{Contract}.ts`
- Factory: `{contract}-factory.ts`
- Adapter: `{name}-adapter.ts`
- Never use “Interface”

**Responsibilities**
- Factory selects and returns an adapter.
- Adapter implements the contract and hides vendor specifics.

---

### 3.1.2 Maker–Client Pattern  
Used when callers *should* be implementation-aware.

**Purpose**  
Expose implementation-specific capabilities (ORMs, SDKs, filesystem).

**When to Use**  
Caller must interact with vendor features (Dexie schema, Firebase types, etc.).

**Structure**
```
{Contract}.ts
{contract}-maker.ts
{impl}-client.ts
{aggregate}-{impl}.ts
```

**Naming**
- Contract: `{Contract}.ts`
- Maker: `{contract}-maker.ts`
- Client: `{client}-client.ts`
- Vendor file: `{name}-{client}.ts`

**Responsibilities**
- Maker selects a client.
- Client performs real operations exposing vendor types.

---

### 3.1.3 Global Constraints
1. All implementations are obtained through Providers.  
2. Callers never instantiate implementations directly.  
3. Providers must return objects conforming to contracts.  
4. Pattern applies universally across all layers/domains.

## 4. Reference

### 4.1 Change Log
v0 — Initial version.