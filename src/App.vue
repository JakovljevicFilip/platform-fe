<template>
  <router-view />
</template>

<script setup lang="ts">
  import PlatformConfig from 'src/config/platform-config'
  import MicroserviceConfig from 'src/config/microservice-config'

  console.log('Platform example:', PlatformConfig.example)
  console.log('Microservice example:', MicroserviceConfig.example)
</script>
