# Android Development Guide (Quasar + Capacitor)

This guide outlines the Docker-only process for building and deploying native Android applications using the **Quasar Framework** and **Capacitor**.

---

## 1. Prerequisites

Ensure Docker is available on your machine.

---

## 2. Building the Android APK

The build process is handled entirely by Docker.

### Step 1: Run the Docker build

```bash
docker compose run --rm android-build
```

### Step 2: Retrieve the APK

The container builds the Android app and writes the debug APK to:

src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk

---

## 3. Versioning Strategy

This project uses the `version` field in `package.json` as the single source of truth for Android versioning.

Before creating any new build, bump the version:

### Patch release

```bash
npm version patch
# 1.0.0 → 1.0.1
```

### Minor release

```bash
npm version minor
# 1.0.0 → 1.1.0
```

### Major release

```bash
npm version major
# 1.0.0 → 2.0.0
```

This ensures:

- Android recognizes updates correctly
- Store releases remain consistent
- Capacitor sync stays aligned

---

## 4. Deployment

Use Android Debug Bridge (ADB) to install the APK on a connected device or emulator.

### Fresh installation

```bash
adb install src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
```

### Update existing app

```bash
adb install -r src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Summary

Workflow:

- Build the Android APK through Docker
- Bump version in package.json
- Install the APK via ADB
