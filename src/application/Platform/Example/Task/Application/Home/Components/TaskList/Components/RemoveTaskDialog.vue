<template>
  <q-dialog v-model="model">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Remove task</div>
      </q-card-section>

      <q-card-section>
        <div class="text-body2">Are you sure you want to remove this task?</div>

        <div class="q-mt-sm text-grey-7">“{{ task?.application.body }}”</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="grey-7" v-close-popup />

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
  import { taskService } from '../../../../Services/task-service'
  import { type ParsedTask } from '../../../../Types/ParsedTask'

  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

  import { ref, computed } from 'vue'

  const props = defineProps<{
    modelValue: boolean
    task: ParsedTask | null
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  const isSubmitting = ref(false)

  const model = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value),
  })

  function confirm(): void {
    if (!props.task) return

    try {
      isSubmitting.value = true
      taskService.remove(props.task)
      model.value = false
      notify.success('Task removed.')
      taskService.list()
    } catch {
      notify.warning('Task removal failed. Please try again.')
    } finally {
      isSubmitting.value = false
    }
  }
</script>
