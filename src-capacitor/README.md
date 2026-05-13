# Android Development Guide (Quasar + Capacitor)

This guide outlines the process for developing, building, and deploying native Android applications using the **Quasar Framework** and **Capacitor**.

---

## 1. Prerequisites

Ensure your environment meets these requirements before attempting a build:

- **Android Studio**: Installed and updated
- **Android SDK**: Properly configured within Android Studio
- **Java**: JDK 11 or higher recommended
- **Gradle**: Available system-wide or via the included project wrapper
- **Capacitor Android platform**: `src-capacitor/android` must exist

---

## 2. Building the Android APK

The build process involves two steps:

1. Compiling Quasar web assets
2. Assembling the native Android binary

### Step 1: Build Quasar assets

Run:

```bash
quasar build -m capacitor -T android
```

### Step 2: Build Android APK

Navigate into the native Android project and build the debug APK:

```bash
cd src-capacitor/android
./gradlew assembleDebug
```

### Output location

The generated APK will be available at:

```
src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
```

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
adb install app/build/outputs/apk/debug/app-debug.apk
```

### Update existing app

```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

---

## Summary

Workflow:

- Build Quasar assets
- Build Android APK via Gradle
- Bump version in package.json
- Install via ADB
