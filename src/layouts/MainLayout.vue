<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>{{ PlatformConfig.applicationName }}</q-toolbar-title>
      </q-toolbar>

      <NoticeComponent />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import NoticeComponent from 'src/application/Platform/Notice/Application/NoticeComponent.vue'
  import PlatformConfig from 'src/config/platform-config'
  import { useMeta } from 'quasar'

  useMeta({
    title: PlatformConfig.applicationName,
  })
</script>
