<template>
  <e-select v-model="value" class="m-2" placeholder="请选择">
    <e-option-group v-for="group in options" :key="group.label" :label="group.label">
      <e-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
    </e-option-group>
  </e-select>
  <e-select v-model="value" class="m-2" :options="options" placeholder="请选择" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  {
    label: 'Popular cities',
    options: [
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Beijing',
        label: 'Beijing',
      },
    ],
  },
  {
    label: 'City name',
    options: [
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
      {
        value: 'Dalian',
        label: 'Dalian',
      },
    ],
  },
];
</script>
