<script setup lang="ts">
import { ref } from "vue";

const task = ref("");
</script>

<template>
  <article class="flex flex-col pt-12">
    <label class="text-xl font-bold text-gray-600 pb-2">Add new task</label>
    <input
      type="text"
      class="p-2 border border-gray-300 rounded text-blue-950"
      v-model="task"
      placeholder="Task name"
    />
  </article>
  <p>{{ task }}</p>
</template>
