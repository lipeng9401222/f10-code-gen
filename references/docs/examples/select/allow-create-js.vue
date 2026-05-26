<template>
  <e-select
    v-model="value"
    multiple
    filterable
    allow-create
    default-first-option
    :reserve-keyword="false"
    placeholder="Choose tags for your article"
  >
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </e-select>
</template>

<script setup>
import { ref } from 'vue';

const value = ref([]);
const options = [
  {
    value: 'HTML',
    label: 'HTML',
  },
  {
    value: 'CSS',
    label: 'CSS',
  },
  {
    value: 'JavaScript',
    label: 'JavaScript',
  },
];
</script>
