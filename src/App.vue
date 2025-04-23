<script setup lang="ts">
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import type { Task } from "./types";
import { ref, onMounted, watch } from "vue";

const tasks = ref<Task[]>([]);
const addTask = (task: string) => {
  const newTask: Task = {
    id: tasks.value.length + 1,
    name: task,
    done: false,
  };

  tasks.value.push(newTask);
};

const toggleDone = (id: number) => {
  const task = tasks.value.find((task) => task.id === id);
  if (task) {
    task.done = !task.done;
  }
};

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  },
  { deep: true }
);

const deleteTask = (id: number) => {
  const taskIndex = tasks.value.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.value.splice(taskIndex, 1);
  }
};

onMounted(() => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
});
</script>

<template>
  <main>
    <div class="flex flex-col justify-center items-center pt-12">
      <img
        src="./assets/sticky-notes.avif"
        alt="sticky notes"
        class="mb-4 w-100 h-72 shadow-lg"
      />
      <h1 class="text-[#1A3636] text-6xl font-bold">Daily To Do Tasks</h1>
    </div>
    <TaskForm @add-task="addTask" />
    <TaskList
      :tasks="tasks"
      @toggle-done="toggleDone"
      @delete-task="deleteTask"
    />
  </main>
</template>

<style>
main {
  max-width: 700px;
  margin: 0 auto;
}
</style>
