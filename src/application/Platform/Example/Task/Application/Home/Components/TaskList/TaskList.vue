<template>
  <div>
    <div v-if="tasks.length === 0" class="text-grey-6 text-center q-mt-lg">No tasks yet.</div>

    <div v-else class="column q-gutter-md q-mt-sm">
      <q-card v-for="task in tasks" :key="task.application.id" flat bordered>
        <q-card-section class="row items-center no-wrap">
          <!-- LEFT: content -->
          <div class="col">
            <div class="text-body1">
              {{ task.application.body }}
            </div>

            <div class="text-caption text-grey-6 q-mt-xs">
              {{ formatDate(task.application.createdAt) }}
            </div>
          </div>

          <!-- RIGHT: remove button -->
          <div class="col-auto">
            <q-btn icon="edit" flat round color="primary" @click="onEdit(task)">
              <q-tooltip>Edit</q-tooltip>
            </q-btn>
            <q-btn icon="delete" flat round color="negative" @click="onRemove(task)">
              <q-tooltip>Remove</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <remove-task-dialog v-model="showRemoveDialog" :task="taskToRemove" />
    <change-task-dialog v-model="showEditDialog" :task="taskToEdit" />
  </div>
</template>

<script setup lang="ts">
  import { taskService } from '../../../Services/task-service'
  import { useTaskStore } from '../../../task-store'
  import type { ParsedTask } from '../../../Types/ParsedTask'
  import ChangeTaskDialog from './Components/ChangeTaskDialog.vue'
  import RemoveTaskDialog from './Components/RemoveTaskDialog.vue'

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

  const taskToRemove = ref<ParsedTask | null>(null)
  const showRemoveDialog = ref(false)

  function onRemove(task: ParsedTask): void {
    taskToRemove.value = task
    showRemoveDialog.value = true
  }

  const taskToEdit = ref<ParsedTask | null>(null)
  const showEditDialog = ref(false)

  function onEdit(task: ParsedTask): void {
    taskToEdit.value = task
    showEditDialog.value = true
  }

  onMounted(async () => {
    await taskService.list()
  })
</script>
