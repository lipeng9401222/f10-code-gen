<template>
  <e-transfer v-model="value" :data="data" />
</template>

<script setup>
import { ref } from 'vue';

const generateData = () => {
  const data = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const data = ref(generateData());
const value = ref([]);
</script>
