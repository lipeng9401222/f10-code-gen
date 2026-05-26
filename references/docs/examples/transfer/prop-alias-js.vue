<template>
  <e-transfer
    v-model="value"
    :props="{
      key: 'value',
      label: 'desc',
    }"
    :data="data"
  />
</template>

<script setup>
import { ref } from 'vue';

const generateData = () => {
  const data = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      value: i,
      desc: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const data = ref(generateData());
const value = ref([]);
</script>
