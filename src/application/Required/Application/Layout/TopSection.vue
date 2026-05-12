<template>
  <q-header elevated>
    <NoticeComponent />

    <q-toolbar>
      <q-toolbar-title class="row items-center no-wrap">
        <!-- App name -->
        <span>{{ PlatformConfig.applicationName }}</span>

        <!-- Vertical divider -->
        <q-separator vertical inset class="q-mx-md" />

        <!-- Navigation links -->
        <q-btn flat dense label="Documentation" to="/" />

        <q-separator vertical inset class="q-mx-sm" />

        <q-btn flat dense label="Example" to="/example/task" />
      </q-toolbar-title>

      <!-- Pushes version to the right -->
      <q-space />

      <!-- Version -->
      <div>v{{ PlatformConfig.applicationVersion }}</div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
  import NoticeComponent from 'src/application/Platform/Notice/Application/NoticeComponent.vue'
  import PlatformConfig from 'src/config/platform-config'
</script>
