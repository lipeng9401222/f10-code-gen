<template>
  <e-metric-nav v-model="current" :options="stats" :clickable="true" @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue';

const current = ref('all');

const stats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
]);

const handleChange = (key, item) => {
  console.log('选中项:', key, item);
};
</script>

<style scoped></style>
