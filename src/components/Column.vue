<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <Panel :header="title">
      <template #icons>
        <slot name="header" />
      </template>
      <slot name="content" />
    </Panel>
  </div>
</template>
