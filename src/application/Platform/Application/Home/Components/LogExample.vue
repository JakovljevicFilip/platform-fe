<template>
  <div class="column q-gutter-xl">
    <section>
      <h2 class="text-h5 q-mb-sm">Logs</h2>

      <p class="text-body2 text-grey-7">
        The Log module provides a platform-level abstraction for diagnostic or internal messages. It
        ensures that logging remains consistent across the application, without tying Platform or
        domain code to any specific logging mechanism such as
        <code>console.log</code>
        .
      </p>

      <h3 class="text-h6 q-mb-sm">Try it out</h3>

      <p class="text-body2 text-grey-7">
        Click the button below to trigger a log message. Open your browser console to see the
        result.
      </p>

      <div class="row q-gutter-sm items-center">
        <q-btn rounded size="sm" label="Write Log" color="primary" outline @click="writeLog" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { write } from 'src/application/Platform/Log/Application/log-service'

  function writeLog() {
    write('This is an example platform log from the Log Module documentation.')
  }
</script>
