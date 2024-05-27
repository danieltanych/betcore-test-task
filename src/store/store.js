import { defineStore } from "pinia";
import { useStorage, StorageSerializers } from "@vueuse/core";
import { COLUMNS } from "@/configs/columns";

export const useTasksStore = defineStore({
  id: "main",
  state: () => ({
    [COLUMNS.DESIGN]: useStorage(COLUMNS.DESIGN, [], undefined, {
      serializer: StorageSerializers.object,
    }),
    [COLUMNS.PROTOTYPE]: useStorage(COLUMNS.PROTOTYPE, [], undefined, {
      serializer: StorageSerializers.object,
    }),
    [COLUMNS.TRELLO]: useStorage(COLUMNS.TRELLO, [], undefined, {
      serializer: StorageSerializers.object,
    }),
    [COLUMNS.TEST]: useStorage(COLUMNS.TEST, [], undefined, {
      serializer: StorageSerializers.object,
    }),
    [COLUMNS.FINAL]: useStorage(COLUMNS.FINAL, [], undefined, {
      serializer: StorageSerializers.object,
    }),
  }),
  actions: {
    addTask(column, task, toIndex = null) {
      if (toIndex === null) {
        this[column].push({ ...task, id: this.getNewIndex() });
      } else {
        this[column].splice(toIndex, 0, task);
      }
    },
    updateTask(column, task) {
      this[column].filter((savedTask) => {
        if (savedTask.id === task.id) {
          savedTask.title = task.title;
          savedTask.description = task.description;
        }
      });
    },
    removeTask(column, id) {
      this[column] = [...this[column].filter((item) => item.id !== id)];
    },
    shuffleTask(task, oldColumn, toColumn, newIndex) {
      this.removeTask(oldColumn, task.id);
      this.addTask(toColumn, task, newIndex);
    },
    getNewIndex() {
      const pool = [
        ...this[COLUMNS.DESIGN],
        ...this[COLUMNS.PROTOTYPE],
        ...this[COLUMNS.TRELLO],
        ...this[COLUMNS.TEST],
        ...this[COLUMNS.FINAL],
      ];

      if (!pool.length) return pool.length;

      return Math.max(...pool.map((item) => item.id)) + 1;
    },
  },
});
