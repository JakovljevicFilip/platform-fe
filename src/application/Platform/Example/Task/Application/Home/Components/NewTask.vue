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
        :rules="taskInput.content.rules"
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
  import { useAsyncSubmitState } from 'src/application/Platform/Example/Task/Application/Home/Components/Composable/useAsyncSubmitState'
  import { taskInput } from './Input/task-input'

  import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'
  import { taskService } from '../../Service/task-service'

  import { ref, computed } from 'vue'

  const body = ref('')

  const { isSubmitting, run } = useAsyncSubmitState()
  async function submit(): Promise<void> {
    await run(async () => {
      await taskService.add(body.value)
      body.value = ''
      notify.success('Task added successfully.')
    })
  }

  const canSubmit = computed(() => taskInput.content.isValid(body.value) && !isSubmitting.value)
</script>
