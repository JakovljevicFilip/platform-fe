<template>
  <q-dialog v-model="changeDialog" @before-show="beforeShow">
    <q-card class="q-pa-lg" style="min-width: 480px">
      <q-card-section class="q-pa-none">
        <div class="text-h6">Edit task</div>
      </q-card-section>

      <q-card-section class="q-pa-none q-mt-md">
        <q-input
          v-model="body"
          type="textarea"
          filled
          bg-color="grey-2"
          :rows="4"
          input-style="resize: none"
          placeholder="Edit task…"
          :rules="rules"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-mt-md">
        <q-btn flat label="Cancel" color="grey-7" @click="close" />

        <q-btn
          unelevated
          label="Save"
          color="primary"
          :disable="!canSubmit"
          :loading="isSubmitting"
          @click="confirm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { useTrimmedLength } from '../../Composable/useTrimmedLength'
  import { taskService } from '../../../../Service/task-service'

  import type { Task } from 'src/application/Platform/Example/Task/Domain/Task'
  import { TaskSettings } from 'src/application/Platform/Example/Task/Domain/TaskSettings'

  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

  import { ref, computed } from 'vue'

  const { task } = defineProps<{
    task: Task | null
  }>()

  const changeDialog = defineModel<boolean | null>({
    default: null,
  })

  const isSubmitting = ref(false)
  const body = ref('')

  const min = TaskSettings.minBodyLength
  const max = TaskSettings.maxBodyLength

  const { isValidLength } = useTrimmedLength(body, {
    min,
    max,
  })

  const canSubmit = computed(() => {
    return isValidLength.value && !isSubmitting.value
  })

  async function confirm(): Promise<void> {
    if (!task) return

    try {
      isSubmitting.value = true
      await taskService.change(task, body.value)
      notify.success('Task updated successfully.')
      close()
    } catch {
      notify.warning('Task update failed. Please try again.')
    } finally {
      isSubmitting.value = false
    }
  }

  const rules = [
    (val: string) => (!!val && val.trim().length > 0) || 'Task body is required',
    (val: string) => val.trim().length >= min || `Minimum ${min} characters`,
    (val: string) => val.trim().length <= max || `Maximum ${max} characters`,
  ]

  function beforeShow() {
    if (task) body.value = task.body
  }

  function close() {
    changeDialog.value = false
  }
</script>
