<template>
  <e-select v-model="value" placeholder="请选择">
    <e-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: var(--e-text-color-secondary); font-size: 13px">{{ item.value }}</span>
    </e-option>
  </e-select>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const cities = [
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
];
</script>
