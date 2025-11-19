<template>
  <q-page class="q-pa-md">
    <LogExample />
    <q-separator spaced />
    <InAppNotificationExample />
    <q-separator spaced />
    <NoticeExample />
  </q-page>
</template>

<script setup lang="ts">
  import LogExample from './Components/LogExample.vue'
  import InAppNotificationExample from './Components/InAppNotificationExample.vue'
  import NoticeExample from './Components/NoticeExample.vue'
</script>
