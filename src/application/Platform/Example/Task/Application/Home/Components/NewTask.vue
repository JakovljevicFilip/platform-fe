<template>
  <q-card flat>
    <q-card-section class="q-pa-none">
      <q-input
        v-model="body"
        type="textarea"
        filled
        bg-color="grey-2"
        :rows="4"
        placeholder="Write your task here…"
        :disable="isSubmitting"
        class="text-body1"
        input-style="resize: none"
        :rules="rules"
        lazy-rules
      />
    </q-card-section>

    <q-card-actions class="q-pr-none" align="right">
      <q-btn
        label="Add Task"
        color="grey-8"
        unelevated
        :loading="isSubmitting"
        :disable="!canSubmit"
        @click="submit"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
  import { TaskSettings } from '../../../Domain/TaskSettings'

  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

  import { ref, computed } from 'vue'
  import { taskService } from '../../Service/task-service'

  const body = ref('')
  const isSubmitting = ref(false)

  async function submit(): Promise<void> {
    if (!canSubmit.value) return

    try {
      isSubmitting.value = true
      const newTask = { body: body.value.trim() }
      await taskService.create(newTask)
      body.value = ''
      notify.success('Task created successfully.')
    } catch {
      notify.warning('Task creation failed. Please try again.')
    } finally {
      isSubmitting.value = false
    }
  }

  const min = TaskSettings.minBodyLength
  const max = TaskSettings.maxBodyLength

  const rules = [
    (val: string) => (!!val && val.trim().length > 0) || 'Task body is required',
    (val: string) => val.trim().length >= min || `Minimum ${min} characters`,
    (val: string) => val.trim().length <= max || `Maximum ${max} characters`,
  ]

  const trimmedLength = computed(() => body.value.trim().length)
  const canSubmit = computed(() => {
    return trimmedLength.value >= min && trimmedLength.value <= max && !isSubmitting.value
  })
</script>
