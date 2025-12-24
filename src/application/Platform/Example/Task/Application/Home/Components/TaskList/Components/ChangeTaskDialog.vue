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
          :rules="taskInput.content.rules"
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
  import { useAsyncSubmitState } from '../../Composable/useAsyncSubmitState'
  import { taskInput } from '../../Input/task-input'

  import { taskService } from '../../../../Service/task-service'

  import type { Task } from 'src/application/Platform/Example/Task/Domain/Task'

  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

  import { ref, computed } from 'vue'

  const { task } = defineProps<{
    task: Task | null
  }>()

  const changeDialog = defineModel<boolean | null>({
    default: null,
  })

  const body = ref('')

  const canSubmit = computed(() => taskInput.content.isValid(body.value) && !isSubmitting.value)

  const { isSubmitting, run } = useAsyncSubmitState()

  async function confirm(): Promise<void> {
    if (!task) return

    await run(async () => {
      await taskService.change(task, body.value)
      notify.success('Task updated successfully.')
      close()
    })
  }

  function beforeShow() {
    if (task) body.value = task.body
  }

  function close() {
    changeDialog.value = false
  }
</script>
