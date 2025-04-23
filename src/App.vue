<script setup lang="ts">
import TaskList from "./components/TaskList.vue";
</script>

<template>
  <main>
    <div class="flex justify-center items-center pt-12">
      <h1 class="text-green-700 text-6xl font-bold">Daily ToDo Tasks</h1>
    </div>
    <TaskList />
  </main>
</template>

<style>
main {
  max-width: 780px;
  margin: 0 auto;
  color: red;
}
</style>
