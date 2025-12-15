<template>
  <q-page>
    <div class="page-title text-center">Tasks</div>

    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <new-task />
        <q-separator color="grey-4" />
        <task-list />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import NewTask from './Components/NewTask.vue'
  import TaskList from './Components/TaskList/TaskList.vue'
</script>

<style>
  .page-title {
    font-size: 8rem;
    font-weight: 200;
    letter-spacing: 0.05em;
  }
</style>
