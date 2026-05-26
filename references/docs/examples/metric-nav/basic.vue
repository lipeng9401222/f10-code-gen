<template>
  <e-metric-nav v-model="current" :options="stats" />
</template>

<script setup>
import { ref } from 'vue';

const current = ref('all');

const stats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
  { value: 'suspended', label: '临时挂起', metric: 8, unit: '个' },
  { value: 'editing', label: '编辑中', metric: 2, unit: '个' },
]);
</script>

<style scoped></style>
