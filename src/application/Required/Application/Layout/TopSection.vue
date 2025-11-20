<template>
  <q-header elevated>
    <NoticeComponent />
    <q-toolbar>
      <q-toolbar-title>{{ PlatformConfig.applicationName }}</q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
  import NoticeComponent from 'src/application/Platform/Notice/Application/NoticeComponent.vue'

  import PlatformConfig from 'src/config/platform-config'
</script>
