<template>
  <q-toggle
    v-if="isReady"
    :model-value="isDark"
    checked-icon="dark_mode"
    unchecked-icon="light_mode"
    color="primary"
    @update:model-value="change"
  />
</template>

<script setup lang="ts">
  import { darkModeService } from './Service/darkMode-service'
  import { useDarkModeStore } from './darkMode-store'

  import { computed, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'

  const store = useDarkModeStore()
  const { isReady } = storeToRefs(store)
  const isDark = computed(() => store.isDarkActive)

  async function change(): Promise<void> {
    await darkModeService.change(!store.isDarkActive)
  }

  onMounted(async () => {
    await darkModeService.load()
  })
</script>
