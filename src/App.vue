<script setup lang="ts">
import FilterButton from "./components/FilterButton.vue";
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import type { Task, TaskFilter } from "./types";
import { ref, onMounted, watch, computed } from "vue";

const tasks = ref<Task[]>([]);

const filter = ref<TaskFilter>("all");
const addTask = (task: string) => {
  const newTask: Task = {
    id: tasks.value.length + 1,
    name: task,
    done: false,
  };

  tasks.value.push(newTask);
};

const filteredTasks = computed(() => {
  switch (filter.value) {
    case "all":
      return tasks.value;
    case "active":
      return tasks.value.filter((task) => !task.done);
    case "completed":
      return tasks.value.filter((task) => task.done);
  }
});

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

function setFilter(value: TaskFilter) {
  filter.value = value;
}

const deleteTask = (id: number) => {
  const taskIndex = tasks.value.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.value.splice(taskIndex, 1);
  }
};

const totalDone = computed(() => {
  return tasks.value.reduce(
    (total, task) => (task.done ? total + 1 : total),
    0
  );
});

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
    <hr class="mb-2" />
    <h3 v-if="!tasks.length">Add a task to get started</h3>
    <h3 v-else class="mb-2 text-xl text-[#1A3636]">
      {{ totalDone }}/ {{ tasks.length }} tasks completed
    </h3>
    <ul class="flex justify-end gap-2 mt-4">
      <FilterButton
        filter="all"
        :currentFilter="filter"
        @set-filter="setFilter"
      />
      <FilterButton
        filter="active"
        :currentFilter="filter"
        @set-filter="setFilter"
      />
      <FilterButton
        filter="completed"
        :currentFilter="filter"
        @set-filter="setFilter"
      />
    </ul>
    <TaskList
      :tasks="filteredTasks"
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
