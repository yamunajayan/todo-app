<script setup lang="ts">
import type { Task } from "../types";

const props = defineProps<{ tasks: Task[] }>();

const emit = defineEmits<{
  toggleDone: [id: number];
  deleteTask: [id: number];
}>();
</script>

<template>
  <ul class="flex flex-col gap-2 w-full mt-4">
    <li
      v-for="task in props.tasks"
      :key="task.id"
      class="flex justify-between items-center p-4 rounded-lg w-full border-b-2 bg-gray-100 border-gray-500 hover:bg-gray-300 cursor-pointer"
    >
      <div>
        <input
          type="checkbox"
          :checked="task.done"
          @change="emit('toggleDone', task.id)"
          class="mr-2"
        />
        <span :class="{ done: task.done }" class="text-lg font-bold">{{
          task.name
        }}</span>
      </div>
      <div class="flex justify-end flex-1">
        <button
          class="bg-[#1A3636] text-white p-2 rounded-xl w-25 text-center font-bold"
          @click="$emit('deleteTask', task.id)"
        >
          Delete
        </button>
      </div>
    </li>
  </ul>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>
