import { Store, Validators } from "@reactivestack/vannila";
import { createForm, createStore } from "@reactivestack/react";
import { storeDevtoolsPlugin } from "@reactivestack/plugins";

import { DevtoolsPlugin } from "@reactivestack/plugins";

DevtoolsPlugin.config("http://localhost:8000");

export type TTaskPriority = "low" | "medium" | "high";

export type TTask = {
  id: number;
  title: string;
  description: string;
  priority: TTaskPriority;
};

export const taskForm = createForm(
  {
    value: new Store(
      {
        title: "",
        description: "",
        priority: "low",
      },
      {
        plugins: {
          // devtools: storeDevtoolsPlugin("task-form-value"),
        },
      }
    ),
    error: new Store(
      {
        title: "",
        description: "",
        priority: "",
      },
      {
        plugins: {
          // devtools: storeDevToolsPlugin("task-form-error"),
        },
      }
    ),
  },
  (state) => ({
    handler: {
      title: (e: any) => {
        state.value.title = e.target.value;
      },
      description: (e: any) => {
        state.value.description = e.target.value;
      },
      priority: (e: any) => {
        state.value.priority = e.target.value;
      },
    },
    validator: {
      title: Validators.required("title error"),
      description: [
        Validators.required("description error"),
        Validators.min(3, "description should be min 3."),
        Validators.max(6, "description should be max 6."),
      ],
      priority: (value: string) => {
        if (value === "L") {
          return "ooooooooo";
        }
      },
    },
    transformer: {
      priority: (value: any) => {
        const transform: any = {
          low: "L",
          medium: "M",
          high: "H",
        };

        return transform[value] ? transform[value] : "";
      },
    },
    onSubmit: (value: any) => {
      useTaskList.store.reducer.addTask(value);
    },

    plugins: {
      // devtools: storeDevToolsPlugin("task-form"),
    },
  })
);

type TTaskListState = {
  tasks: TTask[];
};
type TTaskListReducer = {
  addTask: (task: TTask) => void;
  editTask: (task: TTask) => void;
  removeTask: (task: TTask) => void;
};

export const useTaskList = createStore<TTaskListState, TTaskListReducer>(
  {
    tasks: [],
  },
  {
    reducer: (state) => ({
      addTask(task) {
        state.tasks = [...state.tasks, task];
      },
      editTask(task) {
        state.tasks = [...state.tasks, task];
      },
      removeTask(task) {
        state.tasks = state.tasks.filter((t) => t.id !== task.id);
      },
    }),

    plugins: {
      devtools: storeDevtoolsPlugin("task-list"),
    },
  }
);
