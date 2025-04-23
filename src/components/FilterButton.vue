<script setup lang="ts">
import type { TaskFilter } from "../types";

const props = defineProps<{
  filter: TaskFilter;
  currentFilter: TaskFilter;
}>();

const emit = defineEmits<{
  setFilter: [filter: TaskFilter];
}>();
</script>

<template>
  <button
    class="bg-[#9EC8B9] text-white p-2 rounded-xl w-25 text-center font-bold"
    @click="emit('setFilter', props.filter)"
    :class="{
      contrast: props.filter === props.currentFilter,
    }"
  >
    {{ props.filter }}
  </button>
</template>

<style scoped>
.contrast {
  background-color: #1a3636;
  color: white;
}
button {
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #1a3636;
  color: white;
  cursor: pointer;
}
button:active {
  background-color: #1a3636;
  color: white;
}
</style>
