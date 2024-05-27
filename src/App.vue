<script setup>
import Header from "@/components/Header.vue";
import Home from "@/views/Home.vue";
</script>

<template>
  <Message severity="warn" class="m-0"
    >If you wanna improve ur team - hire me</Message
  >
  <Header class="m-3 mt-0" />
  <Home class="m-3" />
</template>

<style>
.p-message-wrapper {
  padding: 0.5rem 0.75rem;
}
</style>
