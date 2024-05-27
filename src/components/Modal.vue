<script setup>
import { computed, ref, watch } from "vue";
import { MODE } from "@/configs/dialog";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  editForm: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:visible", "save", "close"]);

const headerTitle = computed(() => {
  return props.mode === MODE.CREATE ? "Create Task" : "Edit Task";
});

const isDisabled = computed(
  () => !form.value.title.length || !form.value.description.length
);

const defaultForm = { title: "", description: "", id: 0 };
const form = ref({ ...defaultForm });

const computeVisible = computed({
  get() {
    return props.visible;
  },
  set() {
    emit("close");
  },
});

const inputMapper = () => (form.value = props.editForm);

const save = () => {
  emit("save", form.value);
  computeVisible.value = false;
  form.value = { ...defaultForm };
};

watch(
  () => props.editForm,
  () => {
    if (props.mode === MODE.EDIT) inputMapper();
  },
  { immediate: true }
);
</script>

<template>
  <div class="card flex justify-content-center">
    <Dialog v-model:visible="computeVisible" modal :header="headerTitle">
      <div class="flex flex-column align-items-center gap-3 mb-3 mt-2">
        <label for="username" class="font-semibold">Title</label>
        <Textarea
          v-model="form.title"
          auto-resize
          required
          rows="1"
          cols="35"
          class="flex-auto"
        />
      </div>
      <div class="flex flex-column align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold">Description</label>
        <Textarea
          v-model="form.description"
          auto-resize
          required
          rows="5"
          cols="35"
          class="flex-auto"
        />
      </div>
      <div class="flex justify-content-center gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="computeVisible = false"
        ></Button>
        <Button
          :disabled="isDisabled"
          type="button"
          label="Save"
          @click="save"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<style>
.p-dialog {
  width: 300px;
}

textarea {
  width: 100%;
}
</style>
