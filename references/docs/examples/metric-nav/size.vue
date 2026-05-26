<template>
  <div class="demo-wrapper">
    <div>
      <p class="demo-label">Small</p>
      <e-metric-nav v-model="current1" :options="stats" size="small" />
    </div>
    <div>
      <p class="demo-label">Default</p>
      <e-metric-nav v-model="current2" :options="stats" />
    </div>
    <div>
      <p class="demo-label">Large</p>
      <e-metric-nav v-model="current3" :options="stats" size="large" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const current1 = ref('all');
const current2 = ref('all');
const current3 = ref('all');

const stats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
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
