<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import { dragColumnsConfig } from "@/configs/drag-columns.config";
import { MODE } from "@/configs/dialog";
import { useTasksStore } from "@/store/store";
import Column from "@/components/Column.vue";
import Modal from "@/components/Modal.vue";
import TaskCard from "@/components/TaskCard.vue";

const store = useTasksStore();

const drag = ref(false);
const startDragColumn = ref(null);
const isShowCreateModal = ref(false);
const isShowEditModal = ref(false);
const creatingTaskColumnName = ref("");
const editingTaskColumnName = ref("");
const defaultEditForm = { id: 0, title: "", description: "" };
const editForm = ref({ ...defaultEditForm });

const getColumnTasks = (column) => JSON.parse(JSON.stringify(store[column]));

const getColumnTaskById = (column, id) => {
  const [task] = getColumnTasks(column).filter((task) => task.id === id);

  return task;
};

// Modal actions
const openModal = (column) => {
  isShowCreateModal.value = true;
  creatingTaskColumnName.value = column;
};

const closeModal = () => {
  isShowCreateModal.value = false;
  creatingTaskColumnName.value = "";
};

const openEditModal = ({ column, id }) => {
  isShowEditModal.value = true;
  editingTaskColumnName.value = column;
  editForm.value = getColumnTaskById(column, id);
};

const closeEditModal = () => {
  isShowEditModal.value = false;
  editingTaskColumnName.value = "";
  editForm.value = { ...defaultEditForm };
};

// Actions with Draggable
const start = (startColumn) => {
  drag.value = true;
  startDragColumn.value = startColumn;
};

const end = () => {
  drag.value = false;
  startDragColumn.value = null;
};

// Action with tasks
const create = (task) => {
  store.addTask(creatingTaskColumnName.value, task);
};

const update = (task) => {
  store.updateTask(editingTaskColumnName.value, task);
};

const remove = ({ column, id }) => {
  store.removeTask(column, id);
};

const shuffle = (arg, newColumn) => {
  if (!arg.removed) {
    const { element, newIndex } = arg.added || arg.moved;

    store.shuffleTask(element, startDragColumn.value, newColumn, newIndex);
  }
};
</script>

<template>
  <div class="flex flex-wrap justify-content-center gap-4">
    <Column
      v-for="({ label, value }, key) in dragColumnsConfig"
      :key="key"
      :title="label"
      class="column"
    >
      <template #header>
        <button
          class="p-panel-header-icon p-link mr-2"
          @click="openModal(value)"
        >
          <span class="pi pi-plus" />
        </button>
      </template>
      <template #content>
        <draggable
          :list="getColumnTasks(value)"
          group="columns"
          item-key="id"
          @start="start(value)"
          @end="end"
          @change="(arg) => shuffle(arg, value)"
        >
          <template #item="{ element }">
            <TaskCard
              :id="element.id"
              :title="element.title"
              :description="element.description"
              :column="value"
              class="mb-3"
              @edit="openEditModal"
              @remove="remove"
            />
          </template>
        </draggable>
      </template>
    </Column>

    <Modal
      :visible="isShowCreateModal"
      :mode="MODE.CREATE"
      @close="closeModal"
      @save="create"
    />
    <Modal
      :visible="isShowEditModal"
      :mode="MODE.EDIT"
      :edit-form="editForm"
      @close="closeEditModal"
      @save="update"
    />
  </div>
</template>

<style scoped>
.column {
  min-width: 325px;
}
</style>
