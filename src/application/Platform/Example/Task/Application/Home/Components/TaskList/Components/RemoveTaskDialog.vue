<template>
  <q-dialog v-model="removeDialog">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Remove task</div>
      </q-card-section>

      <q-card-section>
        <div class="text-body2">Are you sure you want to remove this task?</div>

        <div class="q-mt-sm text-grey-7">“{{ task?.body }}”</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="grey-7" @click="close" />

        <q-btn
          unelevated
          label="Remove"
          color="negative"
          :loading="isSubmitting"
          @click="confirm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { taskService } from '../../../../Service/task-service'

  import type { Task } from 'src/application/Platform/Example/Task/Domain/Task'

  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

  import { ref } from 'vue'

  const { task } = defineProps<{
    task: Task | null
  }>()

  const removeDialog = defineModel<boolean | null>({
    default: null,
  })

  const isSubmitting = ref(false)

  async function confirm(): Promise<void> {
    if (!task) return

    try {
      isSubmitting.value = true
      await taskService.remove(task)
      notify.success('Task removed.')
      close()
    } catch {
      notify.warning('Task removal failed. Please try again.')
    } finally {
      isSubmitting.value = false
    }
  }

  function close() {
    removeDialog.value = false
  }
</script>
