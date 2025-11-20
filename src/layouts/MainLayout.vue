<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <ToolbarComponent />

      <NoticeComponent />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import ToolbarComponent from 'src/application/Required/Application/Layout/ToolbarComponent.vue'
  import NoticeComponent from 'src/application/Platform/Notice/Application/NoticeComponent.vue'

  import PlatformConfig from 'src/config/platform-config'

  import { useMeta } from 'quasar'

  useMeta({
    title: PlatformConfig.applicationName,
  })
</script>
