<template>
  <div class="demo-wrapper">
    <div>
      <p class="demo-label">整体禁用</p>
      <e-metric-nav v-model="current1" :options="stats" disabled />
    </div>
    <div>
      <p class="demo-label">部分禁用（待审核和编辑中）</p>
      <e-metric-nav v-model="current2" :options="disabledStats" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const current1 = ref('');
const current2 = ref('all');

const stats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
]);

const disabledStats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个', disabled: true },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'editing', label: '编辑中', metric: 2, unit: '个', disabled: true },
]);
</script>

<style scoped>
.demo-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--e-space-xxl);
}

.demo-label {
  margin-bottom: var(--e-space-m);
  color: var(--e-text-color-secondary);
}
</style>
