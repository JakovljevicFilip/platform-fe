<template>
  <q-layout view="lHh Lpr lFf">
    <TopSection />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import TopSection from 'src/application/Required/Application/Layout/TopSection.vue'

  import PlatformConfig from 'src/config/platform-config'

  import { useMeta } from 'quasar'

  useMeta({
    title: PlatformConfig.applicationName,
  })
</script>
