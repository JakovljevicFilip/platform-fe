<template>
  <div class="column q-gutter-xl">
    <section>
      <h2 class="text-h5 q-mb-sm">In-App Notifications</h2>

      <p class="text-body2 text-grey-7">
        In-App Notifications provide quick, transient feedback to the user. They are ideal for short
        messages such as confirmations, warnings, or general information. Unlike platform-level
        notices, in-app notifications disappear automatically and do not occupy space in the layout.
      </p>

      <h3 class="text-h6 q-mb-sm">Try it out</h3>

      <p class="text-body2 text-grey-7">
        Use the buttons below to trigger example in-app notifications.
      </p>

      <div class="row q-gutter-sm items-center">
        <q-btn rounded size="sm" label="Success" color="positive" @click="showSuccess" />

        <q-btn rounded size="sm" label="Info" color="primary" outline @click="showInfo" />

        <q-btn rounded size="sm" label="Warning" color="warning" outline @click="showWarning" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

  function showSuccess() {
    notify.success('This is a success notification!')
  }

  function showInfo() {
    notify.info('This is an informational notification.')
  }

  function showWarning() {
    notify.warning('This is a warning notification.')
  }
</script>
