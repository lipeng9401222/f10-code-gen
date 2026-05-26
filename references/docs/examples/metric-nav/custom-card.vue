<template>
  <e-metric-nav v-model="current" :options="stats">
    <template #card="{ item, active, onClick }">
      <div class="custom-card" :class="{ 'is-active': active }" @click="onClick">
        <div class="custom-label">{{ item.label }}</div>
        <div class="custom-value">{{ item.value }}</div>
      </div>
    </template>
  </e-metric-nav>
</template>

<script setup>
import { ref } from 'vue';

const current = ref('all');

const stats = ref([
  { value: 'all', label: '所有审核', metric: 215 },
  { value: 'pending', label: '待审核', metric: 25 },
  { value: 'approved', label: '审核通过', metric: 168 },
  { value: 'rejected', label: '审核不通过', metric: 12 },
]);
</script>

<style scoped>
.custom-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--e-space-xl);
  cursor: pointer;
  transition: var(--e-transition-all);
}

.custom-card.is-active {
  background: var(--e-color-primary-light-9);
}

.custom-label {
  font-size: var(--e-font-size-base);
  color: var(--e-text-color-secondary);
  margin-bottom: var(--e-space-xs);
}

.custom-value {
  font-size: var(--e-font-size-extra-large);
  font-weight: var(--e-font-weight-bold);
  color: var(--e-text-color-primary);
}
</style>
