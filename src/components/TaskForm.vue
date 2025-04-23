<script setup lang="ts">
import { ref } from "vue";
const task = ref("");

const emit = defineEmits(["add-task"]);

const formSubmit = () => {
  if (task.value.trim()) {
    emit("add-task", task.value); //emit event to parent component
    //emit event to parent component
    task.value = "";
  }
};
</script>

<template>
  <form class="flex flex-col pt-12 mb-10" @submit.prevent="formSubmit">
    <label class="text-xl font-bold text-gray-600 pb-2">Add new task</label>
    <input
      type="text"
      class="p-2 border border-gray-300 rounded text-blue-950"
      v-model="task"
      placeholder="Task name"
    />
    <div class="flex justify-end mt-2">
      <button
        class="bg-[#1A3636] text-white p-2 rounded-xl w-25 text-center font-bold"
      >
        Add Task
      </button>
    </div>
  </form>
</template>
