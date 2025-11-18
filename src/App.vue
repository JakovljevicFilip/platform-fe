<template>
  <router-view />
</template>

<script setup lang="ts">
  import { write } from './application/Platform/Log/Application/log-service'

  write('Hello World!')
</script>
