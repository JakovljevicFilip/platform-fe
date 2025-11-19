<template>
  <div class="column q-gutter-xl">
    <section>
      <h2 class="text-h5 q-mb-sm">Notices</h2>
      <p class="text-body2 text-grey-7">
        Notices are platform-level messages used to provide feedback to the user across different
        domains of the application. They can communicate
        <strong>informational messages</strong>
        ,
        <strong>warnings</strong>
        , or
        <strong>dangers</strong>
        without tying your application logic to UI-specific components.
      </p>

      <h3 class="text-h6 q-mb-sm">Try it out</h3>

      <p class="text-body2 text-grey-7">
        Use the button below to show an example notice or clear it.
      </p>

      <div class="row q-gutter-sm items-center">
        <q-btn
          v-if="!isShowing"
          rounded
          size="sm"
          label="Show Example"
          color="primary"
          @click="showExampleNotices"
        />
        <q-btn
          v-else
          rounded
          size="sm"
          label="Clear Example"
          color="negative"
          flat
          @click="clearExampleNotices"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { notice } from 'src/application/Platform/Notice/Application/notice-service'
  import { DomainNotices, Notice, Style } from 'src/application/Platform/Notice/Domain/Notice'

  import { ref } from 'vue'

  const isShowing = ref(false)

  function showExampleNotices() {
    const domainNotices = new DomainNotices('Example', [
      new Notice('Example Info', 'This is a sample info notice.', Style.info),
      new Notice('Example Warning', 'This is a sample warning notice.', Style.warning),
      new Notice('Example Danger', 'This is a sample danger notice.', Style.danger),
    ])

    notice.setDomainNotices(domainNotices)
    isShowing.value = true
  }

  function clearExampleNotices() {
    notice.clearDomainNotices('Example')
    isShowing.value = false
  }
</script>
