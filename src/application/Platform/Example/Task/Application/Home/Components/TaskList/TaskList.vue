<template>
  <div>
    <div v-if="tasks.length === 0" class="text-grey-6 text-center q-mt-lg">No tasks yet.</div>

    <div v-else class="column q-gutter-md q-mt-sm">
      <q-card v-for="task in tasks" :key="task.id.toString()" flat bordered>
        <q-card-section class="row items-center no-wrap">
          <!-- LEFT: content -->
          <div class="col">
            <div class="text-body1">
              {{ task.body }}
            </div>

            <div class="text-caption text-grey-6 q-mt-xs">
              {{ formatDate(task.created_at) }}
            </div>
          </div>

          <!-- RIGHT: remove button -->
          <div class="col-auto">
            <q-btn icon="edit" flat round color="primary" @click="onChange(task)">
              <q-tooltip>Edit</q-tooltip>
            </q-btn>
            <q-btn icon="delete" flat round color="negative" @click="onRemove(task)">
              <q-tooltip>Remove</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <remove-task-dialog v-model="removeDialog" :task="remove" />
    <change-task-dialog v-model="changeDialog" :task="change" />
  </div>
</template>

<script setup lang="ts">
  import ChangeTaskDialog from './Components/ChangeTaskDialog.vue'
  import RemoveTaskDialog from './Components/RemoveTaskDialog.vue'

  import { taskService } from '../../../Service/task-service'
  import { useTaskStore } from '../../../task-store'

  import type { Task } from '../../../../Domain/Task'

  import { ref, computed, onMounted } from 'vue'

  const store = useTaskStore()
  const tasks = computed(() => store.tasks)

  const formatDate = (date: Date): string =>
    new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)

  const remove = ref<Task | null>(null)
  const removeDialog = ref(false)

  function onRemove(task: Task): void {
    remove.value = task
    removeDialog.value = true
  }

  const change = ref<Task | null>(null)
  const changeDialog = ref(false)

  function onChange(task: Task): void {
    change.value = task
    changeDialog.value = true
  }

  onMounted(async () => {
    await taskService.list()
  })
</script>
