export interface Task {
  id: number;
  name: string;
  done: boolean;
}

export type TaskFilter = "all" | "active" | "completed";
