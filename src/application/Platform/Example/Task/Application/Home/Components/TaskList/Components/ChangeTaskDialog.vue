<template>
  <q-dialog v-model="model">
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
        <q-btn flat label="Cancel" color="grey-7" v-close-popup />

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
  import { TaskSettings } from 'src/application/Platform/Example/Task/Domain/TaskSettings'
  import { taskService } from '../../../../Services/task-service'
  import { type ParsedTask } from '../../../../Types/ParsedTask'

  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

  import { ref, computed, watch } from 'vue'

  const props = defineProps<{
    modelValue: boolean
    task: ParsedTask | null
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  const isSubmitting = ref(false)
  const body = ref('')

  const model = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value),
  })

  watch(
    () => props.task,
    task => {
      body.value = task?.application.body ?? ''
    },
    { immediate: true }
  )

  const trimmedLength = computed(() => body.value.trim().length)
  const canSubmit = computed(() => {
    return trimmedLength.value >= min && trimmedLength.value <= max && !isSubmitting.value
  })

  function confirm(): void {
    if (!props.task || !canSubmit.value) return

    try {
      isSubmitting.value = true

      taskService.update({
        ...props.task,
        application: {
          ...props.task.application,
          editBody: body.value.trim(),
        },
      })

      model.value = false
      taskService.list()
      notify.success('Task updated successfully.')
      taskService.list()
    } catch {
      notify.warning('Task update failed. Please try again.')
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
</script>
