<template>
  <div class="demo-container">
    <e-metric-nav v-model="current" :options="manyStats" arrow="always" :columns="3" @page-change="handlePageChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const current = ref('all');

const manyStats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
  { value: 'suspended', label: '临时挂起', metric: 8, unit: '个' },
  { value: 'editing', label: '编辑中', metric: 2, unit: '个' },
  { value: 'draft', label: '草稿', metric: 15, unit: '个' },
  { value: 'archived', label: '已归档', metric: 56, unit: '个' },
]);
</script>

<style scoped></style>
