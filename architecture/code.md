# Code Conventions

## 1. Overview

1. Defines coding standards and static rules for source files.
2. Ensures consistent, maintainable, and predictable codebase.

## 2. Core Principles

1. Keep code small, clear, and consistently structured.
2. Organize imports in a predictable, grouped order.
3. Maintain immutability in classes and core constructs.

## 3. Rules

### 3.1 Style Rules

1. Maximum file length is 120 lines.
2. Should a file exceed 120 lines part(s) of it should be moved to a helper files, as defined in files.md.

### 3.2 Import Rules

1. All file imports must be grouped into the following types:
   1. Vue components.
      1. Vue single-file components (`.vue`) or modules that clearly export a component, regardless of whether they are imported via aliases or relative paths.
   2. Domain/runtime bindings.
      1. Domain and business logic: services, stores, helpers, repositories, aggregates, feature modules, and related types. Imports that include both runtime values and `import type` bindings stay here.
   3. 3rd party packages.
      1. Third-party packages used at the application level (e.g. Quasar, Axios, Pinia helpers, dayjs) excluding the Vue core runtime.
   4. Vue framework APIs.
      1. The Vue runtime and Vue-provided framework APIs (e.g. `vue`, core Vue utilities).
   5. Other imports.
      1. Imports that do not clearly fit the categories above; still separate this group with blank lines when it appears.
2. Every import has to be categorized as one of the import groups.
3. When an import could belong to multiple groups, choose the first group in the list whose description applies.
4. Import groups are imported in order in whcih they are defined under point 1 of this list.
5. Import groups are separated by an empty line of code.
6. Import example:

```ts
import DashboardShell from 'src/features/layout/components/DashboardShell.vue'
import UserListPanel from 'src/features/users/components/UserListPanel.vue'
import NotificationBanner from '@/ui/notifications/NotificationBanner.vue'
import SettingsDrawer from './components/SettingsDrawer.vue'
import QuickStatsCard from './components/QuickStatsCard.vue'

import { useSessionStore } from '@/features/session/session-store'
import { synchronizeReports, type ReportSummary } from '@/domain/reports/report-service'
import { loadUserPreferences } from '../preferences/preferences-helper'

import { storeToRefs } from 'pinia'

import { computed, ref, onMounted } from 'vue'
```

### 3.4 Class Rules

1. Classes are immutable.

## 4. Reference

### 4.1 Change Log

1. v1.0 — Initial conversion to Markdown.
