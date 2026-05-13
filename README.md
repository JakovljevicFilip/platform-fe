## platform-fe

![Quasar](https://img.shields.io/badge/Quasar-2-1976D2?logo=quasar&logoColor=white) ![Vue](https://img.shields.io/badge/Vue-3-42b883) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white) ![Architecture](https://img.shields.io/badge/DDD-architecture-blueviolet) ![Offline‑first](https://img.shields.io/badge/Offline--first-enabled-brightgreen)

## Overview

`platform-fe` is a reusable, offline-first frontend scaffold built with Quasar, Vue 3, and TypeScript, following strict Domain-Driven Design (DDD) principles.  
It establishes a clear architectural baseline for microservice-oriented applications, enforcing consistent patterns, boundaries, and development workflows.

This repository serves as the foundational platform for future applications built on top of the same architecture.

---

## Setup

### 1. Prerequisites

- Docker and Docker Compose
- Node.js (see `engines` in [`package.json`](package.json))
- npm or Yarn

### 2. Run via Docker

Build and start the application:

```bash
docker compose up --build
```

The container will:

- Build using the project [`Dockerfile`](Dockerfile)
- Run the `platform_fe` service from [`docker-compose.yml`](docker-compose.yml)
- Expose the frontend at `http://localhost:9000`

Stop the container with:

```bash
docker compose down
```

### 3. Run locally

Install dependencies:

```bash
npm install
# or
yarn
```

Start the development server:

```bash
npm run dev
# or
yarn dev
```

This launches Quasar in dev mode with hot-reload enabled.

---

## Architecture Documentation

All architectural rules live inside the [`architecture/`](architecture) directory:

- DDD principles: [`ddd.md`](architecture/ddd.md), [`domain.md`](architecture/domain.md)
- Directory and file conventions: [`directories.md`](architecture/directories.md), [`files.md`](architecture/files.md)
- Code style and import rules: [`code.md`](architecture/code.md)
- Approved libraries: [`libraries.md`](architecture/libraries.md)
- Architectural patterns (factories, adapters, interfaces): [`patterns.md`](architecture/patterns.md)
- YAML specifications used for enforcing system-level rules (if present)

This folder serves as the single source of truth for how domains, layers, files, and conventions must be applied.

---

## Development

Development conventions are encoded in configuration and architecture files.

Key config files:

- [`eslint.config.js`](eslint.config.js)
- [`.prettierrc.json`](.prettierrc.json)
- [`tsconfig.json`](tsconfig.json)
- [`quasar.config.ts`](quasar.config.ts)

Scripts:

```bash
npm run lint
npm run format
npm run build

# or the Yarn equivalents
yarn lint
yarn format
yarn build
```

Offline-first behavior is implemented through the Platform layer and Quasar features such as PWA support, caching, and storage adapters.

---

## Android

### Developing for Android

This project uses **Quasar + Capacitor** to build native Android applications.

### Prerequisites

Before building Android APKs, ensure you have:

- Android Studio installed
- Android SDK configured
- Java (JDK 11+ recommended)
- Gradle available (or use the included wrapper)
- Capacitor Android platform initialized (`src-capacitor/android` exists)


### Building Android APK

To generate an Android build:

```bash
quasar build -m capacitor -T android
```

Then navigate into the Android project:

```bash
cd src-capacitor/android
```

Build a debug APK:

```bash
./gradlew assembleDebug
```

The generated APK will be available under:

```
src-capacitor/android/app/build/outputs/apk/debug/
```

Install the APK on a connected Android device or emulator:
```
adb install app/build/outputs/apk/debug/app-debug.apk
```

### Updating android APK

Android builds rely heavily on application versioning.

This project uses the `version` field in `package.json` as the single source of truth for Android versioning.

Before creating any new build or release, bump the version:

```bash
npm version patch
```

This will:
- Increment the version (e.g. `1.0.0 → 1.0.1`)
- Ensure Android builds are correctly recognized as new installs/updates
- Keep Capacitor sync consistent with app store requirements

You can also use:

```bash
npm version minor
npm version major
```

To update/replace the APK:

```
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

---

## Summary

`platform-fe` is the architectural baseline for future applications.  
All new products built on this platform should:

- Keep the Platform, Required, and Shared layers consistent
- Place new business logic inside `src/application/Microservice`
- Follow the architecture and DDD conventions defined in the [`architecture/`](architecture) folder

By starting from this platform, every application immediately gains a strict, predictable, offline-focused architecture powered by Quasar and TypeScript.
