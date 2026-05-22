<template>
  <div class="column q-gutter-xl">
    <section>
      <h2 class="text-h5 q-mb-sm">Dark Mode</h2>

      <p class="text-body2 text-grey-7">
        Dark mode allows users to switch between light and dark themes. The preference is persisted
        and synchronized with the application state to ensure a consistent experience across
        sessions.
      </p>

      <h3 class="text-h6 q-mb-sm">Try it out</h3>

      <p class="text-body2 text-grey-7">
        Use the toggle below to switch between light and dark mode.
      </p>

      <div class="row q-gutter-sm items-center">
        <dark-mode />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import DarkMode from 'src/application/Platform/DarkMode/Application/DarkMode.vue'
</script>
