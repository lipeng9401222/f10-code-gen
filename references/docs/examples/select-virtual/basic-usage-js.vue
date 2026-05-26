<template>
  <e-select
    v-model="value"
    :options="options"
    placeholder="Please select"
    size="large"
    :virtual-list-props="{
      height: 200,
    }"
  />
  <e-select
    v-model="value"
    :options="options"
    placeholder="Please select"
    :virtual-list-props="{
      height: 200,
    }"
  />
  <e-select
    v-model="value"
    :options="options"
    placeholder="Please select"
    size="small"
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script setup>
import { ref } from 'vue';
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const value = ref();
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));
</script>

<style scoped>
.example-showcase .e-select {
  margin-right: 20px;
}
</style>
