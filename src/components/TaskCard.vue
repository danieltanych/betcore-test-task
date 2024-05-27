<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  column: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["edit", "remove"]);

const edit = () => emit("edit", { column: props.column, id: props.id });
const remove = () => emit("remove", { column: props.column, id: props.id });
</script>

<template>
  <Card class="card">
    <template #footer>
      <div class="flex flex-row justify-content-end">
        <Button icon="pi pi-pencil" class="mr-2" text @click="edit" />
        <Button icon="pi pi-trash" severity="danger" text @click="remove" />
      </div>
    </template>
    <template #title>
      <span class="card__title block truncate">{{ title }}</span>
    </template>
    <template #content>
      <p class="card__description m-0">{{ description }}</p>
    </template>
  </Card>
</template>

<style scoped>
.card:hover {
  cursor: grab;
}

.card__title,
.card__description {
  width: 250px;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
